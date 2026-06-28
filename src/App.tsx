import React, { useState, useEffect } from 'react';
import { Logo } from './components/Logo';
import { 
  ArrowUpRight, 
  ArrowUp,
  MessageCircle, 
  Mail, 
  Phone, 
  Clock, 
  CheckCircle2, 
  ChevronDown, 
  Menu, 
  X, 
  Flame, 
  Hammer, 
  Check, 
  Calendar,
  AlertCircle
} from 'lucide-react';

const projects = [
  {
    name: "Luxmi Brick Field",
    tag: "MANUFACTURING • INDUSTRIAL",
    desc: "Complete business website for a brick manufacturing company. Showcases products, builds trust, and drives enquiries 24/7.",
    image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=1200&q=80",
    action: {
      type: "link",
      label: "Visit Live Site",
      url: "https://luxmi-bricks.vercel.app/"
    }
  },
  {
    name: "Stree Sarees",
    tag: "FASHION & RETAIL • CATALOGUE",
    desc: "Premium e-commerce style website for an Indian saree brand. Collections, showcases, and customer engagement built in.",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=80",
    action: {
      type: "link",
      label: "Visit Live Site",
      url: "https://stree-sarees-com.vercel.app/home"
    }
  },
  {
    name: "Aroma Cafe & Bistro",
    tag: "LIFESTYLE • DIGITAL IDENTITY",
    desc: "Warm cafe website with full menu, gallery, Zomato reviews, and WhatsApp reservations. Walk-ins up 40% in first month.",
    image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=80",
    action: {
      type: "disabled",
      label: "Private Client"
    }
  },
  {
    name: "Dr. Mehta's Dental Clinic",
    tag: "HEALTHCARE • PATIENT PORTAL",
    desc: "Professional clinic site with services, doctor profile, patient testimonials, and WhatsApp appointment booking.",
    image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80",
    action: {
      type: "disabled",
      label: "Private Client"
    }
  },
  {
    name: "Riya's Beauty Studio",
    tag: "BEAUTY & WELLNESS • ONLINE BOOKING",
    desc: "Elegant salon website with service menu, pricing, before/after gallery, and online appointment CTA. 3x more DMs after launch.",
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1200&q=80",
    action: {
      type: "disabled",
      label: "Private Client"
    }
  },
  {
    name: "Horizon Gym & Fitness",
    tag: "HEALTH & FITNESS • MEMBERSHIP",
    desc: "High-energy fitness site with membership plans, trainer profiles, class schedule, and trial booking form.",
    image: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=1200&q=80",
    action: {
      type: "disabled",
      label: "Private Client"
    }
  }
];

const steps = [
  {
    num: "01",
    title: "We Find Your Gap",
    desc: "We research your business, find what's missing online, and tell you exactly how to fix it."
  },
  {
    num: "02",
    title: "We Build Fast",
    desc: "Clean, mobile-first websites delivered in 5–7 days. No delays, no excuses."
  },
  {
    num: "03",
    title: "You Go Live",
    desc: "Deployed, linked, and optimized. Ready to bring in customers from day one."
  }
];

const testimonials = [
  {
    quote: "Websmith reached out when we didn't even have a Google Map pin. In just 6 days, they delivered a gorgeous website that handles order enquiries flawlessly. Our business is growing beyond our local town!",
    name: "Ramesh Patel",
    role: "Owner, Luxmi Brick Field",
    statNum: "6 Days",
    statLabel: "to launch"
  },
  {
    quote: "I thought small clothing boutiques didn't need websites since we have Instagram. Websmith proved me wrong. Having our own professional catalogue built trust, and our direct WhatsApp sales have tripled.",
    name: "Priya Sharma",
    role: "Founder, Stree Sarees",
    statNum: "3x",
    statLabel: "WhatsApp sales"
  },
  {
    quote: "A professional online presence is critical for healthcare. Websmith built our patient portal with absolute speed and elegance. Our patients love how easy it is to book and find information.",
    name: "Dr. Alok Mehta",
    role: "Chief Dentist, Dr. Mehta's Dental Clinic",
    statNum: "100%",
    statLabel: "booking ease"
  },
  {
    quote: "We were operating purely on local word-of-mouth. Websmith reached out, designed our beautiful wellness portal, and suddenly we were booking clients from adjacent cities. Every local business needs this!",
    name: "Riya Sen",
    role: "Creative Director, Riya's Beauty Studio",
    statNum: "Adjacent Cities",
    statLabel: "new client reach"
  }
];

const faqItems = [
  {
    question: "Do I own my domain and website?",
    answer: "Absolutely. We believe in absolute client ownership. You own 100% of the domain, the code, the assets, and the hosting account."
  },
  {
    question: "How do I update my menu, services, or prices later?",
    answer: "We design with non-technical business owners in mind. Changing a price or adding a service takes less than 30 seconds from your phone, no coding required."
  },
  {
    question: "Why do I need a website if I already have Instagram or Facebook?",
    answer: "Social media pages are rented land. A dedicated, professional website builds instant consumer trust, ranks on Google Maps, and avoids high-percentage commissions to third-party apps."
  },
  {
    question: "How long does the process take?",
    answer: "Most local businesses get a completely finished, fully responsive, and tested website in just 5 to 7 business days."
  },
  {
    question: "Are there any hidden charges or high monthly fees?",
    answer: "No hidden tricks. A clear, one-time fee. Recurring costs are just domain (~$10–15/year) and free-tier hosting — $0/month for standard local traffic."
  }
];

// Count-up helper component for stats animation on scroll
function CountUp({ end, duration = 2000 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = React.useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let active = true;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated && active) {
          setHasAnimated(true);
          let start = 0;
          const incrementTime = Math.max(Math.floor(duration / end), 40);
          
          const timer = setInterval(() => {
            if (!active) {
              clearInterval(timer);
              return;
            }
            start += 1;
            setCount(start);
            if (start >= end) {
              clearInterval(timer);
            }
          }, incrementTime);
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      active = false;
      observer.disconnect();
    };
  }, [end, duration, hasAnimated]);

  return <span ref={ref}>{count}</span>;
}

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  
  // Custom states for animations and progress
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Contact Form State
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState('');
  const [formStep, setFormStep] = useState(1); // Multi-step contact form
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    businessName: '',
    city: '',
    serviceType: 'New Website',
    message: ''
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      setShowBackToTop(window.scrollY > 400);

      // Scroll Progress calculation
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Simple scroll reveal triggers
  useEffect(() => {
    const revealElements = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05, rootMargin: '0px 0px -40px 0px' }
    );

    revealElements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleContinueStep2 = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) {
      setFormError('Please fill in your Name and Phone Number to continue.');
      return;
    }
    setFormError('');
    setFormStep(2);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formStep === 1) {
      if (!formData.name.trim() || !formData.phone.trim()) {
        setFormError('Please fill in your Name and Phone Number to continue.');
        return;
      }
      setFormError('');
      setFormStep(2);
      return;
    }

    if (!formData.name.trim() || !formData.phone.trim() || !formData.email.trim() || !formData.city.trim()) {
      setFormError('Please fill in your Email Address and City to submit.');
      return;
    }
    setFormError('');
    setFormSubmitted(true);
  };

  // Helper to pre-populate and redirect to WhatsApp with custom message
  const triggerWhatsAppRedirect = () => {
    const text = `Hi Websmith, I'm ${formData.name || 'interested'} from ${formData.city || 'N/A'}. Business: ${formData.businessName || 'N/A'}. Interested in: ${formData.serviceType}. Message: ${formData.message || 'I would like to build a website.'}`;
    const encodedText = encodeURIComponent(text);
    window.open(`https://wa.me/918007006961?text=${encodedText}`, '_blank');
  };

  // Testimonial swipe gesture handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    } else if (isRightSwipe) {
      setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    }
    setTouchStart(null);
    setTouchEnd(null);
  };

  return (
    <div className="min-h-screen bg-parchment text-nearblack selection:bg-copper selection:text-white font-sans antialiased">
      
      {/* STICKY NAVBAR WITH INTEGRATED UTILITY BAR */}
      <header id="nav-header" className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-parchment/95 backdrop-blur-md border-b border-nearblack/10 shadow-xs' : 'bg-transparent'}`}>
        {/* Scroll Progress Bar */}
        <div 
          className="absolute top-0 left-0 h-[3px] bg-copper z-50 transition-all duration-100 ease-out" 
          style={{ width: `${scrollProgress}%` }} 
        />

        {/* THIN TOP UTILITY BAR (near-black plum) */}
        <div className="w-full bg-[#241D2C] text-[#F8ECDF]/90 text-[11px] font-medium tracking-wider py-2.5 px-4 text-center select-none font-sans">
          ✦ Premium Website Forge for Indian Boutiques, Clinics, & Businesses — 5-7 Days Delivery ✦
        </div>

        {/* MAIN NAVIGATION BAR CONTAINER */}
        <div className={`transition-all duration-300 ${scrolled ? 'py-3.5' : 'py-6'}`}>
          <div className="container mx-auto px-6 max-w-7xl flex items-center justify-between">
            
            {/* Logo with custom Anvil & Spark Icon */}
            <a href="#" className="no-underline" id="brand-logo">
              <Logo variant="light" size={40} />
            </a>

            {/* Nav Links (Work Sans, normal case, medium weight, small tracking) */}
            <nav className="hidden md:flex items-center gap-8 list-none" id="desktop-nav">
              <li>
                <a href="#work" className="font-sans text-[14px] font-medium text-warmgray hover:text-copper transition-colors relative py-1 group">
                  Work
                  <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-copper transition-all duration-300 group-hover:w-full" />
                </a>
              </li>
              <li>
                <a href="#services" className="font-sans text-[14px] font-medium text-warmgray hover:text-copper transition-colors relative py-1 group">
                  Process
                  <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-copper transition-all duration-300 group-hover:w-full" />
                </a>
              </li>
              <li>
                <a href="#about" className="font-sans text-[14px] font-medium text-warmgray hover:text-copper transition-colors relative py-1 group">
                  About
                  <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-copper transition-all duration-300 group-hover:w-full" />
                </a>
              </li>
              <li>
                <a href="#contact" className="font-sans text-[14px] font-medium text-warmgray hover:text-copper transition-colors relative py-1 group">
                  Contact
                  <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-copper transition-all duration-300 group-hover:w-full" />
                </a>
              </li>
            </nav>

            {/* CTA Button (Rounded-rectangle, 10–12px border radius, solid copper) */}
            <div className="hidden md:block">
              <a 
                href="#contact" 
                className="font-sans font-semibold text-xs tracking-wider uppercase px-6 py-3 rounded-xl bg-copper text-parchment hover:bg-copper/90 transition-all duration-200 shadow-xs hover:shadow-md inline-flex items-center gap-1.5 active:translate-y-0.5 btn-magnetic" 
                id="cta-lets-talk"
              >
                Let's Talk
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Hamburger Menu Toggle (Mobile) */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
              className="md:hidden flex items-center text-nearblack hover:text-copper focus:outline-none cursor-pointer z-50 p-1 rounded-lg"
              aria-label="Toggle Navigation Menu"
              id="mobile-menu-toggle"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <div className={`md:hidden absolute top-full left-0 w-full bg-parchment border-b border-nearblack/10 py-8 px-6 shadow-lg transition-all duration-300 ease-in-out z-40 ${mobileMenuOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-4 pointer-events-none invisible'}`} id="mobile-nav-drawer">
          <ul className="flex flex-col gap-5 list-none p-0 m-0 text-center">
            <li>
              <a href="#work" onClick={() => setMobileMenuOpen(false)} className="block font-sans text-base font-semibold text-warmgray hover:text-copper py-1">Work</a>
            </li>
            <li>
              <a href="#services" onClick={() => setMobileMenuOpen(false)} className="block font-sans text-base font-semibold text-warmgray hover:text-copper py-1">Process</a>
            </li>
            <li>
              <a href="#about" onClick={() => setMobileMenuOpen(false)} className="block font-sans text-base font-semibold text-warmgray hover:text-copper py-1">About</a>
            </li>
            <li>
              <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="block font-sans text-base font-semibold text-warmgray hover:text-copper py-1">Contact</a>
            </li>
            <li className="pt-4">
              <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="inline-flex items-center gap-1.5 font-sans font-semibold text-xs tracking-wider uppercase px-8 py-3.5 rounded-xl bg-copper text-parchment hover:bg-copper/90 transition-all duration-200 btn-magnetic">
                Let's Talk
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </li>
          </ul>
        </div>
      </header>

      {/* HERO SECTION */}
      <section id="hero" className="pt-32 pb-20 md:pt-44 md:pb-28 bg-parchment flex items-center relative overflow-hidden">
        {/* Soft atmospheric blurred copper glow orb behind the headline */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
          <div className="absolute top-[35%] left-[50%] -translate-x-[50%] -translate-y-[50%] w-[350px] md:w-[600px] h-[350px] md:h-[600px] rounded-full bg-copper/8 blur-[80px] md:blur-[120px] animate-pulse pointer-events-none" style={{ animationDuration: '6s' }} />
        </div>

        <div className="container mx-auto px-6 max-w-4xl text-center relative z-10">
          
          {/* Eyebrow Label with small icon */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-copper/20 bg-white/80 mb-7 shadow-2xs reveal">
            <Flame className="w-3.5 h-3.5 text-copper animate-pulse" />
            <span className="font-sans text-[11px] font-bold tracking-widest text-copper uppercase">WEB DEVELOPMENT AGENCY</span>
          </div>

          {/* Heading - Fraunces chunk bold, highlight key word in copper */}
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7.5xl font-extrabold text-nearblack leading-tight tracking-tight mb-6 reveal">
            Stunning Websites <br />
            <span className="text-copper">Forged for Growth</span>
          </h1>

          {/* Sub-Headline - Work Sans, normal weight, gray */}
          <p className="font-serif italic text-lg md:text-xl text-warmgray max-w-2xl mx-auto mb-5 leading-relaxed reveal">
            "Elevating India's finest boutiques, clinics, and local brands with world-class digital design."
          </p>

          {/* Paragraph */}
          <p className="font-sans text-[15px] md:text-base text-warmgray max-w-xl mx-auto mb-9 leading-relaxed reveal">
            No agency fluff. Just high-conversion, responsive web experiences tailored precisely to your brand and hand-delivered in 5–7 days.
          </p>

          {/* CTA Buttons - Unified solid copper family styling with magnetic interactions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-9 reveal">
            <a 
              href="#work" 
              className="font-sans font-bold text-xs tracking-wider uppercase px-8 py-4 rounded-xl bg-copper text-parchment hover:bg-copper/90 transition-all duration-200 w-full sm:w-auto text-center flex items-center justify-center gap-1.5 shadow-sm active:translate-y-0.5 btn-magnetic" 
              id="hero-btn-work"
            >
              See Our Work
              <ArrowUpRight className="w-4 h-4" />
            </a>
            
            <a 
              href="https://wa.me/918007006961" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="font-sans font-bold text-xs tracking-wider uppercase px-8 py-4 rounded-xl bg-copper text-parchment hover:bg-copper/90 transition-all duration-200 w-full sm:w-auto flex items-center justify-center gap-2 text-center active:translate-y-0.5 shadow-sm btn-magnetic" 
              id="hero-btn-whatsapp"
            >
              <MessageCircle className="w-4 h-4 shrink-0 text-parchment fill-parchment/10" />
              WhatsApp Me
            </a>
          </div>

          {/* Trust Line */}
          <div className="font-sans text-xs font-semibold text-warmgray tracking-wide flex items-center justify-center gap-2.5 reveal" id="hero-trust-line">
            <span className="text-amber-500">⭐⭐⭐⭐⭐</span>
            <span>Trusted by <CountUp end={10} />+ local businesses across India</span>
          </div>

        </div>
      </section>

      {/* BRAND MOTIF DIVIDER */}
      <div className="flex items-center justify-center gap-4 py-4 px-6 max-w-3xl mx-auto opacity-40">
        <div className="h-[1px] bg-copper/35 flex-grow"></div>
        <Hammer className="w-4 h-4 text-copper shrink-0" />
        <div className="h-[1px] bg-copper/35 flex-grow"></div>
      </div>

      {/* SELECTED WORK / PROJECTS */}
      <section id="work" className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-6.5xl">
          
          {/* Section Header - Left Aligned with Burgundy Italic Accent and Staggered Reveal */}
          <div className="mb-14 text-left">
            <span className="font-sans text-[11px] font-extrabold tracking-[0.25em] text-copper uppercase block mb-2.5 reveal" style={{ transitionDelay: '0ms' }}>SELECTED WORK</span>
            <h2 className="font-serif text-4xl md:text-5.5xl lg:text-6xl text-nearblack font-extrabold leading-tight">
              <span className="block reveal" style={{ transitionDelay: '60ms' }}>Featured</span>
              <span className="block text-burgundy italic font-bold mt-1 reveal" style={{ transitionDelay: '120ms' }}>Projects</span>
            </h2>
          </div>

          {/* Projects Layout Grid: alternating 2-column and full-width, full-bleed images with dark overlays */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10" id="project-grid">
            {projects.map((project, idx) => {
              const isFullWidth = idx % 3 === 2;
              return (
                <div 
                  key={idx} 
                  className={`group relative rounded-[24px] md:rounded-[32px] overflow-hidden flex flex-col justify-end h-[410px] md:h-[490px] reveal hover:shadow-2xl transition-all duration-500 border border-nearblack/5 bg-[#171412] ${
                    isFullWidth ? 'col-span-1 md:col-span-2' : 'col-span-1'
                  }`}
                  style={{ transitionDelay: `${idx * 0.05}s` }}
                >
                  {/* Laptop / Browser Bezel Mockup Frame */}
                  <div className="absolute inset-x-3 top-3 bottom-0 md:inset-x-5 md:top-5 md:bottom-0 rounded-t-xl bg-[#1F1B18] border-t-8 border-x-8 border-[#12100F] z-0 overflow-hidden shadow-2xl flex flex-col pt-5 group-hover:border-copper/40 transition-colors duration-500">
                    {/* Simulated 3-dot browser control bar */}
                    <div className="absolute top-0 left-0 w-full h-5 bg-[#0F0D0C] flex items-center px-3 gap-1.5 border-b border-[#24201E]/40">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#FF5F56]" />
                      <div className="w-1.5 h-1.5 rounded-full bg-[#FFBD2E]" />
                      <div className="w-1.5 h-1.5 rounded-full bg-[#27C93F]" />
                      <div className="mx-auto w-32 md:w-48 h-3 bg-charcoal/50 rounded text-[7px] text-white/30 flex items-center justify-center font-mono select-none overflow-hidden truncate">
                        {project.action.type === "link" ? project.action.url.replace("https://", "") : "websmith.in/secure-NDA-client"}
                      </div>
                    </div>
                    {/* Mockup screen containing the image */}
                    <div className="relative w-full h-full overflow-hidden bg-[#1F1B18]/50">
                      <img 
                        src={project.image} 
                        alt={project.name} 
                        className={`absolute inset-0 w-full h-full object-cover transition-transform duration-[700ms] ease-out group-hover:scale-105 ${
                          project.action.type === "disabled" ? "blur-md opacity-45 scale-[1.03]" : ""
                        }`}
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  </div>

                  {/* Corner ribbon for NDA Private Clients */}
                  {project.action.type === "disabled" && (
                    <div className="absolute top-5 right-5 md:top-7 md:right-7 bg-copper text-parchment text-[9px] font-sans font-extrabold tracking-widest uppercase px-2.5 py-1 rounded-md z-20 shadow-md flex items-center gap-1 border border-copper/20">
                      <span className="w-1.5 h-1.5 rounded-full bg-parchment animate-pulse" />
                      NDA — Private Client
                    </div>
                  )}
                  
                  {/* Smooth Cinema Gradient Overlay for Excellent Legibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/35 to-transparent z-10 transition-opacity duration-500 group-hover:via-black/50" />

                  {/* Copper-tinted overlay fading in at 10% opacity on card hover */}
                  <div className="absolute inset-0 bg-copper/0 group-hover:bg-copper/5 transition-colors duration-500 z-10 pointer-events-none" />

                  {/* Overlaid Info Block - Bottom Left Aligned */}
                  <div className="relative z-20 p-8 md:p-12 flex flex-col justify-end h-full text-left">
                    {/* Gold Category Eyebrow Tag */}
                    <span className="font-sans text-[10px] md:text-[11px] font-bold tracking-[0.2em] text-[#E5A93B] uppercase mb-2 block">
                      {project.tag}
                    </span>
                    
                    {/* Title shifts color to copper */}
                    <h3 className="font-serif text-2xl md:text-3.5xl font-extrabold text-white mb-2.5 leading-tight group-hover:text-copper transition-colors duration-300">
                      {project.name}
                    </h3>
                    
                    {/* Description */}
                    <p className="font-sans text-[13px] md:text-[14px] text-white/80 max-w-xl mb-6 leading-relaxed font-normal">
                      {project.desc}
                    </p>
                    
                    {/* Link Action with arrow nudging right */}
                    <div>
                      {project.action.type === "link" ? (
                        <a 
                          href={project.action.url} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="inline-flex items-center gap-1.5 font-sans font-bold text-xs uppercase text-white tracking-widest border-b-2 border-burgundy pb-0.5 hover:text-white/90 transition-colors"
                        >
                          Visit Live Site 
                          <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
                        </a>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 font-sans font-bold text-xs uppercase text-copper tracking-widest">
                          <span className="w-2 h-2 rounded-full bg-copper animate-pulse"></span>
                          NDA • Private Client
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* PROCESS TIMELINE SECTION: From Idea to Live in 7 Days */}
      <section id="timeline" className="py-24 bg-parchment border-t border-nearblack/5">
        <div className="container mx-auto px-6 max-w-5xl">
          {/* Section Header with staggered reveal and burgundy italic styling */}
          <div className="max-w-2xl mx-auto mb-16 text-center">
            <span className="font-sans text-[11px] font-extrabold tracking-widest text-copper uppercase block mb-3 reveal" style={{ transitionDelay: '0ms' }}>FAST-TRACK TIMELINE</span>
            <h2 className="font-serif text-4xl md:text-5.5xl lg:text-6xl text-nearblack font-extrabold leading-tight">
              <span className="block reveal" style={{ transitionDelay: '60ms' }}>From Idea</span>
              <span className="block text-burgundy italic font-bold mt-1 reveal" style={{ transitionDelay: '120ms' }}>to Live in 7 Days</span>
            </h2>
            {/* Ledger divider line */}
            <div className="w-16 h-[2.5px] bg-copper mx-auto mt-5 reveal" style={{ transitionDelay: '180ms' }}></div>
          </div>

          <div className="relative mt-16 pb-4">
            {/* Horizontal timeline line for Desktop */}
            <div className="hidden md:block absolute top-[27px] left-[12%] right-[12%] h-[2px] bg-copper/20 z-0" />
            
            {/* Vertical timeline line for Mobile */}
            <div className="md:hidden absolute top-7 bottom-7 left-[27px] w-[2px] bg-copper/20 z-0" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 relative z-10">
              {/* Step 1 */}
              <div className="flex md:flex-col items-start gap-6 md:gap-4 group reveal" style={{ transitionDelay: '0ms' }}>
                <div className="w-14 h-14 rounded-full bg-copper text-parchment font-serif font-bold text-lg flex items-center justify-center shadow-md shrink-0 border-4 border-parchment group-hover:scale-110 transition-transform duration-300">
                  01
                </div>
                <div className="text-left md:pt-2">
                  <div className="inline-block bg-copper/10 text-copper font-sans font-bold text-[10px] tracking-wider uppercase px-2.5 py-1 rounded-md mb-2">
                    Day 1-2
                  </div>
                  <h3 className="font-serif text-xl font-bold text-nearblack mb-2">Discovery</h3>
                  <p className="font-sans text-sm text-warmgray leading-relaxed">
                    We learn your business, gather your content, and map out exactly what your site needs to do.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex md:flex-col items-start gap-6 md:gap-4 group reveal" style={{ transitionDelay: '100ms' }}>
                <div className="w-14 h-14 rounded-full bg-copper text-parchment font-serif font-bold text-lg flex items-center justify-center shadow-md shrink-0 border-4 border-parchment group-hover:scale-110 transition-transform duration-300">
                  02
                </div>
                <div className="text-left md:pt-2">
                  <div className="inline-block bg-copper/10 text-copper font-sans font-bold text-[10px] tracking-wider uppercase px-2.5 py-1 rounded-md mb-2">
                    Day 3-5
                  </div>
                  <h3 className="font-serif text-xl font-bold text-nearblack mb-2">Design & Build</h3>
                  <p className="font-sans text-sm text-warmgray leading-relaxed">
                    We design and build your site, sending you progress previews along the way.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex md:flex-col items-start gap-6 md:gap-4 group reveal" style={{ transitionDelay: '200ms' }}>
                <div className="w-14 h-14 rounded-full bg-copper text-parchment font-serif font-bold text-lg flex items-center justify-center shadow-md shrink-0 border-4 border-parchment group-hover:scale-110 transition-transform duration-300">
                  03
                </div>
                <div className="text-left md:pt-2">
                  <div className="inline-block bg-[#E8F5E9] text-emerald-800 font-sans font-bold text-[10px] tracking-wider uppercase px-2.5 py-1 rounded-md mb-2">
                    Day 6-7
                  </div>
                  <h3 className="font-serif text-xl font-bold text-nearblack mb-2">Launch</h3>
                  <p className="font-sans text-sm text-warmgray leading-relaxed">
                    Your site goes live, connected to your domain, WhatsApp, and Google Maps — ready for customers.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* "HOW WE WORK" (charcoal full-bleed section - big differentiator) */}
      <section id="services" className="py-20 bg-charcoal text-parchment relative overflow-hidden">
        {/* Subtle grid accent background */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[radial-gradient(#C2622D_1px,transparent_1px)] [background-size:16px_16px]"></div>
        
        <div className="container mx-auto px-6 max-w-6.5xl relative z-10">
          
          {/* Section Header with staggered reveal and burgundy italic styling */}
          <div className="max-w-2xl mx-auto mb-16 text-center">
            <span className="font-sans text-[11px] font-extrabold tracking-widest text-copper uppercase block mb-3 reveal" style={{ transitionDelay: '0ms' }}>HOW WE WORK</span>
            <h2 className="font-serif text-4xl md:text-5.5xl lg:text-6xl text-white font-extrabold leading-tight">
              <span className="block reveal" style={{ transitionDelay: '60ms' }}>What We</span>
              <span className="block text-burgundy italic font-bold mt-1 reveal" style={{ transitionDelay: '120ms' }}>Do</span>
            </h2>
            {/* Ledger divider line inside charcoal section */}
            <div className="w-16 h-[2.5px] bg-copper mx-auto mt-5 reveal" style={{ transitionDelay: '180ms' }}></div>
          </div>

          {/* 3 Numbered Steps with 1px border cards, copper highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8" id="services-grid">
            {steps.map((step, idx) => (
              <div 
                key={idx}
                className="bg-nearblack/50 border border-white/10 p-8 rounded-xl hover:border-copper/40 hover:bg-nearblack/80 transition-all duration-300 flex flex-col h-full reveal"
                style={{ transitionDelay: `${idx * 0.1}s` }}
              >
                {/* Forge Number Circle */}
                <div className="w-11 h-11 rounded-lg bg-copper/10 text-copper border border-copper/20 flex items-center justify-center font-serif font-black text-lg mb-6 shadow-2xs">
                  {step.num}
                </div>
                <h3 className="font-serif text-xl font-bold text-white mb-3.5">{step.title}</h3>
                <p className="font-sans text-[13.5px] text-parchment/70 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* REVIEWS / TESTIMONIALS (white cards with 1px warm gray border, Work Sans quote) */}
      <section id="testimonials" className="py-20 bg-parchment">
        <div className="container mx-auto px-6 max-w-5xl">
          
          {/* Section Header with staggered reveal and burgundy italic styling */}
          <div className="max-w-2xl mx-auto mb-14 text-center">
            <span className="font-sans text-[11px] font-extrabold tracking-widest text-copper uppercase block mb-3 reveal" style={{ transitionDelay: '0ms' }}>CLIENT REVIEWS</span>
            <h2 className="font-serif text-4xl md:text-5.5xl lg:text-6xl text-nearblack font-extrabold leading-tight">
              <span className="block reveal" style={{ transitionDelay: '60ms' }}>What People</span>
              <span className="block text-burgundy italic font-bold mt-1 reveal" style={{ transitionDelay: '120ms' }}>Say</span>
            </h2>
          </div>

          {/* Desktop Testimonial Cards (hidden on mobile) */}
          <div className="hidden md:grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8" id="testimonials-grid">
            {testimonials.map((item, idx) => (
              <div 
                key={idx} 
                className="bg-white border border-nearblack/10 p-7 md:p-8 rounded-xl hover:shadow-xs transition-all duration-300 flex flex-col h-full reveal"
                style={{ transitionDelay: `${idx * 0.05}s` }}
              >
                {/* Rating and Highlighted Stat Badge */}
                <div className="flex justify-between items-start gap-4 mb-5 pb-3 border-b border-nearblack/5">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-copper text-sm">★</span>
                    ))}
                  </div>
                  <div className="text-right">
                    <span className="font-serif text-3xl font-black text-copper block leading-none">
                      {item.statNum}
                    </span>
                    <span className="font-sans text-[9px] font-bold tracking-widest text-warmgray uppercase block mt-1">
                      {item.statLabel}
                    </span>
                  </div>
                </div>

                {/* Quote in Work Sans (not italic serif) */}
                <p className="font-sans text-[14px] text-warmgray leading-relaxed mb-6 flex-grow">
                  "{item.quote}"
                </p>

                {/* Author */}
                <div className="mt-auto pt-4 border-t border-nearblack/5 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-forgegreen/10 text-forgegreen font-serif font-black text-sm flex items-center justify-center select-none">
                    {item.name[0]}
                  </div>
                  <div>
                    <h4 className="font-sans font-bold text-sm text-nearblack leading-none mb-1">
                      {item.name}
                    </h4>
                    <p className="font-sans text-xs text-warmgray">
                      {item.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Swipeable Testimonial Carousel (hidden on desktop) */}
          <div 
            className="md:hidden block relative select-none touch-pan-x overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            id="mobile-testimonials-carousel"
          >
            <div 
              className="transition-all duration-500 ease-out transform scale-100 opacity-100"
              key={activeIndex}
            >
              <div className="bg-white border border-nearblack/10 p-7 rounded-2xl hover:shadow-md transition-all duration-300 flex flex-col h-full min-h-[320px]">
                {/* Rating and Stat Badge */}
                <div className="flex justify-between items-start gap-4 mb-5 pb-3 border-b border-nearblack/5">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-copper text-sm">★</span>
                    ))}
                  </div>
                  <div className="text-right">
                    <span className="font-serif text-2xl font-black text-copper block leading-none">
                      {testimonials[activeIndex].statNum}
                    </span>
                    <span className="font-sans text-[9px] font-bold tracking-widest text-warmgray uppercase block mt-1">
                      {testimonials[activeIndex].statLabel}
                    </span>
                  </div>
                </div>

                {/* Quote in Work Sans */}
                <p className="font-sans text-[14px] text-warmgray leading-relaxed mb-6 flex-grow">
                  "{testimonials[activeIndex].quote}"
                </p>

                {/* Author */}
                <div className="mt-auto pt-4 border-t border-nearblack/5 flex items-center justify-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-forgegreen/10 text-forgegreen font-serif font-black text-sm flex items-center justify-center select-none">
                    {testimonials[activeIndex].name[0]}
                  </div>
                  <div className="text-left">
                    <h4 className="font-sans font-bold text-sm text-nearblack leading-none mb-1">
                      {testimonials[activeIndex].name}
                    </h4>
                    <p className="font-sans text-xs text-warmgray">
                      {testimonials[activeIndex].role}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Pill Expansion Dots Indicator */}
            <div className="flex justify-center gap-2 mt-6">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    activeIndex === i ? 'w-6 bg-copper' : 'w-2 bg-nearblack/15'
                  }`}
                  aria-label={`Go to review ${i + 1}`}
                />
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* BRAND MOTIF DIVIDER */}
      <div className="flex items-center justify-center gap-4 py-2 px-6 max-w-3xl mx-auto opacity-40">
        <div className="h-[1px] bg-copper/35 flex-grow"></div>
        <Hammer className="w-4 h-4 text-copper shrink-0" />
        <div className="h-[1px] bg-copper/35 flex-grow"></div>
      </div>

      {/* FAQ SECTION */}
      <section id="faq" className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-3xl">
          
          {/* Section Header with staggered reveal and burgundy italic styling */}
          <div className="max-w-2xl mx-auto mb-12 text-center">
            <span className="font-sans text-[11px] font-extrabold tracking-widest text-copper uppercase block mb-3 reveal" style={{ transitionDelay: '0ms' }}>FAQ</span>
            <h2 className="font-serif text-4xl md:text-5.5xl lg:text-6xl text-nearblack font-extrabold leading-tight">
              <span className="block reveal" style={{ transitionDelay: '60ms' }}>Answering Your</span>
              <span className="block text-burgundy italic font-bold mt-1 reveal" style={{ transitionDelay: '120ms' }}>Questions</span>
            </h2>
          </div>

          {/* Accordion container - White cards with 1px warm-gray border */}
          <div className="space-y-3.5" id="faq-accordion">
            {faqItems.map((item, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div 
                  key={idx} 
                  className={`bg-white border border-nearblack/10 rounded-xl overflow-hidden transition-all duration-300 ${isOpen ? 'shadow-xs border-copper/35' : ''}`}
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className={`w-full text-left px-5 py-4 md:px-6 md:py-5 flex items-center justify-between gap-4 font-sans font-semibold text-nearblack hover:text-copper transition-all duration-300 border-l-4 focus:outline-none cursor-pointer ${
                      isOpen ? 'border-copper bg-copper/[0.03] pl-6 md:pl-7' : 'border-transparent'
                    }`}
                    aria-expanded={isOpen}
                    id={`faq-btn-${idx}`}
                  >
                    <span className="text-[14px] md:text-base flex items-center gap-3">
                      <span className="w-1.5 h-1.5 bg-copper rounded-full shrink-0"></span>
                      {item.question}
                    </span>
                    <span className={`w-7 h-7 rounded-lg bg-parchment flex items-center justify-center text-copper transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] shrink-0 ${isOpen ? 'rotate-180 bg-copper/10' : ''}`}>
                      <ChevronDown className="w-3.5 h-3.5" />
                    </span>
                  </button>

                  <div 
                    className={`grid transition-all duration-300 ease-in-out ${
                      isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="px-5 py-4 md:px-6 md:py-5 text-warmgray text-xs md:text-[14px] leading-relaxed bg-parchment/20 border-t border-nearblack/5">
                        {item.answer}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="py-20 bg-parchment border-t border-nearblack/5">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          
          <div className="max-w-2xl mx-auto text-center mb-10">
            <h2 className="font-serif text-4xl md:text-5.5xl lg:text-6xl text-nearblack font-extrabold leading-tight">
              <span className="block reveal" style={{ transitionDelay: '60ms' }}>Who Is</span>
              <span className="block text-burgundy italic font-bold mt-1 reveal" style={{ transitionDelay: '120ms' }}>Websmith?</span>
            </h2>
          </div>

          <div className="max-w-2xl mx-auto reveal">
            {/* Body */}
            <p className="font-sans text-[15px] md:text-base text-warmgray leading-relaxed mb-9">
              We're a lean, fast, obsessive web development team with one mission — <strong>building websites that actually help real businesses grow online.</strong> We don't do agency fluff. We cold-call businesses, find the gap in their digital presence, and fix it fast.
            </p>

            {/* Badges (Rounded-rect chip badges, copper text, white bg) */}
            <div className="flex flex-wrap justify-center items-center gap-3 mb-4" id="about-badges">
              <span className="inline-block font-sans text-xs font-semibold text-copper bg-white border border-nearblack/10 rounded-lg px-4.5 py-2.5 shadow-2xs">
                ✓ No long contracts
              </span>
              <span className="inline-block font-sans text-xs font-semibold text-copper bg-white border border-nearblack/10 rounded-lg px-4.5 py-2.5 shadow-2xs">
                ✓ Delivered in 5–7 days
              </span>
              <span className="inline-block font-sans text-xs font-semibold text-copper bg-white border border-nearblack/10 rounded-lg px-4.5 py-2.5 shadow-2xs">
                ✓ Mobile-first always
              </span>
            </div>

            {/* Founder / Human-Presence Block */}
            <div className="mt-16 pt-12 border-t border-nearblack/5 max-w-xl mx-auto text-center" id="founder-block">
              <div className="relative inline-block mb-4">
                {/* Rounded initials avatar with a premium copper border */}
                <div className="w-16 h-16 rounded-full bg-copper text-parchment font-serif font-black text-xl flex items-center justify-center shadow-md border-2 border-copper/30">
                  S
                </div>
                {/* Active status indicator dot */}
                <div className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-emerald-500 border-2 border-parchment animate-pulse" />
              </div>
              <h4 className="font-sans font-bold text-sm text-nearblack mb-0.5">Siddharth Mehta</h4>
              <p className="font-sans text-[11px] font-extrabold tracking-widest text-copper uppercase mb-5">Founder, Websmith</p>
              
              <div className="relative">
                {/* Stylized custom quote icons */}
                <span className="absolute -top-6 -left-3 text-copper/10 font-serif text-7xl select-none leading-none">“</span>
                <p className="font-sans italic text-xs md:text-[13px] text-warmgray leading-relaxed relative z-10 px-4">
                  "I started Websmith because I was tired of seeing local businesses pay agencies lakhs for over-engineered websites that took months to deliver. We build exactly what you need to get customers, and we do it in a week. No fluff, just pure forge-crafted growth."
                </p>
                <span className="absolute -bottom-10 -right-3 text-copper/10 font-serif text-7xl select-none leading-none">”</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* CONTACT SECTION WITH FORM */}
      <section id="contact" className="py-20 bg-parchment border-t border-nearblack/10">
        <div className="container mx-auto px-6 max-w-5xl">
          
          {/* Section Header with staggered reveal and burgundy italic styling */}
          <div className="max-w-2xl mx-auto mb-14 text-center">
            <span className="font-sans text-[11px] font-extrabold tracking-widest text-copper uppercase block mb-3 reveal" style={{ transitionDelay: '0ms' }}>GET IN TOUCH</span>
            <h2 className="font-serif text-4xl md:text-5.5xl lg:text-6xl text-nearblack font-extrabold leading-tight mb-5">
              <span className="block reveal" style={{ transitionDelay: '60ms' }}>Let's Build</span>
              <span className="block text-burgundy italic font-bold mt-1 reveal" style={{ transitionDelay: '120ms' }}>Something Great</span>
            </h2>
            <p className="font-sans text-sm md:text-base text-warmgray reveal" style={{ transitionDelay: '180ms' }}>
              Ready to take your business online? We're currently accepting new projects. Reach out — let's get you customers.
            </p>
          </div>

          {/* Three Info Cards in a Row (1px borders, white backgrounds) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12" id="contact-info-cards">
            {/* Card 1 */}
            <a 
              href="https://wa.me/918007006961" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="bg-white p-6 rounded-xl border border-nearblack/10 flex flex-col items-center hover:-translate-y-0.5 hover:border-copper/40 transition-all duration-200 no-underline text-nearblack reveal group"
            >
              <span className="font-serif text-base text-copper font-bold block mb-1">WhatsApp</span>
              <span className="font-sans text-sm font-semibold text-nearblack group-hover:text-copper transition-colors">+91 80070 06961</span>
            </a>

            {/* Card 2 */}
            <a 
              href="mailto:buildwithwebsmith@gmail.com" 
              className="bg-white p-6 rounded-xl border border-nearblack/10 flex flex-col items-center hover:-translate-y-0.5 hover:border-copper/40 transition-all duration-200 no-underline text-nearblack reveal group"
            >
              <span className="font-serif text-base text-copper font-bold block mb-1">Email</span>
              <span className="font-sans text-sm font-semibold text-nearblack group-hover:text-copper transition-colors">buildwithwebsmith@gmail.com</span>
            </a>

            {/* Card 3 */}
            <div className="bg-white p-6 rounded-xl border border-nearblack/10 flex flex-col items-center justify-center select-none reveal text-center">
              <span className="font-serif text-base text-copper font-bold block mb-1">Status</span>
              <span className="font-sans text-xs font-semibold text-nearblack flex items-center justify-center gap-1.5">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                Currently accepting <strong className="text-copper">2 new projects</strong> this month
              </span>
            </div>
          </div>

          {/* GORGEOUS INTERACTIVE CONTACT FORM */}
          <div className="max-w-2xl mx-auto bg-white border border-nearblack/10 rounded-2xl p-6 md:p-9 mb-12 reveal shadow-sm" id="contact-form-container">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-nearblack/5 pb-4">
              <h3 className="font-serif text-xl font-bold text-nearblack flex items-center gap-2">
                <span className="w-1.5 h-6 bg-copper rounded-full"></span>
                Start Your 5-7 Day Sprint
              </h3>
              
              {/* Trust & Urgency Micro-badges */}
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-copper/5 text-copper rounded-md text-[10px] font-sans font-extrabold tracking-wider uppercase border border-copper/10">
                  ⚡ Avg. response: under 15m
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-50 text-emerald-800 rounded-md text-[10px] font-sans font-extrabold tracking-wider uppercase border border-emerald-100">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  2 slots left
                </span>
              </div>
            </div>

            {formSubmitted ? (
              <div className="py-8 text-center" id="form-success-state">
                <div className="w-16 h-16 bg-copper/10 text-copper rounded-full flex items-center justify-center mx-auto mb-5">
                  <Check className="w-8 h-8" />
                </div>
                <h4 className="font-serif text-2xl font-bold text-nearblack mb-3">Project Specs Handed Off!</h4>
                <p className="font-sans text-sm text-warmgray max-w-md mx-auto mb-8">
                  Thanks <strong>{formData.name}</strong>, we have prepared our workbench. Our average response time is under 15 minutes. Click below to instantly accelerate via WhatsApp.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <button 
                    onClick={triggerWhatsAppRedirect}
                    className="w-full sm:w-auto font-sans font-bold text-xs tracking-wider uppercase px-7 py-4 flex items-center justify-center gap-2 rounded-xl bg-copper text-parchment hover:bg-copper/90 transition-all duration-200"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Instant WhatsApp Ping
                  </button>
                  <button 
                    onClick={() => {
                      setFormSubmitted(false);
                      setFormStep(1);
                      setFormData({
                        name: '',
                        email: '',
                        phone: '',
                        businessName: '',
                        city: '',
                        serviceType: 'New Website',
                        message: ''
                      });
                    }}
                    className="w-full sm:w-auto font-sans text-xs font-semibold text-warmgray hover:text-nearblack transition-colors"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                
                {formError && (
                  <div className="p-4 bg-rose-50 text-rose-800 rounded-xl flex items-start gap-2.5 text-xs font-medium" id="form-error-display">
                    <AlertCircle className="w-4 h-4 shrink-0 text-rose-600 mt-0.5" />
                    <span>{formError}</span>
                  </div>
                )}

                {/* Step Indicator dots/segments */}
                <div className="flex items-center justify-between mb-4 bg-parchment/30 p-3 rounded-xl border border-nearblack/5">
                  <span className="font-sans text-xs font-bold text-warmgray uppercase tracking-wider">
                    Step {formStep} of 2
                  </span>
                  <div className="flex gap-2">
                    <div className={`h-1.5 rounded-full transition-all duration-300 ${formStep === 1 ? 'w-8 bg-copper' : 'w-4 bg-nearblack/10'}`} />
                    <div className={`h-1.5 rounded-full transition-all duration-300 ${formStep === 2 ? 'w-8 bg-copper' : 'w-4 bg-nearblack/10'}`} />
                  </div>
                </div>

                {formStep === 1 ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Name field */}
                      <div>
                        <label className="block font-sans text-xs font-bold text-nearblack mb-1.5">Your Name *</label>
                        <input 
                          type="text" 
                          name="name" 
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="e.g. Ramesh Patel" 
                          className="w-full font-sans text-[13.5px] bg-parchment/30 border border-nearblack/10 rounded-xl px-4 py-3 h-12 text-nearblack placeholder:text-warmgray/50 focus:outline-none focus:ring-1.5 focus:ring-copper focus:border-copper transition-all"
                          required
                        />
                      </div>

                      {/* Phone field */}
                      <div>
                        <label className="block font-sans text-xs font-bold text-nearblack mb-1.5">Phone Number *</label>
                        <input 
                          type="tel" 
                          name="phone" 
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="e.g. +91 98765 43210" 
                          className="w-full font-sans text-[13.5px] bg-parchment/30 border border-nearblack/10 rounded-xl px-4 py-3 h-12 text-nearblack placeholder:text-warmgray/50 focus:outline-none focus:ring-1.5 focus:ring-copper focus:border-copper transition-all"
                          required
                        />
                      </div>
                    </div>

                    <div className="pt-2">
                      <button 
                        type="button" 
                        onClick={handleContinueStep2}
                        className="w-full font-sans font-bold text-xs tracking-wider uppercase h-12 rounded-xl bg-copper text-parchment hover:bg-copper/90 transition-all duration-200 flex items-center justify-center gap-1.5 shadow-sm active:translate-y-0.5 cursor-pointer"
                      >
                        Continue to Next Step
                        <span>&rarr;</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {/* Business Name field */}
                      <div>
                        <label className="block font-sans text-xs font-bold text-nearblack mb-1.5">Business Name</label>
                        <input 
                          type="text" 
                          name="businessName" 
                          value={formData.businessName}
                          onChange={handleInputChange}
                          placeholder="e.g. Luxmi Brick Field" 
                          className="w-full font-sans text-[13.5px] bg-parchment/30 border border-nearblack/10 rounded-xl px-4 py-3 h-12 text-nearblack placeholder:text-warmgray/50 focus:outline-none focus:ring-1.5 focus:ring-copper focus:border-copper transition-all"
                        />
                      </div>

                      {/* Email field */}
                      <div>
                        <label className="block font-sans text-xs font-bold text-nearblack mb-1.5">Email Address *</label>
                        <input 
                          type="email" 
                          name="email" 
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="e.g. ramesh@luxmibricks.com" 
                          className="w-full font-sans text-[13.5px] bg-parchment/30 border border-nearblack/10 rounded-xl px-4 py-3 h-12 text-nearblack placeholder:text-warmgray/50 focus:outline-none focus:ring-1.5 focus:ring-copper focus:border-copper transition-all"
                          required
                        />
                      </div>

                      {/* City field */}
                      <div>
                        <label className="block font-sans text-xs font-bold text-nearblack mb-1.5">City *</label>
                        <input 
                          type="text" 
                          name="city" 
                          value={formData.city}
                          onChange={handleInputChange}
                          placeholder="e.g. Pune" 
                          className="w-full font-sans text-[13.5px] bg-parchment/30 border border-nearblack/10 rounded-xl px-4 py-3 h-12 text-nearblack placeholder:text-warmgray/50 focus:outline-none focus:ring-1.5 focus:ring-copper focus:border-copper transition-all"
                          required
                        />
                      </div>
                    </div>

                    {/* Dropdown for project scope / service type */}
                    <div>
                      <label className="block font-sans text-xs font-bold text-nearblack mb-1.5">What do you need?</label>
                      <select 
                        name="serviceType"
                        value={formData.serviceType}
                        onChange={handleInputChange}
                        className="w-full font-sans text-[13.5px] bg-parchment/30 border border-nearblack/10 rounded-xl px-4 py-3 h-12 text-nearblack focus:outline-none focus:ring-1.5 focus:ring-copper focus:border-copper transition-all"
                      >
                        <option value="New Website">New Business Website</option>
                        <option value="Redesign existing">Redesign Existing Website</option>
                        <option value="Add features">Add Custom Features / WhatsApp Integration</option>
                        <option value="Not sure yet">Consultation / Not Sure Yet</option>
                      </select>
                    </div>

                    {/* Message field */}
                    <div>
                      <label className="block font-sans text-xs font-bold text-nearblack mb-1.5">Tell us about your business</label>
                      <textarea 
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={3} 
                        placeholder="Describe what you sell, your target audience, or any specific pages you want built..." 
                        className="w-full font-sans text-[13.5px] bg-parchment/30 border border-nearblack/10 rounded-xl px-4 py-3 text-nearblack placeholder:text-warmgray/50 focus:outline-none focus:ring-1.5 focus:ring-copper focus:border-copper transition-all resize-none"
                      ></textarea>
                    </div>

                    <div className="pt-2">
                      <button 
                        type="submit" 
                        className="w-full font-sans font-bold text-xs tracking-wider uppercase h-12 rounded-xl bg-copper text-parchment hover:bg-copper/90 transition-all duration-200 flex items-center justify-center gap-1.5 shadow-sm active:translate-y-0.5 cursor-pointer"
                        id="form-submit-btn"
                      >
                        Send My Details &rarr;
                      </button>
                      
                      {/* Urgency guarantee reassurance line */}
                      <p className="text-center font-sans text-[11px] text-warmgray/80 mt-3.5">
                        🔒 No advance payment required — approve the design before you pay a thing.
                      </p>
                    </div>

                    <div className="text-center pt-2">
                      <button 
                        type="button" 
                        onClick={() => setFormStep(1)} 
                        className="font-sans text-[11px] font-bold text-copper hover:underline uppercase tracking-wider cursor-pointer"
                      >
                        &larr; Back to Step 1
                      </button>
                    </div>
                  </div>
                )}
              </form>
            )}
          </div>

          {/* Centered WhatsApp CTA Button */}
          <div className="reveal text-center">
            <a 
              href="https://wa.me/918007006961" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center justify-center gap-2.5 font-sans font-bold text-xs tracking-wider uppercase px-9 py-4.5 rounded-xl bg-copper text-parchment hover:bg-copper/90 transition-all duration-200 active:translate-y-0.5 shadow-xs"
              id="contact-btn-whatsapp"
            >
              <MessageCircle className="w-4.5 h-4.5 text-parchment" />
              Message on WhatsApp
            </a>
          </div>

        </div>
      </section>

      {/* FOOTER (charcoal background, cream text, minimal) */}
      <footer className="bg-charcoal text-parchment py-12 border-t border-white/5 text-center" id="site-footer">
        <div className="container mx-auto px-6 max-w-4xl">
          {/* Centered Footer Logo Lockup */}
          <div className="flex justify-center mb-8">
            <a href="#" className="no-underline">
              <Logo variant="dark" size={40} />
            </a>
          </div>

          {/* Footer Quick Links with custom premium underlines */}
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 mb-8">
            <a href="#work" className="font-sans text-xs tracking-wider uppercase font-semibold text-parchment/75 hover:text-copper transition-colors footer-link-underline">Work</a>
            <a href="#services" className="font-sans text-xs tracking-wider uppercase font-semibold text-parchment/75 hover:text-copper transition-colors footer-link-underline">Process</a>
            <a href="#about" className="font-sans text-xs tracking-wider uppercase font-semibold text-parchment/75 hover:text-copper transition-colors footer-link-underline">About</a>
            <a href="#faq" className="font-sans text-xs tracking-wider uppercase font-semibold text-parchment/75 hover:text-copper transition-colors footer-link-underline">FAQ</a>
            <a href="#contact" className="font-sans text-xs tracking-wider uppercase font-semibold text-parchment/75 hover:text-copper transition-colors footer-link-underline">Contact</a>
          </div>
          
          <p className="font-sans text-xs text-parchment/50 tracking-wider">
            © 2025 Websmith. Forging the web, one business at a time. 🔨
          </p>
        </div>
      </footer>

      {/* FLOATING BACK TO TOP BUTTON (circular, copper fill, fixed bottom-left) */}
      <button 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-6 left-6 w-14 h-14 bg-copper text-parchment rounded-full flex items-center justify-center shadow-xl hover:scale-110 active:scale-95 transition-all duration-300 z-50 group border border-copper/10 ${showBackToTop ? 'opacity-100 scale-100' : 'opacity-0 scale-75 pointer-events-none'}`}
        aria-label="Back to Top"
        id="back-to-top-btn"
      >
        <ArrowUp className="w-5.5 h-5.5 text-parchment group-hover:-translate-y-1 transition-transform duration-300 animate-bounce-subtle" />
      </button>

      {/* FLOATING WHATSAPP BUTTON (circular, brand green, fixed bottom-right) */}
      <a 
        href="https://wa.me/918007006961" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="fixed bottom-6 right-6 w-14 h-14 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-full flex items-center justify-center shadow-xl hover:scale-110 active:scale-95 transition-all duration-200 z-50 group"
        aria-label="Chat with Websmith on WhatsApp"
        id="floating-whatsapp-btn"
      >
        <MessageCircle className="w-7 h-7 text-white fill-white/10 group-hover:scale-110 transition-transform" />
      </a>

    </div>
  );
}
