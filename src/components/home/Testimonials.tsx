import React from 'react';
import { CheckCheck } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';

const testimonials = [
  {
    name: 'Adebayo K.',
    role: 'Restaurant Owner, Lagos',
    messages: [
      { text: 'Bros, BizSuits changed my restaurant game completely 🔥', time: '9:14 AM' },
      { text: 'The POS is so fast my cashier no dey make mistakes again. Inventory tracks itself. I save like 15 hours every week!', time: '9:15 AM' },
    ],
    avatar: 'AK',
    bgColor: 'bg-emerald-50',
  },
  {
    name: 'Chioma N.',
    role: 'Supermarket Manager, Abuja',
    messages: [
      { text: 'I tried 3 different software before BizSuits. None of them understood how Nigerian businesses actually work', time: '11:32 AM' },
      { text: 'This one was built specifically for my store. Inventory, sales tracking, supplier management — everything in one place 👌', time: '11:33 AM' },
    ],
    avatar: 'CN',
    bgColor: 'bg-blue-50',
  },
  {
    name: 'Emeka O.',
    role: 'Store Chain Owner, Port Harcourt',
    messages: [
      { text: 'Managing 3 store locations used to be chaos 😅', time: '2:45 PM' },
      { text: 'Now I see all my inventory, sales, and staff from one dashboard. BizSuits team even trained my staff.', time: '2:46 PM' },
    ],
    avatar: 'EO',
    bgColor: 'bg-purple-50',
  },
  {
    name: 'Fatima A.',
    role: 'Boutique Owner, Kano',
    messages: [
      { text: 'The e-commerce integration is 🔥🔥🔥', time: '4:10 PM' },
      { text: "My online store and physical shop share the same inventory now. No more selling items I don't have in stock", time: '4:11 PM' },
    ],
    avatar: 'FA',
    bgColor: 'bg-orange-50',
  },
  {
    name: 'Tunde M.',
    role: 'Hotel Manager, Lekki',
    messages: [
      { text: 'What I love is that the support team actually picks up the phone 😂', time: '10:20 AM' },
      { text: 'Any issue I have, they resolve it same day. Best investment we made for the hotel business.', time: '10:21 AM' },
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
          title="What our clients are saying"
          subtitle="Real feedback from business owners who use BizSuits every day."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial) => (
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
          ))}
        </div>
      </div>
    </section>
  );
}
