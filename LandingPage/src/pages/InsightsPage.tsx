import { Link } from 'react-router-dom';
import { insightPosts, type InsightCategory } from '../content/insights';
import { useMemo, useState } from 'react';

const filters = ['All', 'Case Studies', 'Technical Guides', 'Industry Insights', 'Research & Learning'] as const;
type FilterType = (typeof filters)[number];

const BOOK_CALL_URL = 'https://cal.com/connectwithus/15min';
const CONTACT_FORM_URL = 'https://tally.so/r/687orN';

export default function InsightsPage() {
  const [activeFilter, setActiveFilter] = useState<FilterType>('All');

  const filteredPosts = useMemo(() => {
    if (activeFilter === 'All') return insightPosts;
    return insightPosts.filter((post) => post.category === (activeFilter as InsightCategory));
  }, [activeFilter]);

  const featuredPost = filteredPosts.find((post) => post.featured) ?? filteredPosts[0];
  const recentPosts =
    filteredPosts.length <= 1 ? filteredPosts : filteredPosts.filter((post) => post !== featuredPost).slice(0, 8);

  return (
    <section id="insights" className="bg-[#F5F1EB] py-16 md:py-24 scroll-mt-20 min-h-[60vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-5xl font-serif mb-3">Insights</h1>
        <p className="text-sm font-medium text-gray-700 mb-8">Case studies, technical playbooks, and research from real deployments.</p>

        <div className="flex flex-wrap items-center gap-2 mb-8">
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                activeFilter === filter
                  ? 'bg-black text-white border-black'
                  : 'bg-transparent text-gray-700 border-black/15 hover:bg-black/5'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {featuredPost && (
          <article className="bg-[#ece4d7] p-6 md:p-8 rounded-xl border border-black/10 mb-8">
            <p className="text-[11px] tracking-[0.1em] uppercase text-gray-600 mb-2">Featured Post</p>
            <h2 className="text-2xl md:text-3xl font-serif leading-tight mb-3">{featuredPost.title}</h2>
            <p className="text-sm font-medium text-gray-700 leading-relaxed mb-5">{featuredPost.excerpt}</p>
            <div className="flex items-center justify-between text-[11px] pt-3 border-t border-black/10 mb-4">
              <span className="text-gray-600">{featuredPost.category}</span>
              <span className="text-gray-700">{featuredPost.date} | {featuredPost.readTime}</span>
            </div>
            <Link to={`/insights/${featuredPost.slug}`} className="inline-flex text-sm font-medium hover:underline">
              Read featured post
            </Link>
          </article>
        )}

        <div>
          <h3 className="text-lg font-medium mb-4">Recent Posts</h3>
          {recentPosts.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {recentPosts.map((post) => (
                <article key={post.slug} className="bg-[#ece4d7] p-5 rounded-xl border border-black/10">
                  <h4 className="text-lg font-serif leading-tight mb-2">{post.title}</h4>
                  <p className="text-sm font-medium text-gray-700 leading-relaxed mb-4">{post.excerpt}</p>
                  <div className="flex items-center justify-between text-[11px] pt-2 border-t border-black/10 mb-3">
                    <span className="text-gray-600">{post.category}</span>
                    <span className="text-gray-700">{post.date}</span>
                  </div>
                  <Link to={`/insights/${post.slug}`} className="text-sm font-medium hover:underline">
                    Read post
                  </Link>
                </article>
              ))}
            </div>
          ) : (
            <p className="text-sm font-medium text-gray-700">No posts available in this category yet.</p>
          )}
        </div>

        <div className="mt-12 bg-black text-white rounded-xl p-6 md:p-8">
          <h3 className="text-2xl font-serif mb-2">Get new insights in your inbox</h3>
          <p className="text-sm font-medium text-gray-300 mb-5">Monthly notes on agentic systems, RAG architecture, and implementation lessons.</p>
          <form
            className="flex flex-col sm:flex-row gap-3"
            onSubmit={(e) => {
              e.preventDefault();
              window.open(CONTACT_FORM_URL, '_blank', 'noopener,noreferrer');
            }}
          >
            <input
              type="email"
              required
              placeholder="Work email"
              className="flex-1 px-4 py-2.5 rounded-md bg-white text-black placeholder:text-gray-500"
            />
            <button type="submit" className="px-5 py-2.5 rounded-md bg-[#C9A870] text-black font-medium hover:bg-[#d6bb8d] transition-colors">
              Subscribe
            </button>
          </form>
          <div className="mt-4 flex flex-wrap items-center gap-3 text-sm">
            <a href={BOOK_CALL_URL} target="_blank" rel="noreferrer" className="underline underline-offset-2">Book a call</a>
            <a href={CONTACT_FORM_URL} target="_blank" rel="noreferrer" className="underline underline-offset-2">Contact us</a>
          </div>
        </div>
      </div>
    </section>
  );
}
