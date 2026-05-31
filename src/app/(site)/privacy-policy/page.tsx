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
      <section className="pt-28 md:pt-36 pb-12 md:pb-16 gradient-bg-light relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary-200/30 blur-3xl" />
        </div>
        <div className="container-custom relative z-10 max-w-4xl">
          <span className="inline-flex items-center rounded-full bg-primary-100 px-4 py-1.5 text-sm font-semibold text-primary-700 mb-4">
            Legal
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-dark-900 mb-5">Privacy Policy</h1>
          <p className="text-lg text-dark-500 max-w-3xl">
            This page explains how BizSuits handles information shared through the public site and contact channels.
          </p>
        </div>
      </section>

      <section className="pb-20 md:pb-24 bg-white">
        <div className="container-custom max-w-4xl">
          <p className="text-sm text-dark-400">Last updated: May 31, 2026</p>
          <div className="mt-8 space-y-8">
            {privacySections.map((section) => (
              <div key={section.title} className="rounded-3xl border border-dark-100 bg-white p-6 md:p-8 shadow-sm">
                <h2 className="text-2xl font-bold text-dark-900 mb-3">{section.title}</h2>
                <p className="text-dark-500 leading-relaxed">{section.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}