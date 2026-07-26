export default function NewsSection() {
  const requirementAreas = [
    'Business goals and expected outcomes',
    'Current process maturity and team readiness',
    'Data access, quality, and compliance needs',
    'Integration scope and delivery timeline',
  ];
  const agreementItems = [
    'Master Services Agreement (MSA) with scope governance and change control.',
    'Statement of Work (SOW) per phase with delivery milestones and acceptance criteria.',
    'Data Processing and Security Addendum covering access controls, logging, and privacy obligations.',
    'Service Level Agreement (SLA) with uptime targets, incident response windows, and support channels.',
    'IP and licensing terms defining ownership of custom workflows, prompts, and integration code.',
    'Commercial terms including invoicing cadence, payment schedules, and termination clauses.',
  ];

  return (
    <section className="bg-[#F5F1EB] pt-10 pb-16 md:pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        <div id="requirements" className="scroll-mt-20 grid md:grid-cols-[0.9fr_2fr] gap-8 md:gap-12 items-start">
          <h3 className="text-[34px] md:text-[42px] font-serif leading-[0.95]">
            Requirements we handle and pricing approach
          </h3>

          <div className="space-y-1">
            {requirementAreas.map((item) => (
              <div key={item} className="flex justify-between items-center gap-4 py-3 border-b border-black/20">
                <h4 className="text-[13px] md:text-sm text-gray-900">{item}</h4>
                <span className="text-[11px] md:text-xs text-gray-600 whitespace-nowrap">Included</span>
              </div>
            ))}
            <div className="mt-4 space-y-2">
              <p className="text-sm font-medium text-gray-900">Pricing model</p>
              <p className="text-sm text-gray-700 leading-relaxed">
                We provide custom project and retainer pricing based on integration complexity, delivery timeline,
                compliance scope, and support requirements.
              </p>
              <p className="text-sm text-gray-700 leading-relaxed">
                Typical engagements start with a discovery sprint and move into pilot and production phases under a
                defined implementation roadmap.
              </p>
            </div>
          </div>
        </div>

        <div id="agreements" className="scroll-mt-20 grid md:grid-cols-[0.9fr_2fr] gap-8 md:gap-12 items-start">
          <h3 className="text-[34px] md:text-[42px] font-serif leading-[0.95]">
            Agreements and contracts between clients and vendors
          </h3>
          <div className="space-y-2">
            <p className="text-sm text-gray-800">
              We structure engagements using a standard enterprise contract stack:
            </p>
            <ul className="space-y-1">
              {agreementItems.map((item) => (
                <li key={item} className="text-sm text-gray-700 leading-relaxed">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
