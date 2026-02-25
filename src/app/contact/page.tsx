'use client';

import React, { useState } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  Headphones,
  FileText,
  CheckCircle2,
} from 'lucide-react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import SectionHeading from '@/components/ui/SectionHeading';

const contactMethods = [
  {
    icon: MessageSquare,
    title: 'WhatsApp',
    description: 'Chat with our team in real-time for quick questions.',
    action: '09166843265',
    color: 'bg-blue-100 text-blue-600',
  },
  {
    icon: Mail,
    title: 'Email Us',
    description: 'Send us a detailed message and we\'ll respond within 24 hours.',
    action: 'hello@bizsuits.com',
    color: 'bg-purple-100 text-purple-600',
  },
  {
    icon: Phone,
    title: 'Call Us',
    description: 'Speak directly with our sales or support team.',
    action: '09166843265',
    color: 'bg-emerald-100 text-emerald-600',
  },
  {
    icon: Headphones,
    title: 'Support Center',
    description: 'Browse our knowledge base and help documentation.',
    action: 'Visit Help Center',
    color: 'bg-orange-100 text-orange-600',
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
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
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
          <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-semibold bg-primary-100 text-primary-700 mb-4">
            Get In Touch
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-dark-900 mb-6">
            We&apos;d love to <span className="gradient-text">hear from you</span>
          </h1>
          <p className="text-lg md:text-xl text-dark-500 max-w-2xl mx-auto">
            Whether you have a question about features, pricing, need a demo, or anything else —
            our team is ready to help.
          </p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-12 -mt-4">
        <div className="container-custom">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {contactMethods.map((method) => (
              <Card key={method.title} elevated className="text-center group cursor-pointer">
                <div
                  className={`w-14 h-14 rounded-2xl ${method.color} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}
                >
                  <method.icon className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-bold text-dark-900 mb-2">{method.title}</h3>
                <p className="text-sm text-dark-500 mb-3">{method.description}</p>
                <p className="text-sm font-semibold text-primary-600">{method.action}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form + Info */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
            {/* Form */}
            <div className="lg:col-span-3">
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
                    icon={<Send className="w-5 h-5" />}
                  >
                    Send Message
                  </Button>
                </form>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-2 space-y-8">
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
                      <a href="tel:09166843265" className="text-sm text-primary-600 hover:underline">
                        09166843265
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-primary-500 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-dark-900">Business Hours</p>
                      <p className="text-sm text-dark-500">Mon - Fri: 8AM - 8PM EST</p>
                      <p className="text-sm text-dark-500">Sat - Sun: 10AM - 6PM EST</p>
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
                          <p className="text-sm text-primary-600 mt-1">{office.phone}</p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
