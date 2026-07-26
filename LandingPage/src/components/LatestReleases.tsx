import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { insightPosts, type InsightCategory } from '../content/insights';

const filters = ['All', 'Case Studies', 'Technical Guides', 'Industry Insights', 'Research & Learning'] as const;
type FilterType = (typeof filters)[number];

export default function LatestReleases() {
  const [activeFilter, setActiveFilter] = useState<FilterType>('All');

  const filteredPosts = useMemo(() => {
    if (activeFilter === 'All') return insightPosts;
    return insightPosts.filter((post) => post.category === activeFilter);
  }, [activeFilter]);

  const featuredPost = useMemo(
    () => filteredPosts.find((post) => post.featured) ?? filteredPosts[0],
    [filteredPosts]
  );

  const recentPosts = useMemo(() => {
    if (filteredPosts.length <= 1) return filteredPosts;
    const withoutFeatured = filteredPosts.filter((post) => post !== featuredPost);
    return withoutFeatured.slice(0, 8);
  }, [filteredPosts, featuredPost]);

  return (
    <section id="insights" className="bg-[#F5F1EB] py-16 md:py-24 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl md:text-4xl font-serif mb-3">Insights</h2>
        <p className="text-sm text-gray-700 mb-8">Case studies, technical playbooks, and research from real deployments.</p>

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
            <h3 className="text-2xl md:text-3xl font-serif leading-tight mb-3">{featuredPost.title}</h3>
            <p className="text-sm text-gray-700 leading-relaxed mb-5">{featuredPost.excerpt}</p>
            <div className="flex items-center justify-between text-[11px] pt-3 border-t border-black/10">
              <span className="text-gray-600">{featuredPost.category}</span>
              <span className="text-gray-700">{featuredPost.date}</span>
            </div>
            <Link to={`/insights/${featuredPost.slug}`} className="inline-flex text-sm font-medium hover:underline mt-4">
              Read featured post
            </Link>
          </article>
        )}

        <div>
          <h4 className="text-lg font-medium mb-4">Recent Posts</h4>
          {recentPosts.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {recentPosts.map((post) => (
                <article key={post.slug} className="bg-[#ece4d7] p-5 rounded-xl border border-black/10">
                  <h5 className="text-lg font-serif leading-tight mb-2">{post.title}</h5>
                  <p className="text-sm text-gray-700 leading-relaxed mb-4">{post.excerpt}</p>
                  <div className="flex items-center justify-between text-[11px] pt-2 border-t border-black/10">
                    <span className="text-gray-600">{post.category}</span>
                    <span className="text-gray-700">{post.date}</span>
                  </div>
                  <Link to={`/insights/${post.slug}`} className="inline-flex text-sm font-medium hover:underline mt-3">
                    Read post
                  </Link>
                </article>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-700">No posts available in this category yet.</p>
          )}
        </div>
        <div className="mt-8">
          <Link to="/insights" className="inline-flex text-sm font-medium hover:underline">
            View all insights
          </Link>
        </div>
      </div>
    </section>
  );
}
