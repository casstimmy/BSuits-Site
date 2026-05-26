'use client';

import React from 'react';
import { CheckCheck } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import { motion, staggerContainer, staggerItem } from '@/components/ui/Motion';

const testimonials = [
  {
    name: 'Adebayo K.',
    role: 'Restaurant Owner, Lagos',
    messages: [
      { text: 'BizSuits changed how we run the restaurant.', time: '9:14 AM' },
      { text: 'Checkout is faster, stock is more reliable, and we save hours every week.', time: '9:15 AM' },
    ],
    avatar: 'AK',
    bgColor: 'bg-emerald-50',
  },
  {
    name: 'Chioma N.',
    role: 'Supermarket Manager, Abuja',
    messages: [
      { text: 'We tried several options before BizSuits. This is the first one that really fits how our supermarket operates.', time: '11:32 AM' },
      { text: 'Inventory, sales, and supplier management now sit in one place, which makes daily decisions much easier.', time: '11:33 AM' },
    ],
    avatar: 'CN',
    bgColor: 'bg-blue-50',
  },
  {
    name: 'Emeka O.',
    role: 'Store Chain Owner, Port Harcourt',
    messages: [
      { text: 'Managing three store locations used to be difficult.', time: '2:45 PM' },
      { text: 'Now I see all my inventory, sales, and staff from one dashboard. The setup even included staff training.', time: '2:46 PM' },
    ],
    avatar: 'EO',
    bgColor: 'bg-purple-50',
  },
  {
    name: 'Fatima A.',
    role: 'Boutique Owner, Kano',
    messages: [
      { text: 'The online and in-store experience finally work together.', time: '4:10 PM' },
      { text: "My online store and physical shop now share the same stock, so we avoid selling items we don't have.", time: '4:11 PM' },
    ],
    avatar: 'FA',
    bgColor: 'bg-orange-50',
  },
  {
    name: 'Tunde M.',
    role: 'Hotel Manager, Lekki',
    messages: [
      { text: 'What stands out is how responsive the support team is.', time: '10:20 AM' },
      { text: 'Issues get resolved quickly, and the business keeps moving. It has been a strong investment for the hotel.', time: '10:21 AM' },
    ],
    avatar: 'TM',
    bgColor: 'bg-rose-50',
  },
];

export default function Testimonials() {
  return (
    <section className="section-padding bg-dark-50/50">
      <div className="container-custom">
        <SectionHeading
          badge="Customer Stories"
          title="What business owners say after launch"
          subtitle="Real feedback from teams using BizSuits in day-to-day operations."
        />

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {testimonials.map((testimonial) => (
            <motion.div key={testimonial.name} variants={staggerItem}>
            <div
              key={testimonial.name}
              className={`${testimonial.bgColor} rounded-2xl p-5 shadow-sm hover:shadow-lg transition-all duration-300 border border-dark-100/50 hover:-translate-y-1`}
            >
              {/* Chat Header */}
              <div className="flex items-center gap-3 mb-4 pb-3 border-b border-dark-200/30">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
                  <span className="text-white text-sm font-bold">{testimonial.avatar}</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-dark-900">{testimonial.name}</p>
                  <p className="text-xs text-dark-400">{testimonial.role}</p>
                </div>
              </div>

              {/* Chat Bubbles */}
              <div className="space-y-2">
                {testimonial.messages.map((msg, i) => (
                  <div key={i} className="bg-white rounded-2xl rounded-tl-md px-4 py-2.5 shadow-sm max-w-[95%]">
                    <p className="text-sm text-dark-700 leading-relaxed">{msg.text}</p>
                    <div className="flex items-center justify-end gap-1 mt-1">
                      <span className="text-[10px] text-dark-300">{msg.time}</span>
                      <CheckCheck className="w-3.5 h-3.5 text-blue-500" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
