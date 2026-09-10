import type { Metadata } from 'next';

const privacySections = [
  {
    title: 'Information We Collect',
    body:
      'BizSuits may collect the contact details you share with us, business context you provide during enquiries, and limited technical data needed to keep the site stable and secure.',
  },
  {
    title: 'How We Use Information',
    body:
      'We use submitted information to respond to enquiries, schedule demos, improve the site, and support ongoing business conversations related to BizSuits services.',
  },
  {
    title: 'Sharing and Retention',
    body:
      'We do not sell your information. Data is retained only for as long as it is needed to respond to requests, maintain records of active conversations, and meet operational or legal obligations.',
  },
  {
    title: 'Your Choices',
    body:
      'You can contact BizSuits to request an update or removal of enquiry information that you have shared through the site, subject to any legal or operational record-keeping requirements.',
  },
];

export const metadata: Metadata = {
  title: 'Privacy Policy | BizSuits',
  description: 'Review how BizSuits handles personal and business information shared through the site.',
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <section className="pt-28 md:pt-36 pb-12 md:pb-16 bg-[#f8fafc] border-b border-dark-200 relative">
        <div className="container-custom relative z-10 max-w-4xl">
          <span className="inline-flex items-center px-3.5 py-1 border border-primary-200 bg-primary-50/60 text-xs font-semibold uppercase tracking-wider text-primary-700 mb-4">
            Statutory Policy
          </span>
          <h1 className="text-4xl md:text-5xl font-bold font-display text-dark-900 mb-4 tracking-tight">Privacy Policy</h1>
          <p className="text-base text-dark-600 max-w-3xl leading-relaxed font-sans">
            This page explains how BizSuits handles information shared through the public site and contact channels.
          </p>
        </div>
      </section>

      <section className="pb-20 md:pb-24 bg-white border-t border-dark-200">
        <div className="container-custom max-w-4xl pt-8">
          <p className="text-xs font-mono uppercase tracking-wider text-dark-400">Effective Date: May 31, 2026</p>
          <div className="mt-8 space-y-6">
            {privacySections.map((section) => (
              <div key={section.title} className="border border-dark-200 bg-white p-6 md:p-8 shadow-sm">
                <h2 className="text-xl font-bold font-display text-dark-900 mb-3 tracking-tight">{section.title}</h2>
                <p className="text-sm text-dark-600 leading-relaxed font-sans">{section.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}