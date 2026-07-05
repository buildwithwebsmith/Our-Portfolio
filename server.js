import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import dotenv from 'dotenv';
import express from 'express';
import nodemailer from 'nodemailer';

dotenv.config({ path: ['.env.local', '.env'] });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

const DEFAULT_SMTP_HOST = 'smtp.gmail.com';
const DEFAULT_SMTP_PORT = 465;
const DEFAULT_SMTP_USER = 'buildwithwebsmith@gmail.com';

const PORT = Number(process.env.PORT || 8787);
const SMTP_HOST = process.env.SMTP_HOST || DEFAULT_SMTP_HOST;
const SMTP_PORT = Number(process.env.SMTP_PORT || DEFAULT_SMTP_PORT);
const SMTP_USER = process.env.SMTP_USER || DEFAULT_SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS || process.env.GMAIL_APP_PASSWORD || '';
const CONTACT_EMAIL = process.env.LEAD_TO_EMAIL || DEFAULT_SMTP_USER;
const LEAD_FROM_EMAIL =
  process.env.LEAD_FROM_EMAIL || `Websmith Leads <${DEFAULT_SMTP_USER}>`;
const WHATSAPP_PHONE = process.env.WHATSAPP_PHONE || '918007006961';
const CONTACT_FALLBACK_MODE = process.env.CONTACT_FALLBACK_MODE || '';

app.use(express.json());

const hasSmtpConfig = Boolean(SMTP_PASS);

let transportContextPromise;

function getSubmissionErrorMessage() {
  return 'Email delivery is not configured yet. Add SMTP_PASS (or GMAIL_APP_PASSWORD) for buildwithwebsmith@gmail.com in .env.local.';
}

async function getTransportContext() {
  if (transportContextPromise) {
    return transportContextPromise;
  }

  transportContextPromise = (async () => {
    if (hasSmtpConfig) {
      const transporter = nodemailer.createTransport({
        host: SMTP_HOST,
        port: SMTP_PORT,
        secure: SMTP_PORT === 465,
        auth: {
          user: SMTP_USER,
          pass: SMTP_PASS,
        },
      });

      await transporter.verify();

      return {
        mode: 'smtp',
        recipient: CONTACT_EMAIL,
        from: LEAD_FROM_EMAIL,
        transporter,
      };
    }

    if (CONTACT_FALLBACK_MODE === 'ethereal') {
      const testAccount = await nodemailer.createTestAccount();
      const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass,
        },
      });

      await transporter.verify();

      return {
        mode: 'ethereal',
        recipient: CONTACT_EMAIL,
        from: testAccount.user,
        transporter,
      };
    }

    throw new Error(getSubmissionErrorMessage());
  })();

  return transportContextPromise;
}

function validateContactPayload(payload) {
  const requiredFields = ['name', 'email', 'phone', 'city'];
  const missingFields = requiredFields.filter(
    (field) => !String(payload?.[field] || '').trim(),
  );

  if (missingFields.length > 0) {
    return `Missing required fields: ${missingFields.join(', ')}.`;
  }

  return null;
}

function buildTextEmail(payload) {
  return [
    'New Websmith lead',
    '',
    `Submitted At: ${new Date().toISOString()}`,
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    `Phone: ${payload.phone}`,
    `Business Name: ${payload.businessName || 'N/A'}`,
    `City: ${payload.city}`,
    `Service Type: ${payload.serviceType || 'N/A'}`,
    `Message: ${payload.message || 'N/A'}`,
  ].join('\n');
}

function buildHtmlEmail(payload) {
  return `
    <div style="font-family: Arial, sans-serif; color: #1b1814; line-height: 1.6;">
      <h2 style="margin: 0 0 16px;">New Websmith lead</h2>
      <table cellpadding="8" cellspacing="0" border="0" style="border-collapse: collapse;">
        <tr><td><strong>Submitted At</strong></td><td>${new Date().toISOString()}</td></tr>
        <tr><td><strong>Name</strong></td><td>${payload.name}</td></tr>
        <tr><td><strong>Email</strong></td><td>${payload.email}</td></tr>
        <tr><td><strong>Phone</strong></td><td>${payload.phone}</td></tr>
        <tr><td><strong>Business Name</strong></td><td>${payload.businessName || 'N/A'}</td></tr>
        <tr><td><strong>City</strong></td><td>${payload.city}</td></tr>
        <tr><td><strong>Service Type</strong></td><td>${payload.serviceType || 'N/A'}</td></tr>
        <tr><td><strong>Message</strong></td><td>${payload.message || 'N/A'}</td></tr>
      </table>
    </div>
  `;
}

app.get('/api/health', (_req, res) => {
  res.json({
    ok: true,
    emailConfigured: hasSmtpConfig,
    fallbackMode: CONTACT_FALLBACK_MODE || null,
    recipient: CONTACT_EMAIL,
    smtpHost: SMTP_HOST,
    smtpUser: SMTP_USER,
    whatsappPhone: WHATSAPP_PHONE,
  });
});

app.post('/api/contact', async (req, res) => {
  const validationError = validateContactPayload(req.body);
  if (validationError) {
    return res.status(400).json({
      ok: false,
      error: validationError,
    });
  }

  try {
    const transportContext = await getTransportContext();
    const info = await transportContext.transporter.sendMail({
      from: transportContext.from,
      to: transportContext.recipient,
      replyTo: req.body.email,
      subject: `New Websmith lead: ${req.body.name} (${req.body.serviceType || 'Website enquiry'})`,
      text: buildTextEmail(req.body),
      html: buildHtmlEmail(req.body),
    });

    return res.status(200).json({
      ok: true,
      delivery: transportContext.mode,
      recipient: transportContext.recipient,
      message:
        transportContext.mode === 'smtp'
          ? `Your enquiry has been emailed to ${transportContext.recipient}.`
          : 'Your enquiry has been sent through the local test mailbox.',
      previewUrl:
        transportContext.mode === 'ethereal'
          ? nodemailer.getTestMessageUrl(info)
          : null,
      messageId: info.messageId,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'We could not send your enquiry.';

    if (!hasSmtpConfig && CONTACT_FALLBACK_MODE !== 'ethereal') {
      return res.status(503).json({
        ok: false,
        error: getSubmissionErrorMessage(),
      });
    }

    console.error('Contact form delivery failed:', error);
    return res.status(500).json({
      ok: false,
      error: message,
    });
  }
});

const distDir = path.join(__dirname, 'dist');

if (fs.existsSync(distDir)) {
  app.use(express.static(distDir));
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api/')) {
      return next();
    }

    return res.sendFile(path.join(distDir, 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Websmith server listening on http://localhost:${PORT}`);
});
