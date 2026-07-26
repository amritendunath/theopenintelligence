import { useEffect, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { insightPosts } from '../content/insights';

const BOOK_CALL_URL = 'https://cal.com/connectwithus/15min';
const CONTACT_FORM_URL = 'https://tally.so/r/687orN';

function toAnchorId(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function parseArchitecture(sectionText: string) {
  const lines = sectionText
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);

  const outcomes = lines.filter((line) => line.startsWith('High Confidence') || line.startsWith('Low Confidence'));
  const body = lines.filter((line) => line !== '↓' && !outcomes.includes(line));

  const steps: Array<{ title: string; detail?: string }> = [];
  for (let i = 0; i < body.length; i += 1) {
    const title = body[i];
    const next = body[i + 1];
    if (next && next.startsWith('(') && next.endsWith(')')) {
      steps.push({ title, detail: next.slice(1, -1) });
      i += 1;
    } else {
      steps.push({ title });
    }
  }

  return { steps, outcomes };
}

export default function InsightPostPage() {
  const { slug } = useParams();
  const post = insightPosts.find((item) => item.slug === slug);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      if (scrollable <= 0) {
        setProgress(0);
        return;
      }
      const ratio = Math.max(0, Math.min(1, window.scrollY / scrollable));
      setProgress(ratio * 100);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  if (!slug) {
    return <Navigate to="/insights" replace />;
  }

  if (!post) {
    return (
      <section className="bg-[#F5F1EB] py-16 min-h-[60vh]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-serif mb-3">Post not found</h1>
          <Link to="/insights" className="text-sm font-medium hover:underline">Back to insights</Link>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-[#F5F1EB] py-16 md:py-20 min-h-[60vh]">
      <div className="fixed top-0 left-0 right-0 h-1 z-50 bg-black/10">
        <div className="h-full bg-black transition-[width] duration-100" style={{ width: `${progress}%` }} />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[minmax(0,1fr)_280px] gap-10 items-start">
          <article>
            <Link to="/insights" className="text-sm text-gray-700 hover:underline">Back to insights</Link>

            <header className="mt-4 mb-8 pb-5 border-b border-black/10">
              <p className="text-[11px] uppercase tracking-[0.1em] text-gray-600 font-medium mb-2">{post.category}</p>
              <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-4">{post.title}</h1>
              <p className="text-sm text-gray-700 font-medium">{post.date} | {post.readTime}</p>
              <p className="text-xs text-gray-600 font-medium mt-2">
                {post.author ? `By ${post.author}` : null}
                {post.author && post.reviewedBy ? ' | ' : null}
                {post.reviewedBy ? `Reviewed by ${post.reviewedBy}` : null}
                {(post.author || post.reviewedBy) && post.updatedAt ? ' | ' : null}
                {post.updatedAt ? `Last updated ${post.updatedAt}` : null}
              </p>
            </header>

            <div className="space-y-10">
              {post.sections.map((section) => (
                <section key={section.heading} id={toAnchorId(section.heading)}>
                  <h2 className="text-2xl font-bold mb-4">{section.heading}</h2>
                  {section.heading.toLowerCase() === 'architecture (simplified)' ? (
                    (() => {
                      const { steps, outcomes } = parseArchitecture(section.paragraphs.join('\n'));
                      return (
                        <div className="border border-black/15 rounded-xl bg-[#151515] p-5 md:p-6">
                          <p className="text-[11px] uppercase tracking-[0.12em] text-gray-400 mb-4">Flow Diagram</p>
                          <div className="space-y-3">
                            {steps.map((step, index) => (
                              <div key={`${step.title}-${index}`} className="relative pl-8">
                                <span className="absolute left-0 top-0 h-5 w-5 rounded-full bg-white/10 text-[11px] text-white flex items-center justify-center">
                                  {index + 1}
                                </span>
                                <p className="text-white font-medium">{step.title}</p>
                                {step.detail ? <p className="text-sm text-gray-300">{step.detail}</p> : null}
                                {index < steps.length - 1 ? <div className="h-4 border-l border-white/20 ml-2 mt-2" /> : null}
                              </div>
                            ))}
                          </div>
                          {outcomes.length > 0 ? (
                            <div className="mt-5 grid gap-2">
                              {outcomes.map((outcome) => (
                                <div
                                  key={outcome}
                                  className={`rounded-md px-3 py-2 text-sm font-medium ${
                                    outcome.startsWith('High Confidence')
                                      ? 'bg-[#123524] text-[#b8f2cf]'
                                      : 'bg-[#3f2a0f] text-[#f7d7a3]'
                                  }`}
                                >
                                  {outcome}
                                </div>
                              ))}
                            </div>
                          ) : null}
                        </div>
                      );
                    })()
                  ) : (
                    <div>
                      {section.paragraphs.map((paragraph, index) => (
                        <p
                          key={`${section.heading}-${index}`}
                          className={`font-serif text-[17px] md:text-[18px] font-medium text-gray-900 leading-[1.45] ${
                            index === section.paragraphs.length - 1 ? '' : 'mb-5'
                          }`}
                        >
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  )}
                </section>
              ))}
            </div>

            <div className="mt-12 rounded-xl border border-black/15 bg-[#ece4d7] p-6 md:p-7 lg:hidden">
              <h3 className="text-2xl font-bold mb-2">Want help implementing this?</h3>
              <p className="text-sm font-medium text-gray-700 mb-5">Work with OpenIntelligence to design and deploy your agentic workflow stack.</p>
              <div className="flex flex-wrap gap-3">
                <a
                  href={BOOK_CALL_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center rounded-full bg-black text-white px-5 py-2.5 text-sm font-medium hover:bg-gray-800 transition-colors"
                >
                  Book a call
                </a>
                <a
                  href={CONTACT_FORM_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center rounded-full border border-black/20 px-5 py-2.5 text-sm font-medium text-gray-800 hover:bg-black/5 transition-colors"
                >
                  Contact us
                </a>
              </div>
            </div>
          </article>

          <aside className="hidden lg:block sticky top-24">
            <div className="rounded-xl border border-black/15 bg-[#ece4d7] p-5 mb-4">
              <p className="text-xs uppercase tracking-[0.12em] text-gray-600 font-medium mb-2">On this page</p>
              <ul className="space-y-2">
                {post.sections.map((section) => (
                  <li key={section.heading}>
                    <a href={`#${toAnchorId(section.heading)}`} className="text-sm font-medium text-gray-800 hover:underline">
                      {section.heading}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-black/15 bg-[#ece4d7] p-5">
              <p className="text-xs uppercase tracking-[0.12em] text-gray-600 font-medium mb-2">Need this for your team?</p>
              <h3 className="text-xl font-bold leading-tight mb-3">Get a custom implementation roadmap</h3>
              <p className="text-sm font-medium text-gray-700 mb-4">We assess your workflows and define a production-ready plan.</p>
              <div className="space-y-2">
                <a
                  href={BOOK_CALL_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="block text-center rounded-full bg-black text-white px-4 py-2.5 text-sm font-medium hover:bg-gray-800 transition-colors"
                >
                  Book a call
                </a>
                <a
                  href={CONTACT_FORM_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="block text-center rounded-full border border-black/20 px-4 py-2.5 text-sm font-medium text-gray-800 hover:bg-black/5 transition-colors"
                >
                  Contact us
                </a>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
