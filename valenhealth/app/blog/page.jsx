import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import "./blog.css";

export const metadata = {
  title: "Blog | Valen Health",
  description:
    "Insights, advice and updates from Valen Health — Spearwood's exercise physiology clinic and 24/7 gym.",
};

const posts = [
  {
    title: "5 New Friends to Help You Manage Diabetes",
    slug: "5-new-friends-to-help-you-manage-diabetes",
    excerpt:
      "A diabetes diagnosis can feel overwhelming, but the good news is that you don't have to manage it alone. Diabetes care works best when you have a team of health professionals supporting you, each bringing their own expertise to help you stay healthy, prevent complications, and feel your best.",
    authorName: "Kayle van Schalkwyk",
    avatar: "KV",
    image: "/images/blog/diabetes_blog_image.png",
  },
  {
    title: "Exercising With Asthma",
    slug: "exercising-with-asthma",
    excerpt:
      "Having asthma doesn't mean you have to avoid exercise — it means understanding your body, knowing your triggers, and being prepared. One of our exercise physiologists shares her personal experience training with severe asthma.",
    authorName: "Kayle van Schalkwyk",
    avatar: "KV",
    image: "/images/GYM/GYM_A738792.jpg",
  },
  {
    title: "Back Pain: Australia's Most Expensive Health Problem",
    slug: "back-pain-australias-most-expensive-health-problem",
    excerpt:
      "Back pain is the number one cause of disability in Australia and globally — and much of the care people receive is not only ineffective, but may actively make things worse. Here's what the research actually shows about recovery, movement and better care.",
    authorName: "Aaron Dean",
    avatar: "AD",
    image: "/images/GYM/GYM_A738801.jpg",
  },
];

export default function BlogIndex() {
  return (
    <>
      <Header />
      <main className="blog-page">
        {/* HERO */}
        <section
          className="blog-hero"
          style={{
            backgroundImage: "url('/images/blog/blog_index_banner_v2.png')",
            backgroundSize: "cover",
            backgroundPosition: "center 75%",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0, 0, 0, 0.6)",
              zIndex: 1,
            }}
          ></div>
          <div
            className="blog-hero-inner"
            style={{ position: "relative", zIndex: 2 }}
          >
            <div className="blog-hero-eyebrow">Valen Health — Blog</div>
            <h1 className="blog-hero-title">Blog</h1>
            <p className="blog-hero-sub">
              Insights, advice and updates to help you move better, feel better
              and live longer.
            </p>
          </div>
        </section>

        {/* POSTS */}
        <section className="blog-list-section">
          <div className="blog-grid">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="blog-card"
              >
                <div
                  className="blog-card-image"
                  style={{
                    backgroundImage: `url(${post.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    height: "220px",
                  }}
                />
                <div className="blog-card-body">
                  <h2 className="blog-card-title">{post.title}</h2>
                  <p className="blog-card-excerpt">{post.excerpt}</p>
                  <div className="blog-card-meta">
                    <div className="blog-card-meta-avatar">{post.avatar}</div>
                    <div className="blog-card-meta-info">
                      <span className="blog-card-meta-author">
                        {post.authorName}
                      </span>
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
