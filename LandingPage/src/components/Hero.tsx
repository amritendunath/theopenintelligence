import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';

const ROTATION_MS = import.meta.env.VITE_ROTATION 
const BOOK_CALL_URL = import.meta.env.VITE_BOOK_CALL_URL

const taglines = [
  {
    text: 'OpenIntelligence: AI agents that think together and execute at scale.',
    highlight: 'agents',
  },
  {
    text: 'AI agents that collaborate like teams to build smarter workflows.',
    highlight: 'workflows',
  },
  {
    text: 'Where AI agents work together to power better business.',
    highlight: 'business',
  },
  {
    text: 'Connected AI agents driving real-world workflows and outcomes.',
    highlight: 'outcomes',
  },
  {
    text: 'From isolated bots to collaborative agents — built for modern workflows.',
    highlight: 'collaborative',
  },
];

function HighlightedTagline({ text, highlight }: { text: string; highlight: string }) {
  const parts = text.split(new RegExp(`(${highlight})`, 'i'));

  return (
    <>
      {parts.map((part, index) => (
        <span
          key={`${part}-${index}`}
          className={part.toLowerCase() === highlight.toLowerCase() ? 'text-[#C9A870]' : undefined}
        >
          {part}
        </span>
      ))}
    </>
  );
}

export default function Hero() {
  const [activeTagline, setActiveTagline] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const goToPrev = () => {
    setActiveTagline((prev) => (prev - 1 + taglines.length) % taglines.length);
  };

  const goToNext = () => {
    setActiveTagline((prev) => (prev + 1) % taglines.length);
  };

  useEffect(() => {
    if (isPaused) return;

    const interval = window.setInterval(() => {
      goToNext();
    }, ROTATION_MS);

    return () => window.clearInterval(interval);
  }, [isPaused]);

  return (
    <section id="about" className="bg-[#F5F1EB] py-10 md:py-24 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-[1.2fr_1fr] gap-8 md:gap-12 items-start">
          <div onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
            <div className="relative min-h-[152px] sm:min-h-[188px] md:min-h-[248px]">
              {taglines.map((tagline, index) => (
                <h1
                  key={tagline.text}
                  className={`absolute inset-0 text-[42px] sm:text-[56px] md:text-[66px] font-semibold leading-[0.95] tracking-tight transition-all duration-500 ${
                    index === activeTagline
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-3 pointer-events-none'
                  }`}
                >
                  <HighlightedTagline text={tagline.text} highlight={tagline.highlight} />
                </h1>
              ))}
            </div>

            <div className="mt-5 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                {taglines.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setActiveTagline(index)}
                    aria-label={`Show tagline ${index + 1}`}
                    className={`h-1.5 rounded-full overflow-hidden transition-all duration-300 ${
                      index === activeTagline ? 'w-10 bg-black/20' : 'w-3 bg-black/25 hover:bg-black/35'
                    }`}
                  >
                    {index === activeTagline && (
                      <span
                        key={`${activeTagline}-${isPaused ? 'paused' : 'running'}`}
                        className="block h-full bg-black"
                        style={{
                          width: isPaused ? '100%' : '0%',
                          transition: isPaused ? 'none' : `width ${ROTATION_MS}ms linear`,
                        }}
                      />
                    )}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={goToPrev}
                  aria-label="Previous tagline"
                  className="h-8 w-8 rounded-full border border-black/20 inline-flex items-center justify-center hover:bg-black/5 transition-colors"
                >
                  <ChevronLeft size={16} />
                </button>
                <span
                  className="text-[11px] font-medium text-gray-700 min-w-10 text-center"
                  aria-live="polite"
                >
                  {activeTagline + 1}/{taglines.length}
                </span>
                <button
                  type="button"
                  onClick={goToNext}
                  aria-label="Next tagline"
                  className="h-8 w-8 rounded-full border border-black/20 inline-flex items-center justify-center hover:bg-black/5 transition-colors"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>

          <div className="mt-4 md:mt-3 max-w-md space-y-4">
            <p className="text-[15px] sm:text-xl leading-[1.4] font-serif text-[#201f1c]">
              We solve the challenge of connecting AI agents across systems, so they can be managed like real team members.
            </p>
            <p className="text-sm sm:text-base leading-relaxed text-gray-800">
              OpenIntelligence specializes in real-world agentic systems and pipelines such as RAG to deliver scalable outcomes across practical business scenarios.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href={BOOK_CALL_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center rounded-full bg-black text-white px-5 py-2.5 text-sm font-medium hover:bg-gray-800 transition-colors"
              >
                Book a call
              </a>
              <a
                href="#case-studies"
                className="inline-flex items-center rounded-full border border-black/20 px-5 py-2.5 text-sm font-medium text-gray-800 hover:bg-black/5 transition-colors"
              >
                View case studies
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
