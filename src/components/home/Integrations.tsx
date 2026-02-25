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

        <div className="grid grid-cols-3 md:grid-cols-5 gap-4 lg:gap-6 max-w-4xl mx-auto">
          {integrations.map((integration) => (
            <div
              key={integration}
              className="bg-dark-50 rounded-xl p-4 md:p-6 flex items-center justify-center hover:bg-primary-50 hover:border-primary-200 border border-transparent transition-all duration-300 group cursor-pointer"
            >
              <span className="text-sm md:text-base font-semibold text-dark-400 group-hover:text-primary-600 transition-colors text-center">
                {integration}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
