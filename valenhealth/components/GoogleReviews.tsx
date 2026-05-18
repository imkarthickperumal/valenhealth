"use client";

import "./GoogleReviews.css";

type Review = {
  id: number;
  name: string;
  rating: number;
  text: string;
  date: string;
  initials: string;
};

const reviews: Review[] = [
  {
    id: 1,
    name: "Rohit S.",
    rating: 5,
    text: "The best gym in Spearwood! The equipment is brand new and the exercise physiologists are incredibly knowledgeable. Highly recommend!",
    date: "1 week ago",
    initials: "RS",
  },
  {
    id: 2,
    name: "Sarah M.",
    rating: 5,
    text: "Incredible facility and support! I've been coming here for my lower back rehab under Workers Comp and the progress has been amazing.",
    date: "2 weeks ago",
    initials: "SM",
  },
  {
    id: 3,
    name: "James K.",
    rating: 5,
    text: "A premium gym experience without the crowds. Friendly community, clean space, and top-tier equipment. Best decision I made.",
    date: "3 weeks ago",
    initials: "JK",
  },
  {
    id: 4,
    name: "Emma T.",
    rating: 5,
    text: "The staff are so friendly and the 24/7 access is perfect. Highly recommend Valen Health to anyone looking for a clean, professional gym!",
    date: "1 month ago",
    initials: "ET",
  },
  {
    id: 5,
    name: "David L.",
    rating: 5,
    text: "Exceptional EP support. They tailored a program that has completely resolved my chronic shoulder pain. Love the community vibe.",
    date: "1 month ago",
    initials: "DL",
  },
  {
    id: 6,
    name: "Clara H.",
    rating: 5,
    text: "Super clean gym, very friendly staff, and amazing atmosphere. The equipment selection is top tier. Best health network in Perth!",
    date: "2 months ago",
    initials: "CH",
  },
];

export default function GoogleReviews() {
  const gmbUrl = "https://www.google.com/search?q=valenhealth+spearwood&oq=valenhealth+spearwood";

  // Duplicate reviews to create a seamless infinite scroll loop
  const doubleReviews = [...reviews, ...reviews];

  return (
    <section className="reviews-section">
      <div className="reviews-container">
        {/* Header Block */}
        <div className="reviews-header">
          <div className="reviews-title-block">
            <div className="reviews-g-logo">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.08H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.92l2.85-2.22-.19-.6z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1.5 12 1.5 7.7 1.5 3.99 3.97 2.18 7.08l3.66 2.84c.87-2.6 3.3-4.54 6.16-4.54z" />
              </svg>
              <span>Google Reviews</span>
            </div>
            <h2 className="reviews-heading">Loved by the <span className="italic-orange">community.</span></h2>
            <p className="reviews-sub">
              5.0 ⭐ Excellent rated on Google based on real patient and member feedback.
            </p>
          </div>
          <div className="reviews-cta-block">
            <a href={gmbUrl} target="_blank" rel="noopener noreferrer" className="reviews-cta">
              More Reviews
            </a>
          </div>
        </div>

        {/* Autoscrolling Grid / List Wrapper */}
        <div className="reviews-scroll-wrapper">
          <div className="reviews-scroll-track">
            {doubleReviews.map((review, index) => (
              <div className="review-card" key={`${review.id}-${index}`}>
                <div className="review-card-header">
                  <div className="review-avatar">{review.initials}</div>
                  <div className="review-meta">
                    <h4>{review.name}</h4>
                    <span className="review-date">{review.date}</span>
                  </div>
                  <div className="review-google-badge">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path fill="#FBBC05" d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.08H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.92l2.85-2.22-.19-.6z" />
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1.5 12 1.5 7.7 1.5 3.99 3.97 2.18 7.08l3.66 2.84c.87-2.6 3.3-4.54 6.16-4.54z" />
                    </svg>
                  </div>
                </div>
                <div className="review-stars">
                  {"★".repeat(review.rating)}
                </div>
                <p className="review-text">&ldquo;{review.text}&rdquo;</p>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile-only CTA */}
        <div className="reviews-mobile-cta">
          <a href={gmbUrl} target="_blank" rel="noopener noreferrer" className="reviews-cta">
            More Reviews
          </a>
        </div>
      </div>
    </section>
  );
}
