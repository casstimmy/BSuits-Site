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
        <div className="absolute inset-0 overflow-hidden pointer-events-none grid-pattern opacity-50" />
        <div className="container-custom relative z-10 max-w-4xl">
          <span className="inline-flex items-center px-3 py-1 border border-dark-300 bg-white text-xs font-mono uppercase tracking-[0.18em] text-dark-800 mb-4 shadow-[2px_2px_0px_0px_rgba(15,23,42,0.06)]">
            STATUTORY POLICY
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-dark-900 mb-4 tracking-tight">Terms of Service</h1>
          <p className="text-base text-dark-600 max-w-3xl leading-relaxed">
            These terms govern use of the public BizSuits site and the information presented on it.
          </p>
        </div>
      </section>

      <section className="pb-20 md:pb-24 bg-white border-t border-dark-200">
        <div className="container-custom max-w-4xl pt-8">
          <p className="text-xs font-mono uppercase tracking-wider text-dark-400">Effective Date: May 31, 2026</p>
          <div className="mt-8 space-y-6">
            {termsSections.map((section) => (
              <div key={section.title} className="border border-dark-200 bg-white p-6 md:p-8 shadow-[4px_4px_0px_0px_rgba(15,23,42,0.04)]">
                <h2 className="text-xl font-bold text-dark-900 mb-3 tracking-tight">{section.title}</h2>
                <p className="text-sm text-dark-600 leading-relaxed">{section.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}