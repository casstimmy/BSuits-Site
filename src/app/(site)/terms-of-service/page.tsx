import type { Metadata } from 'next';

const termsSections = [
  {
    title: 'Use of the Site',
    body:
      'The BizSuits site is provided to help visitors understand available solutions, request guidance, and review public examples. You may not misuse the site, interfere with availability, or attempt unauthorized access.',
  },
  {
    title: 'Informational Content',
    body:
      'Content on the site is provided for general business information. Any implementation scope, delivery commitment, or commercial engagement is agreed separately through direct discussion and written approval.',
  },
  {
    title: 'Intellectual Property',
    body:
      'Site copy, designs, demos, and supporting materials remain the property of BizSuits or their respective owners unless otherwise stated. They may not be copied or republished without permission.',
  },
  {
    title: 'Liability and Contact',
    body:
      'BizSuits aims to keep the site accurate and available, but it is provided on an as-is basis. If you have questions about these terms, contact the BizSuits team through the contact page.',
  },
];

export const metadata: Metadata = {
  title: 'Terms of Service | BizSuits',
  description: 'Review the terms that apply to the public BizSuits site and its informational content.',
};

export default function TermsOfServicePage() {
  return (
    <>
      <section className="pt-28 md:pt-36 pb-12 md:pb-16 gradient-bg-light relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-accent-200/30 blur-3xl" />
        </div>
        <div className="container-custom relative z-10 max-w-4xl">
          <span className="inline-flex items-center rounded-full bg-primary-100 px-4 py-1.5 text-sm font-semibold text-primary-700 mb-4">
            Legal
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-dark-900 mb-5">Terms of Service</h1>
          <p className="text-lg text-dark-500 max-w-3xl">
            These terms govern use of the public BizSuits site and the information presented on it.
          </p>
        </div>
      </section>

      <section className="pb-20 md:pb-24 bg-white">
        <div className="container-custom max-w-4xl">
          <p className="text-sm text-dark-400">Last updated: May 31, 2026</p>
          <div className="mt-8 space-y-8">
            {termsSections.map((section) => (
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