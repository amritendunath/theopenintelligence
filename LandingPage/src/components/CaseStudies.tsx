const caseStudies = [
  {
    clientType: 'Logistics Operations Team',
    industry: 'Logistics and Supply Chain',
    companyType: 'Regional carrier, 350+ employees',
    timeline: '10-week implementation',
    challenge: 'Manual dispatch coordination across email, spreadsheets, and messaging tools caused delays and missed SLAs.',
    solution:
      'Built a multi-agent workflow that triaged inbound requests, enriched context from internal docs, and routed actions into the operations queue.',
    outcomes: ['43% faster dispatch turnaround', '31% reduction in SLA breaches', '18 hours/week saved for coordinators'],
    testimonial:
      'OpenIntelligence helped us move from reactive dispatching to a coordinated, AI-assisted operation in less than one quarter.',
    testimonialRole: 'Operations Director',
  },
  {
    clientType: 'Mid-Market Support Organization',
    industry: 'B2B SaaS',
    companyType: 'Series B company, 120+ employees',
    timeline: '8-week implementation',
    challenge: 'Support agents were spending too much time searching fragmented knowledge bases before responding to customers.',
    solution:
      'Deployed a RAG pipeline with role-based retrieval and escalation agents integrated into the support workspace.',
    outcomes: ['52% faster first-response time', '27% increase in resolution rate', '22% reduction in repeat tickets'],
    testimonial:
      'The agent workflow became a force multiplier for our support team and improved both speed and consistency for customers.',
    testimonialRole: 'Head of Customer Experience',
  },
];

function OutcomeLine({ text }: { text: string }) {
  const match = text.match(/^(\d+%|\d+\s*hours\/week)\s+(.*)$/i);

  if (!match) {
    return <span>{text}</span>;
  }

  return (
    <>
      <strong className="font-semibold text-gray-900">{match[1]}</strong> {match[2]}
    </>
  );
}

export default function CaseStudies() {
  return (
    <section id="case-studies" className="bg-[#F5F1EB] py-16 md:py-24 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 md:mb-10">
          <p className="text-xs tracking-[0.18em] uppercase text-gray-600 font-semibold mb-3">Portfolio</p>
          <h2 className="text-2xl md:text-4xl font-serif leading-[1.02]">Case studies with measurable outcomes</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-4 md:gap-6">
          {caseStudies.map((study) => (
            <article key={study.clientType} className="bg-[#ece4d7] p-6 md:p-7 rounded-xl border border-black/10">
              <p className="text-xs uppercase tracking-[0.12em] text-gray-600 mb-2">{study.clientType}</p>
              <p className="text-[11px] text-gray-700 mb-4">
                {study.industry} | {study.companyType} | {study.timeline}
              </p>

              <div className="space-y-5">
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-2">Challenge</h3>
                  <p className="text-sm text-gray-700 leading-relaxed">{study.challenge}</p>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-2">Solution</h3>
                  <p className="text-sm text-gray-700 leading-relaxed">{study.solution}</p>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-2">Outcomes</h3>
                  <ul className="space-y-1.5">
                    {study.outcomes.map((outcome) => (
                      <li key={outcome} className="text-sm text-gray-800 flex items-start gap-2">
                        <span className="mt-[0.45rem] h-1.5 w-1.5 rounded-full bg-black/70 shrink-0" />
                        <OutcomeLine text={outcome} />
                      </li>
                    ))}
                  </ul>
                </div>

                <blockquote className="border-l-2 border-black/20 pl-3 pt-1">
                  <p className="text-sm text-gray-800 leading-relaxed">"{study.testimonial}"</p>
                  <cite className="block text-xs text-gray-600 mt-2 not-italic">{study.testimonialRole}</cite>
                </blockquote>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
