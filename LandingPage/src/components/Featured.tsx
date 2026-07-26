export default function Featured() {
  const services = [
    'Agentic system design and orchestration',
    'RAG pipeline architecture and deployment',
    'Multi-agent workflow integration across tools',
    'Scenario-based automation for business operations',
  ];

  return (
    <section id="differentiators" className="bg-[#F5F1EB] py-10 md:py-14 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-black text-white p-6 md:p-10">
          <p className="text-xs tracking-[0.18em] uppercase text-[#d8ca80] font-semibold mb-4">About us</p>
          <h2 className="text-3xl md:text-5xl font-serif leading-[0.95] mb-6">How do we differ, and what do we offer?</h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-sm md:text-base text-gray-200 leading-relaxed">
                We are open to the world to make it better, not only for ourselves, but to grow together with clients, vendors, and communities.
              </p>
            </div>

            <div>
              <ul className="space-y-3">
                {services.map((service) => (
                  <li key={service} className="text-sm md:text-base border-b border-white/20 pb-3">
                    {service}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
