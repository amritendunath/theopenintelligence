import { Copyright } from 'lucide-react';
import logoDark from '../assets/logo_1.svg';

function LinkedinBrandIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-8 w-8 fill-current">
      <path d="M6.94 8.5a1.72 1.72 0 1 1 0-3.44 1.72 1.72 0 0 1 0 3.44ZM5.4 9.9h3.08V19H5.4V9.9Zm5.16 0h2.95v1.24h.04c.41-.78 1.42-1.6 2.93-1.6 3.14 0 3.72 2.07 3.72 4.77V19h-3.08v-4.17c0-1-.02-2.27-1.38-2.27-1.39 0-1.6 1.08-1.6 2.2V19h-3.08V9.9Z" />
    </svg>
  );
}

function XBrandIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6 fill-current">
      <path d="M18.9 3h2.87l-6.27 7.17L23 21h-5.88l-4.6-6-5.24 6H4.4l6.7-7.66L1 3h6.03l4.16 5.48L18.9 3Zm-1.03 16.24h1.59L6.16 4.67H4.45l13.42 14.57Z" />
    </svg>
  );
}

export default function Footer() {
  const services = [
    'Multi-Agent System Design',
    'RAG Pipeline Development',
    'AI Workflow Automation',
    'LLM Evaluation & Guardrails',
    'AI Integration (CRM, Helpdesk, ERP)',
    'AI Ops & Monitoring',
    'Agent Fine-Tuning & Prompt Engineering',
    'Enterprise AI Enablement',
  ];

  const solutions = [
    'Customer Support Automation',
    'Sales Intelligence & Outreach',
    'Operations Orchestration',
    'Knowledge Management Assistants',
    'Internal Copilot for Teams',
    'Incident Triage & Escalation',
    'Document Processing & QA',
    'Executive Reporting Automation',
  ];

  const industrySolutions = [
    'SaaS',
    'Logistics',
    'E-commerce',
    'Healthcare Ops',
    'Financial Services',
    'Professional Services',
  ];

  const helpAndSecurity = [
    'Help Center',
    'Security Overview',
    'Privacy & Data Handling',
    'DPA Request',
    'Incident Response',
    'Contact Support',
  ];
  const products = [
    {
      category: 'Agents',
      name: 'Combina',
      url: 'https://combina.theopenintelligence.com',
      status: 'Live',
    },
    {
      category: 'Connectors',
      name: 'Coming Soon',
      status: 'Coming Soon',
    },
    {
      category: 'Models',
      name: 'Coming Soon',
      status: 'Coming Soon',
    },
    {
      category: 'Tools',
      name: 'Coming Soon',
      status: 'Coming Soon',
    },
  ];

  

  const termsAndPolicies = [
    'Terms of Service',
    'Privacy Policy',
    'Cookie Policy',
    'Acceptable Use Policy',
    'Data Retention Policy',
    'Refund & Billing Policy',
  ];

  return (
    <footer className="bg-black text-white pt-14 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          <div>
            <h3 className="text-xl font-semibold mb-4 inline-flex items-center gap-2">
              <img src={logoDark} alt="OpenIntelligence emblem" className="h-5 w-5 rounded-sm object-contain" />
              TheOpenIntell<span className="backwardI -ml-1.5 -mr-1.5">I</span>gence
            </h3>
            {/* <p className="text-sm text-gray-300 leading-relaxed">
              We build connected AI agent ecosystems that work like coordinated human teams for business growth.
            </p> */}
          </div>

          <div className="space-y-12">
            <div>
              <h4 className="text-sm uppercase tracking-[0.1em] text-gray-100 font-semibold mb-3">Services</h4>
              <ul className="space-y-3">
                {services.map((item) => (
                  <li key={item} className="text-sm text-gray-400">{item}</li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm uppercase tracking-[0.1em] text-gray-100 font-semibold mb-3">Help and Security</h4>
              <ul className="space-y-3">
                {helpAndSecurity.map((item) => (
                  <li key={item} className="text-sm text-gray-400">{item}</li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm uppercase tracking-[0.1em] text-gray-100 font-semibold mb-3">Products</h4>
              <ul className="space-y-3">
                {products.map((item) => (
                  <li key={item.category} className="flex items-center gap-2 text-sm text-gray-400">
                    <span className="text-gray-300">{item.category}:</span>
                    {item.url ? (
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-gray-100 hover:text-white hover:underline"
                      >
                        {item.name}
                      </a>
                    ) : (
                      <span>{item.name}</span>
                    )}
                    <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-gray-200">
                      {item.status}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="space-y-12">
            <div>
              <h4 className="text-sm uppercase tracking-[0.1em] text-gray-100 font-semibold mb-3">Solutions</h4>
              <ul className="space-y-3">
                {solutions.map((item) => (
                  <li key={item} className="text-sm text-gray-400">{item}</li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm uppercase tracking-[0.1em] text-gray-100 font-semibold mb-3">Terms and Policies</h4>
              <ul className="space-y-3">
                {termsAndPolicies.map((item) => (
                  <li key={item} className="text-sm text-gray-400">{item}</li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm uppercase tracking-[0.1em] text-gray-100 font-semibold mb-3">Industry Solutions</h4>
              <ul className="space-y-3">
                {industrySolutions.map((item) => (
                  <li key={item} className="text-sm text-gray-400">{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
          <span className="text-sm font-semibold text-gray-400 inline-flex items-center gap-1.5 whitespace-nowrap">
            <span>TheOpenIntelligence</span>
            <Copyright size={12} className="shrink-0 -mr-1 -ml-1" />
            <span>2026</span>
          </span>
          <div className="flex items-center gap-3">
            <a href="#" aria-label="LinkedIn profile" className="text-gray-100 hover:text-white transition-colors">
              <LinkedinBrandIcon />
            </a>
            <a href="#" aria-label="X profile" className="text-gray-100 hover:text-white transition-colors">
              <XBrandIcon />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
