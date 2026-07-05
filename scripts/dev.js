import { spawn } from 'node:child_process';
import net from 'node:net';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

async function canListenOnPort(port, host) {
  return new Promise((resolve, reject) => {
    const server = net.createServer();

    server.once('error', (error) => {
      if (
        error &&
        typeof error === 'object' &&
        'code' in error &&
        (error.code === 'EADDRINUSE' || error.code === 'EACCES')
      ) {
        resolve(false);
        return;
      }

      if (
        error &&
        typeof error === 'object' &&
        'code' in error &&
        (error.code === 'EADDRNOTAVAIL' || error.code === 'EAFNOSUPPORT')
      ) {
        resolve(true);
        return;
      }

      reject(error);
    });

    server.once('listening', () => {
      server.close(() => resolve(true));
    });

    server.listen({ port, host, exclusive: true });
  });
}

async function findAvailablePort(startPort, maxAttempts = 25) {
  for (let offset = 0; offset < maxAttempts; offset += 1) {
    const port = startPort + offset;
    const [ipv4Free, ipv6Free] = await Promise.all([
      canListenOnPort(port, '0.0.0.0'),
      canListenOnPort(port, '::'),
    ]);

    if (ipv4Free && ipv6Free) {
      return port;
    }
  }

  throw new Error(`Unable to find an open port starting from ${startPort}.`);
}

function pipeOutput(stream, prefix, targetStream) {
  let buffer = '';

  stream.on('data', (chunk) => {
    buffer += chunk.toString();
    const lines = buffer.split(/\r?\n/);
    buffer = lines.pop() ?? '';

    for (const line of lines) {
      if (!line.length) {
        targetStream.write('\n');
        continue;
      }
      targetStream.write(`${prefix} ${line}\n`);
    }
  });

  stream.on('end', () => {
    if (buffer.length) {
      targetStream.write(`${prefix} ${buffer}\n`);
    }
  });
}

function spawnManagedProcess(command, args, extraEnv, prefix) {
  const child = spawn(command, args, {
    cwd: rootDir,
    env: {
      ...process.env,
      ...extraEnv,
    },
    stdio: ['inherit', 'pipe', 'pipe'],
  });

  pipeOutput(child.stdout, prefix, process.stdout);
  pipeOutput(child.stderr, prefix, process.stderr);

  return child;
}

const serverPort = await findAvailablePort(8787);
const clientPort = await findAvailablePort(3000);
const contactApiUrl = `http://127.0.0.1:${serverPort}`;
const viteBin = path.join(rootDir, 'node_modules', 'vite', 'bin', 'vite.js');

if (serverPort !== 8787) {
  console.log(`[dev] Port 8787 is busy. Using ${serverPort} for the contact server.`);
}

if (clientPort !== 3000) {
  console.log(`[dev] Port 3000 is busy. Using ${clientPort} for the Vite client.`);
}

console.log(`[dev] Contact server -> ${contactApiUrl}`);
console.log(`[dev] Vite client    -> http://localhost:${clientPort}/`);

const serverProcess = spawnManagedProcess(
  process.execPath,
  ['server.js'],
  { PORT: String(serverPort) },
  '[server]',
);

const clientProcess = spawnManagedProcess(
  process.execPath,
  [viteBin, '--port', String(clientPort), '--host', '0.0.0.0'],
  { CONTACT_API_URL: contactApiUrl },
  '[client]',
);

const childProcesses = [serverProcess, clientProcess];
let shuttingDown = false;

function shutdown(exitCode = 0) {
  if (shuttingDown) {
    return;
  }

  shuttingDown = true;

  for (const child of childProcesses) {
    if (!child.killed) {
      child.kill('SIGTERM');
    }
  }

  setTimeout(() => {
    process.exit(exitCode);
  }, 150);
}

for (const [index, child] of childProcesses.entries()) {
  child.on('exit', (code, signal) => {
    if (shuttingDown) {
      return;
    }

    const label = index === 0 ? 'server' : 'client';
    if (signal) {
      console.error(`[dev] ${label} exited due to signal ${signal}.`);
      shutdown(1);
      return;
    }

    if (code && code !== 0) {
      console.error(`[dev] ${label} exited with code ${code}.`);
      shutdown(code);
      return;
    }

    console.log(`[dev] ${label} exited cleanly.`);
    shutdown(0);
  });
}

process.on('SIGINT', () => shutdown(0));
process.on('SIGTERM', () => shutdown(0));
