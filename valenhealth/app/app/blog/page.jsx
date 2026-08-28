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
    title: "5 New Friends to Help You Manage Diabetes",
    slug: '5-new-friends-to-help-you-manage-diabetes',
    excerpt: "A diabetes diagnosis can feel overwhelming, but the good news is that you don't have to manage it alone. Diabetes care works best when you have a team of health professionals supporting you, each bringing their own expertise to help you stay healthy, prevent complications, and feel your best.",
    authorName: "VALEN HEALTH",
    avatar: "VH",
    image: "/images/blog/diabetes_blog_image.png"
  },
  {
    title: "Exercise Physiology vs Physiotherapy: What's the Difference and Which One Do You Need?",
    slug: 'exercise-physiology-vs-physiotherapy',
    excerpt:
      "If you've ever been told to see an 'exercise physiologist' and wondered 'isn't that just a physio?' — you're not alone. Both help you feel better, but they do very different things.",
    authorName: "Valen Health",
    avatar: "VH",
    image: "/images/blog/ep_physio_blog_image.png"
  },
];

export default function BlogIndex() {
  return (
    <>
      <Header />
      <main className="blog-page">

        {/* HERO */}
        <section className="blog-hero" style={{ backgroundImage: "url('/images/blog/blog_index_banner_v2.png')", backgroundSize: 'cover', backgroundPosition: 'center 75%', position: 'relative' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.6)', zIndex: 1 }}></div>
          <div className="blog-hero-inner" style={{ position: 'relative', zIndex: 2 }}>
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
          <h1>Comeing Soon....</h1>
          {/* <div className="blog-grid">
            {posts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="blog-card">
                <div className="blog-card-image" style={{ backgroundImage: `url(${post.image})`, backgroundSize: 'cover', backgroundPosition: 'center', height: '200px' }}>
                </div>
                <div className="blog-card-body">
                  <h2 className="blog-card-title">{post.title}</h2>
                  <p className="blog-card-excerpt">{post.excerpt}</p>
                  <div className="blog-card-meta">
                    <div className="blog-card-meta-avatar">{post.avatar}</div>
                    <div className="blog-card-meta-info">
                      <span className="blog-card-meta-author">{post.authorName}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div> */}
        </section>

      </main>
      <Footer />
    </>
  );
}
