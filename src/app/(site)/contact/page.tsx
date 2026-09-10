'use client';

import React, { useState, useEffect } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  Headphones,
  CheckCircle2,
} from 'lucide-react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { motion, fadeInUp, staggerContainer, staggerItem, AnimatePresence } from '@/components/ui/Motion';

const contactNumbers = [
  { display: '09166843265', href: 'tel:+2349166843265' },
  { display: '08131009450', href: 'tel:+2348131009450' },
];

const contactPhoneDisplay = contactNumbers.map((phone) => phone.display).join(', ');

const contactMethods = [
  {
    icon: MessageSquare,
    title: 'WhatsApp',
    description: 'Chat with our team in real-time for quick questions.',
    action: contactPhoneDisplay,
    color: 'bg-green-100 text-green-600',
    glowColor: 'ring-green-400 shadow-green-200',
    href: 'https://wa.me/2349166843265?text=Hello%20BizSuits%2C%20I%20have%20a%20question.',
  },
  {
    icon: Mail,
    title: 'Email Us',
    description: 'Send us a detailed message and we\'ll respond within 24 hours.',
    action: 'hello@bizsuits.com',
    color: 'bg-purple-100 text-purple-600',
    glowColor: 'ring-purple-400 shadow-purple-200',
    href: 'mailto:hello@bizsuits.com',
  },
  {
    icon: Phone,
    title: 'Call Us',
    description: 'Speak directly with our sales or support team.',
    action: contactPhoneDisplay,
    color: 'bg-emerald-100 text-emerald-600',
    glowColor: 'ring-emerald-400 shadow-emerald-200',
    href: 'tel:+2349166843265',
  },
  {
    icon: Headphones,
    title: 'Support Center',
    description: 'Browse our knowledge base and help documentation.',
    action: 'Visit Help Center',
    color: 'bg-orange-100 text-orange-600',
    glowColor: 'ring-orange-400 shadow-orange-200',
    href: '/blog',
  },
];

const offices = [
  {
    city: 'Lekki',
    country: 'Nigeria',
    address: 'Lekki Schem 2\nLagos, Nigeria',
    phones: contactNumbers,
    type: 'Main Office',
  },
];

// Conversational messages — each points to a specific contact card
const cardMessages = [
  { text: 'Need a quick answer? Start on WhatsApp.', cardIndex: 0 },
  { text: 'Send us the details and we’ll reply by email.', cardIndex: 1 },
  { text: 'Prefer a conversation? Call our team.', cardIndex: 2 },
  { text: 'Looking for guidance? Start with our help center.', cardIndex: 3 },
];

// Tilt transforms per card position — the face leans toward each card
// Cards: 0=far-left, 1=center-left, 2=center-right, 3=far-right
const cardTilts = [
  'rotateY(-14deg) rotateX(8deg) rotateZ(-3deg)',   // lean left + down
  'rotateY(-5deg) rotateX(10deg) rotateZ(-1deg)',    // slight left + down
  'rotateY(5deg) rotateX(10deg) rotateZ(1deg)',      // slight right + down
  'rotateY(14deg) rotateX(8deg) rotateZ(3deg)',      // lean right + down
];

// Animated chatbot face — tilts toward active contact card like GitHub Copilot icon
function AnimatedLogo({ activeCard }: { activeCard: number }) {
  const [blinking, setBlinking] = useState(false);
  const [mouthOpen, setMouthOpen] = useState(false);

  // Blink eyes periodically
  useEffect(() => {
    const blink = () => {
      setBlinking(true);
      setTimeout(() => setBlinking(false), 200);
    };
    const interval = setInterval(blink, 3200);
    const first = setTimeout(blink, 1500);
    return () => { clearInterval(interval); clearTimeout(first); };
  }, []);

  // Animate mouth when card changes (speaking)
  useEffect(() => {
    setMouthOpen(true);
    const t1 = setTimeout(() => setMouthOpen(false), 300);
    const t2 = setTimeout(() => setMouthOpen(true), 500);
    const t3 = setTimeout(() => setMouthOpen(false), 800);
    const t4 = setTimeout(() => setMouthOpen(true), 1000);
    const t5 = setTimeout(() => setMouthOpen(false), 1300);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); clearTimeout(t5); };
  }, [activeCard]);

  return (
    <motion.div
      className="flex flex-col items-center mb-6"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="relative">
        {/* Speech bubble */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCard}
            initial={{ opacity: 0, y: 8, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.9 }}
            transition={{ duration: 0.35 }}
            className="absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap bg-white border border-dark-900 px-3 py-1 text-xs font-semibold text-dark-900 shadow-md z-10"
          >
            <span className="text-xs font-medium text-dark-900">
              {cardMessages[activeCard].text}
            </span>
            <div className="absolute left-1/2 -translate-x-1/2 -bottom-1.5 w-3 h-3 bg-white border-b border-r border-dark-900 rotate-45" />
          </motion.div>
        </AnimatePresence>

        {/* Logo container with perspective */}
        <motion.div
          className="relative w-28 h-28 md:w-32 md:h-32 mx-auto"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
          style={{ perspective: '600px' }}
        >
          {/* The SVG logo — tilts toward the active card */}
          <svg
            viewBox="0 0 318.34 318.34"
            data-logo="true"
            className="logo-rounded relative w-full h-full drop-shadow-lg"
            style={{
              transform: cardTilts[activeCard],
              transition: 'transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
              transformStyle: 'preserve-3d',
            }}
          >
            <defs>
              <linearGradient id="contact-face-grad" x1="109.22" y1="58.65" x2="235.04" y2="311.86" gradientUnits="userSpaceOnUse">
                <stop offset="0" stopColor="#2563EB" />
                <stop offset="1" stopColor="#1D4ED8" />
              </linearGradient>
            </defs>

            {/* Body with official brand rounded corners */}
            <rect fill="url(#contact-face-grad)" width="318.34" height="318.34" rx="83.83" ry="83.83" />

            {/* Left wing */}
            <g style={{
              transformOrigin: '125px 140px',
              transform: blinking ? 'scaleY(0.05)' : 'scaleY(1)',
              transition: 'transform 0.15s ease-in-out',
            }}>
              <path fill="#fff" d="M147.28,130.83l-41.66-36.95c-5.73-5.08-14.74-.75-14.35,6.89l3.8,75.81c.38,7.53,9.55,10.99,14.81,5.59l37.86-38.85c3.44-3.53,3.23-9.22-.45-12.49l-41.66-36.95c-5.73-5.08-14.74-.75-14.35,6.89l3.8,75.81c.38,7.53,9.55,10.99,14.81,5.59l37.86-38.85c3.44-3.53,3.23-9.22-.45-12.49Z" />
            </g>

            {/* Right eye */}
            <g style={{
              transformOrigin: '193px 140px',
              transform: blinking ? 'scaleY(0.05)' : 'scaleY(1)',
              transition: 'transform 0.15s ease-in-out',
            }}>
              <path fill="#fff" d="M171.06,130.83l41.66-36.95c5.73-5.08,14.74-.75,14.35,6.89l-3.8,75.81c-.38,7.53-9.55,10.99-14.81,5.59l-37.86-38.85c-3.44-3.53-3.23-9.22.45-12.49l41.66-36.95c5.73-5.08,14.74-.75,14.35,6.89l-3.8,75.81c-.38,7.53-9.55,10.99-14.81,5.59l-37.86-38.85c-3.44-3.53-3.23-9.22.45-12.49Z" />
            </g>

            {/* Mouth — scales from center of the triangle */}
            <g style={{
              transformOrigin: '159px 205px',
              transform: mouthOpen ? 'scale(1.08, 1.4)' : 'scale(1, 1)',
              transition: 'transform 0.18s ease-in-out',
            }}>
              <path fill="#fff" d="M165.87,183.43l13.66,35.39c1.75,4.53-1.62,9.4-6.48,9.37l-27.85-.21c-4.86-.04-8.15-4.96-6.34-9.46l14.19-35.18c2.34-5.8,10.56-5.73,12.81.1l13.66,35.39c1.75,4.53-1.62,9.4-6.48,9.37l-27.85-.21c-4.86-.04-8.15-4.96-6.34-9.46l14.19-35.18c2.34-5.8,10.56-5.73,12.81.1Z" />
            </g>
          </svg>

        </motion.div>
      </div>
    </motion.div>
  );
}

export default function ContactPage() {
  const [activeCard, setActiveCard] = useState(0);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    phone: '',
    subject: 'general',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData((current) => ({ ...current, [name]: value }));
    setSubmitError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    // Build the WhatsApp message from form data
    const subjectMap: Record<string, string> = {
      general: 'General Inquiry',
      sales: 'Sales & Pricing',
      support: 'Technical Support',
      demo: 'Request a Demo',
      partnership: 'Partnership',
      press: 'Press & Media',
    };

    const text = [
      `*New Contact Form Message*`,
      ``,
      `*Name:* ${formData.firstName} ${formData.lastName}`,
      `*Email:* ${formData.email}`,
      formData.company ? `*Company:* ${formData.company}` : '',
      formData.phone ? `*Phone:* ${formData.phone}` : '',
      `*Subject:* ${subjectMap[formData.subject] || formData.subject}`,
      ``,
      `*Message:*`,
      formData.message,
    ]
      .filter(Boolean)
      .join('\n');

    if (text.length > 1500) {
      setIsSubmitting(false);
      setSubmitError('Please shorten the message before opening WhatsApp.');
      return;
    }

    const encoded = encodeURIComponent(text);
    const popup = window.open(`https://wa.me/2349166843265?text=${encoded}`, '_blank', 'noopener,noreferrer');

    if (!popup) {
      setIsSubmitting(false);
      setSubmitError('WhatsApp could not be opened. Allow pop-ups or use the contact links below.');
      return;
    }

    setIsSubmitting(false);
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  // Cycle the active card every 5.5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCard((prev) => (prev + 1) % contactMethods.length);
    }, 5500);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Hero */}
      <section className="pt-28 md:pt-36 pb-16 md:pb-20 bg-[#f8fafc] border-b border-dark-200 relative">
        <div className="container-custom relative z-10 text-center">
          <AnimatedLogo activeCard={activeCard} />
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="mt-6 mb-4"
          >
            <span className="inline-flex items-center px-3.5 py-1 border border-primary-200 bg-primary-50/60 text-xs font-semibold uppercase tracking-wider text-primary-700">
              Direct Engineering Consultation
            </span>
          </motion.div>
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold font-display text-dark-900 mb-6 tracking-tight"
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.1 }}
          >
            Talk to a <span className="text-primary-600">BizSuits Specialist</span>
          </motion.h1>
          <motion.p
            className="text-base md:text-lg text-dark-600 max-w-2xl mx-auto leading-relaxed font-sans"
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
          >
            Whether you are evaluating a tailored inventory system, custom POS till hardware, or multi-location synchronization, our architecture team is ready to scope your deployment.
          </motion.p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-12 -mt-6">
        <div className="container-custom">
          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {contactMethods.map((method, index) => (
              <motion.a
                key={method.title}
                href={method.href}
                target={method.href.startsWith('http') ? '_blank' : undefined}
                rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                variants={staggerItem}
              >
                <div
                  className={`text-center p-6 border transition-all duration-200 h-full flex flex-col justify-between ${
                    activeCard === index
                      ? 'border-primary-600 bg-white shadow-md ring-1 ring-primary-500'
                      : 'border-dark-200 bg-white hover:border-dark-400 shadow-sm'
                  }`}
                >
                  <div>
                    <div
                      className="w-11 h-11 border border-dark-200 bg-dark-50 text-dark-900 flex items-center justify-center mx-auto mb-4"
                    >
                      <method.icon className="w-5 h-5 text-primary-600" />
                    </div>
                    <h3 className="text-base font-bold font-display text-dark-900 mb-1.5">{method.title}</h3>
                    <p className="text-xs text-dark-600 mb-4 leading-relaxed font-sans">{method.description}</p>
                  </div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-primary-700">{method.action}</p>
                </div>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact Form + Info */}
      <section className="section-padding bg-white border-t border-dark-200">
        <div className="container-custom">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
            {/* Form */}
            <motion.div
              className="lg:col-span-3"
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <h2 className="text-2xl md:text-3xl font-bold font-display text-dark-900 mb-2 tracking-tight">
                Send Us a Specification
              </h2>
              <p className="text-xs md:text-sm text-dark-500 mb-8 font-sans">
                Fill out the project details below and an engineer will get back to you within 24 hours.
              </p>

              {isSubmitted ? (
                <div className="border border-dark-200 bg-white p-8 sm:p-10 text-center shadow-sm">
                  <CheckCircle2 className="w-12 h-12 text-primary-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold font-display text-dark-900 mb-2">Message Dispatched!</h3>
                  <p className="text-sm text-dark-600 font-sans">
                    Thank you for reaching out. A systems engineer will review your inquiry and follow up promptly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {submitError ? (
                    <div className="border border-rose-300 bg-rose-50 px-4 py-3 text-xs font-mono text-rose-700">
                      {submitError}
                    </div>
                  ) : null}

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="block text-xs font-mono uppercase tracking-wider text-dark-700 mb-1.5 font-semibold">
                        First Name *
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        required
                        value={formData.firstName}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-dark-200 focus:border-primary-600 focus:ring-1 focus:ring-primary-600 outline-none transition-all text-xs font-sans bg-white"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-xs font-mono uppercase tracking-wider text-dark-700 mb-1.5 font-semibold">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        required
                        value={formData.lastName}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-dark-200 focus:border-primary-600 focus:ring-1 focus:ring-primary-600 outline-none transition-all text-xs font-sans bg-white"
                        placeholder="Doe"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="email" className="block text-xs font-mono uppercase tracking-wider text-dark-700 mb-1.5 font-semibold">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-dark-200 focus:border-primary-600 focus:ring-1 focus:ring-primary-600 outline-none transition-all text-xs font-sans bg-white"
                        placeholder="john@company.com"
                      />
                    </div>
                    <div>
                      <label htmlFor="company" className="block text-xs font-mono uppercase tracking-wider text-dark-700 mb-1.5 font-semibold">
                        Company Name
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-dark-200 focus:border-primary-600 focus:ring-1 focus:ring-primary-600 outline-none transition-all text-xs font-sans bg-white"
                        placeholder="Acme Enterprises"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-xs font-mono uppercase tracking-wider text-dark-700 mb-1.5 font-semibold">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-dark-200 focus:border-primary-600 focus:ring-1 focus:ring-primary-600 outline-none transition-all text-xs font-sans bg-white"
                      placeholder="+234..."
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-xs font-mono uppercase tracking-wider text-dark-700 mb-1.5 font-semibold">
                      System Requirement Area
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-dark-200 focus:border-primary-600 focus:ring-1 focus:ring-primary-600 outline-none transition-all text-xs font-sans bg-white"
                    >
                      <option value="general">General Architecture Inquiry</option>
                      <option value="sales">POS &amp; Retail Till Deployment</option>
                      <option value="support">Farm Health &amp; Agri-Commerce</option>
                      <option value="demo">Project &amp; Facility Operations</option>
                      <option value="partnership">Bank Document Automation</option>
                      <option value="press">Custom Web &amp; Desktop Engineering</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-xs font-mono uppercase tracking-wider text-dark-700 mb-1.5 font-semibold">
                      Operational Context / Requirements *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-dark-200 focus:border-primary-600 focus:ring-1 focus:ring-primary-600 outline-none transition-all text-xs font-sans resize-none bg-white"
                      placeholder="Describe your current setup, number of physical locations, offline requirements, and target timeline..."
                    />
                  </div>

                  <Button
                    variant="primary"
                    size="lg"
                    type="submit"
                    disabled={isSubmitting}
                    icon={<Send className="w-4 h-4" />}
                  >
                    {isSubmitting ? 'Dispatching...' : 'Submit Inquiry'}
                  </Button>
                </form>
              )}
            </motion.div>

            {/* Sidebar */}
            <motion.div
              className="lg:col-span-2 space-y-8"
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              {/* Quick Info */}
              <Card elevated padding="lg">
                <h3 className="text-lg font-bold text-dark-900 mb-4">Quick Contact</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-primary-500 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-dark-900">Email</p>
                      <a href="mailto:hello@bizsuits.com" className="text-sm text-primary-600 hover:underline">
                        hello@bizsuits.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-primary-500 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-dark-900">Phone</p>
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
                        {contactNumbers.map((phone, index) => (
                          <React.Fragment key={phone.href}>
                            <a href={phone.href} className="text-primary-600 hover:underline">
                              {phone.display}
                            </a>
                            {index < contactNumbers.length - 1 ? <span className="text-dark-400">/</span> : null}
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-primary-500 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-dark-900">Business Hours</p>
                      <p className="text-sm text-dark-500">Mon - Fri: 8AM - 8PM WAT</p>
                      <p className="text-sm text-dark-500">Sat - Sun: 10AM - 6PM WAT</p>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Offices */}
              <div>
                <h3 className="text-lg font-bold text-dark-900 mb-4">Our Offices</h3>
                <div className="space-y-4">
                  {offices.map((office) => (
                    <Card key={office.city} padding="md">
                      <div className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-primary-500 mt-0.5 shrink-0" />
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <p className="text-sm font-semibold text-dark-900">{office.city}</p>
                            <span className="text-[10px] font-mono uppercase tracking-wider bg-dark-50 text-dark-700 px-2 py-0.5 border border-dark-200">
                              {office.type}
                            </span>
                          </div>
                          <p className="text-sm text-dark-500 whitespace-pre-line">{office.address}</p>
                          <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
                            {office.phones.map((phone, index) => (
                              <React.Fragment key={phone.href}>
                                <a href={phone.href} className="text-primary-600 hover:underline inline-block">
                                  {phone.display}
                                </a>
                                {index < office.phones.length - 1 ? <span className="text-dark-400">/</span> : null}
                              </React.Fragment>
                            ))}
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
