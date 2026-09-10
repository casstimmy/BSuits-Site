import type { Metadata } from 'next';

const cookieSections = [
  {
    title: 'What Cookies Do',
    body:
      'Cookies and similar browser storage can help BizSuits remember preferences, understand site traffic at a high level, and keep the browsing experience stable.',
  },
  {
    title: 'How BizSuits Uses Them',
    body:
      'Where cookies are used, they support core site behavior, performance measurement, and improvement of public pages. They are not used to sell personal browsing data.',
  },
  {
    title: 'Managing Preferences',
    body:
      'You can manage or clear cookies through your browser settings. Disabling some browser storage may change how parts of the site behave.',
  },
  {
    title: 'Updates',
    body:
      'This policy may be updated as the site changes. Material updates will be reflected by revising the date on this page.',
  },
];

export const metadata: Metadata = {
  title: 'Cookie Policy | BizSuits',
  description: 'Review how BizSuits uses cookies and similar browser storage on the public site.',
};

export default function CookiePolicyPage() {
  return (
    <>
      <section className="pt-28 md:pt-36 pb-12 md:pb-16 bg-[#f8fafc] border-b border-dark-200 relative">
        <div className="container-custom relative z-10 max-w-4xl">
          <span className="inline-flex items-center px-3.5 py-1 border border-primary-200 bg-primary-50/60 text-xs font-semibold uppercase tracking-wider text-primary-700 mb-4">
            Statutory Policy
          </span>
          <h1 className="text-4xl md:text-5xl font-bold font-display text-dark-900 mb-4 tracking-tight">Cookie Policy</h1>
          <p className="text-base text-dark-600 max-w-3xl leading-relaxed font-sans">
            This page explains how BizSuits uses cookies and similar browser storage on the public site.
          </p>
        </div>
      </section>

      <section className="pb-20 md:pb-24 bg-white border-t border-dark-200">
        <div className="container-custom max-w-4xl pt-8">
          <p className="text-xs font-mono uppercase tracking-wider text-dark-400">Effective Date: May 31, 2026</p>
          <div className="mt-8 space-y-6">
            {cookieSections.map((section) => (
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