import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import './blog.css';

export const metadata = {
  title: 'Blog | Valen Health',
  description: 'Insights, advice and updates from Valen Health — Spearwood\'s exercise physiology clinic and 24/7 gym.',
};

const posts = [
  {
    title: "Exercise Physiology vs Physiotherapy: What's the Difference and Which One Do You Need?",
    slug: 'exercise-physiology-vs-physiotherapy',
    excerpt:
      "If you've ever been told to see an 'exercise physiologist' and wondered 'isn't that just a physio?' — you're not alone. Both help you feel better, but they do very different things.",
  },
];

export default function BlogIndex() {
  return (
    <>
      <Header />
      <main className="blog-page">

        {/* HERO */}
        <section className="blog-hero">
          <div className="blog-hero-inner">
            <div className="blog-hero-eyebrow">Valen Health — Blog</div>
            <h1 className="blog-hero-title">
              Blog
            </h1>
            <p className="blog-hero-sub">
              Insights, advice and updates to help you move better, feel better and live longer.
            </p>
          </div>
        </section>

        {/* POSTS */}
        <section className="blog-list-section">
          <div className="blog-grid">
            {posts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="blog-card">
                <div className="blog-card-image">
                </div>
                <div className="blog-card-body">
                  <h2 className="blog-card-title">{post.title}</h2>
                  <p className="blog-card-excerpt">{post.excerpt}</p>
                  <div className="blog-card-meta">
                    <div className="blog-card-meta-avatar">VH</div>
                    <div className="blog-card-meta-info">
                      <span className="blog-card-meta-author">Valen Health</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
