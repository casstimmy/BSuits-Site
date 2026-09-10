import React from 'react';
import SectionHeading from '@/components/ui/SectionHeading';

const integrations = [
  'Stripe', 'PayPal', 'QuickBooks', 'Xero', 'Shopify',
  'WooCommerce', 'Square', 'Slack', 'Google Workspace', 'Microsoft 365',
  'Mailchimp', 'HubSpot', 'Zapier', 'Twilio', 'AWS',
];

export default function Integrations() {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <SectionHeading
          badge="Integrations"
          title="Works with your favorite tools"
          subtitle="BizSuits connects seamlessly with 100+ apps and services you already use. No data silos, no headaches."
        />

        <div className="grid grid-cols-3 md:grid-cols-5 gap-3 max-w-4xl mx-auto">
          {integrations.map((integration) => (
            <div
              key={integration}
              className="border border-dark-200 bg-white p-4 flex items-center justify-center hover:border-dark-400 hover:bg-dark-50 transition-all duration-150 group cursor-default shadow-sm"
            >
              <span className="text-xs font-mono uppercase tracking-wider text-dark-600 group-hover:text-dark-950 font-semibold transition-colors text-center">
                {integration}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
