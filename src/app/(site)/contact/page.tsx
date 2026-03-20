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

const contactMethods = [
  {
    icon: MessageSquare,
    title: 'WhatsApp',
    description: 'Chat with our team in real-time for quick questions.',
    action: '09166843265',
    color: 'bg-green-100 text-green-600',
    href: 'https://wa.me/2349166843265?text=Hello%20BizSuits%2C%20I%20have%20a%20question.',
  },
  {
    icon: Mail,
    title: 'Email Us',
    description: 'Send us a detailed message and we\'ll respond within 24 hours.',
    action: 'hello@bizsuits.com',
    color: 'bg-purple-100 text-purple-600',
    href: 'mailto:hello@bizsuits.com',
  },
  {
    icon: Phone,
    title: 'Call Us',
    description: 'Speak directly with our sales or support team.',
    action: '09166843265',
    color: 'bg-emerald-100 text-emerald-600',
    href: 'tel:+2349166843265',
  },
  {
    icon: Headphones,
    title: 'Support Center',
    description: 'Browse our knowledge base and help documentation.',
    action: 'Visit Help Center',
    color: 'bg-orange-100 text-orange-600',
    href: '/blog',
  },
];

const offices = [
  {
    city: 'Lekki',
    country: 'Nigeria',
    address: 'Lekki Schem 2\nLagos, Nigeria',
    phone: '09166843265',
    type: 'Main Office',
  },
];

// Chatbot messages that cycle in the speech bubble
const botMessages = [
  "Let's help you today!",
  'Ask us anything!',
  'We reply fast!',
  'Need a demo?',
  'Say hello!',
];

// Animated chatbot face built from Icon.svg shapes
function AnimatedLogo() {
  const [msgIndex, setMsgIndex] = useState(0);
  const [showMsg, setShowMsg] = useState(true);
  const [blinking, setBlinking] = useState(false);
  const [mouthOpen, setMouthOpen] = useState(false);

  // Cycle speech bubble messages
  useEffect(() => {
    const interval = setInterval(() => {
      setShowMsg(false);
      setTimeout(() => {
        setMsgIndex((prev) => (prev + 1) % botMessages.length);
        setShowMsg(true);
      }, 400);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  // Blink eyes periodically
  useEffect(() => {
    const blink = () => {
      setBlinking(true);
      setTimeout(() => setBlinking(false), 200);
    };
    const interval = setInterval(blink, 3000);
    // Initial blink after 1s
    const firstBlink = setTimeout(blink, 1000);
    return () => {
      clearInterval(interval);
      clearTimeout(firstBlink);
    };
  }, []);

  // Animate mouth when message changes
  useEffect(() => {
    if (showMsg) {
      setMouthOpen(true);
      const t1 = setTimeout(() => setMouthOpen(false), 300);
      const t2 = setTimeout(() => setMouthOpen(true), 500);
      const t3 = setTimeout(() => setMouthOpen(false), 800);
      return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
    }
  }, [showMsg, msgIndex]);

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
          {showMsg && (
            <motion.div
              key={msgIndex}
              initial={{ opacity: 0, y: 8, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap bg-white rounded-full px-4 py-1.5 shadow-lg border border-primary-100 z-10"
            >
              <span className="text-xs font-semibold text-primary-700">{botMessages[msgIndex]}</span>
              {/* Bubble tail */}
              <div className="absolute left-1/2 -translate-x-1/2 -bottom-1.5 w-3 h-3 bg-white border-b border-r border-primary-100 rotate-45" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating body */}
        <motion.div
          className="relative w-28 h-28 md:w-32 md:h-32"
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          {/* Glow behind */}
          <motion.div
            className="absolute inset-0 rounded-3xl bg-primary-500/20 blur-xl"
            animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* The SVG face */}
          <svg
            viewBox="0 0 318.34 318.34"
            className="relative w-full h-full drop-shadow-lg"
          >
            <defs>
              <linearGradient id="face-gradient" x1="109.22" y1="58.65" x2="235.04" y2="311.86" gradientUnits="userSpaceOnUse">
                <stop offset="0" stopColor="#5398d2" />
                <stop offset="1" stopColor="#4c63ae" />
              </linearGradient>
            </defs>

            {/* Rounded square body */}
            <rect fill="url(#face-gradient)" width="318.34" height="318.34" rx="83.83" ry="83.83" />

            {/* Left eye */}
            <g style={{
              transformOrigin: '125px 140px',
              transform: blinking ? 'scaleY(0.08)' : 'scaleY(1)',
              transition: 'transform 0.15s ease-in-out',
            }}>
              <path fill="#fff" d="M147.28,130.83l-41.66-36.95c-5.73-5.08-14.74-.75-14.35,6.89l3.8,75.81c.38,7.53,9.55,10.99,14.81,5.59l37.86-38.85c3.44-3.53,3.23-9.22-.45-12.49l-41.66-36.95c-5.73-5.08-14.74-.75-14.35,6.89l3.8,75.81c.38,7.53,9.55,10.99,14.81,5.59l37.86-38.85c3.44-3.53,3.23-9.22-.45-12.49Z" />
            </g>

            {/* Right eye */}
            <g style={{
              transformOrigin: '193px 140px',
              transform: blinking ? 'scaleY(0.08)' : 'scaleY(1)',
              transition: 'transform 0.15s ease-in-out',
            }}>
              <path fill="#fff" d="M171.06,130.83l41.66-36.95c5.73-5.08,14.74-.75,14.35,6.89l-3.8,75.81c-.38,7.53-9.55,10.99-14.81,5.59l-37.86-38.85c-3.44-3.53-3.23-9.22.45-12.49l41.66-36.95c5.73-5.08,14.74-.75,14.35,6.89l-3.8,75.81c-.38,7.53-9.55,10.99-14.81,5.59l-37.86-38.85c-3.44-3.53-3.23-9.22.45-12.49Z" />
            </g>

            {/* Mouth */}
            <g style={{
              transformOrigin: '159px 210px',
              transform: mouthOpen ? 'scaleY(1.25) translateY(-3px)' : 'scaleY(1) translateY(0)',
              transition: 'transform 0.2s ease-in-out',
            }}>
              <path fill="#fff" d="M165.87,183.43l13.66,35.39c1.75,4.53-1.62,9.4-6.48,9.37l-27.85-.21c-4.86-.04-8.15-4.96-6.34-9.46l14.19-35.18c2.34-5.8,10.56-5.73,12.81.1l13.66,35.39c1.75,4.53-1.62,9.4-6.48,9.37l-27.85-.21c-4.86-.04-8.15-4.96-6.34-9.46l14.19-35.18c2.34-5.8,10.56-5.73,12.81.1Z" />
            </g>
          </svg>

          {/* Subtle orbiting dots */}
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="absolute w-1.5 h-1.5 rounded-full bg-primary-400/60"
              style={{ top: '50%', left: '50%' }}
              animate={{
                x: [
                  Math.cos((i * 2 * Math.PI) / 3) * 52,
                  Math.cos((i * 2 * Math.PI) / 3 + Math.PI) * 52,
                  Math.cos((i * 2 * Math.PI) / 3 + 2 * Math.PI) * 52,
                ],
                y: [
                  Math.sin((i * 2 * Math.PI) / 3) * 52,
                  Math.sin((i * 2 * Math.PI) / 3 + Math.PI) * 52,
                  Math.sin((i * 2 * Math.PI) / 3 + 2 * Math.PI) * 52,
                ],
                opacity: [0.3, 0.7, 0.3],
              }}
              transition={{ duration: 5, repeat: Infinity, ease: 'linear', delay: i * 0.4 }}
            />
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function ContactPage() {
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

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

    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/2349166843265?text=${encoded}`, '_blank');

    setIsSubmitting(false);
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <>
      {/* Hero */}
      <section className="pt-28 md:pt-36 pb-16 md:pb-20 gradient-bg-light relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-200/30 rounded-full blur-3xl" />
        </div>
        <div className="container-custom relative z-10 text-center">
          <AnimatedLogo />
          <motion.span
            className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-semibold bg-primary-100 text-primary-700 mb-4"
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
          >
            Get In Touch
          </motion.span>
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-dark-900 mb-6"
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.1 }}
          >
            We&apos;d love to <span className="text-primary-600">hear from you</span>
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-dark-500 max-w-2xl mx-auto"
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
          >
            Whether you have a question about features, pricing, need a demo, or anything else —
            our team is ready to help.
          </motion.p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-12 -mt-4">
        <div className="container-custom">
          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {contactMethods.map((method) => (
              <motion.a
                key={method.title}
                href={method.href}
                target={method.href.startsWith('http') ? '_blank' : undefined}
                rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                variants={staggerItem}
              >
                <Card elevated className="text-center group cursor-pointer h-full">
                  <div
                    className={`w-14 h-14 rounded-2xl ${method.color} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}
                  >
                    <method.icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-lg font-bold text-dark-900 mb-2">{method.title}</h3>
                  <p className="text-sm text-dark-500 mb-3">{method.description}</p>
                  <p className="text-sm font-semibold text-primary-600">{method.action}</p>
                </Card>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact Form + Info */}
      <section className="section-padding bg-white">
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
              <h2 className="text-2xl md:text-3xl font-bold text-dark-900 mb-2">
                Send us a message
              </h2>
              <p className="text-dark-500 mb-8">
                Fill out the form below and we&apos;ll get back to you within 24 hours.
              </p>

              {isSubmitted ? (
                <Card elevated padding="lg" className="text-center">
                  <CheckCircle2 className="w-16 h-16 text-accent-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-dark-900 mb-2">Message Sent!</h3>
                  <p className="text-dark-500">
                    Thank you for reaching out. We&apos;ll get back to you within 24 hours.
                  </p>
                </Card>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-dark-700 mb-1.5">
                        First Name *
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        required
                        value={formData.firstName}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-dark-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all text-sm"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-dark-700 mb-1.5">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        required
                        value={formData.lastName}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-dark-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all text-sm"
                        placeholder="Doe"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-dark-700 mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-dark-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all text-sm"
                        placeholder="john@company.com"
                      />
                    </div>
                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-dark-700 mb-1.5">
                        Company
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-dark-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all text-sm"
                        placeholder="Acme Inc."
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-dark-700 mb-1.5">
                      Phone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-dark-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all text-sm"
                      placeholder="+234..."
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-dark-700 mb-1.5">
                      Subject
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-dark-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all text-sm bg-white"
                    >
                      <option value="general">General Inquiry</option>
                      <option value="sales">Sales & Pricing</option>
                      <option value="support">Technical Support</option>
                      <option value="demo">Request a Demo</option>
                      <option value="partnership">Partnership</option>
                      <option value="press">Press & Media</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-dark-700 mb-1.5">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-dark-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all text-sm resize-none"
                      placeholder="Tell us how we can help..."
                    />
                  </div>

                  <Button
                    variant="primary"
                    size="lg"
                    type="submit"
                    disabled={isSubmitting}
                    icon={<Send className="w-5 h-5" />}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
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
                      <a href="tel:+2349166843265" className="text-sm text-primary-600 hover:underline">
                        09166843265
                      </a>
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
                            <span className="text-xs bg-dark-100 text-dark-500 px-2 py-0.5 rounded-full">
                              {office.type}
                            </span>
                          </div>
                          <p className="text-sm text-dark-500 whitespace-pre-line">{office.address}</p>
                          <a href={`tel:+234${office.phone.substring(1)}`} className="text-sm text-primary-600 hover:underline mt-1 inline-block">
                            {office.phone}
                          </a>
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
