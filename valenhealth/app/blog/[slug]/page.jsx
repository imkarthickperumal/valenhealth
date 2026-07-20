import Link from 'next/link';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import '../blog.css';

export function generateStaticParams() {
  return [{ slug: 'exercise-physiology-vs-physiotherapy' }];
}

export const metadata = {
  title: 'Exercise Physiology vs Physiotherapy | Valen Health',
  description:
    "What's the difference between an exercise physiologist and a physio — and which one do you need? Here's the clear breakdown.",
};

export default async function BlogPost({ params }) {
  const { slug } = await params;
  if (slug !== 'exercise-physiology-vs-physiotherapy') {
    return (
      <>
        <Header />
        <main className="blog-post-page" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '32px', textTransform: 'uppercase' }}>Post not found</h1>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="blog-post-page">

        {/* BACK LINK */}
        <div className="blog-back-bar">
          <Link href="/blog" className="blog-back-link">
            ← Back to Blog
          </Link>
        </div>

        {/* POST HERO */}
        <section className="blog-post-hero">
          <div className="blog-post-hero-inner">
            <div className="blog-post-meta-row">
             
            </div>
            <h1 className="blog-post-title">
              Exercise Physiology vs Physiotherapy:
              <span className="accent">What's the Difference and Which One Do You Need?</span>
            </h1>
            <div className="blog-post-author-row">
              <div className="blog-post-author-avatar">VH</div>
              <div>
                <div className="blog-post-author-name">Valen Health</div>
                <div className="blog-post-author-role">Clinical Team</div>
              </div>
            </div>
          </div>
        </section>

        {/* POST BODY */}
        <div className="blog-post-body-wrap">
          <div className="blog-post-body">

            <p>
              If you've ever been told to see an "exercise physiologist" and wondered "isn't that just a physio?" — you're not alone. It's one of the most common questions we get. Both professions work with movement, both help you feel better, and both can be found in the same clinic. But they do very different things.
            </p>
            <p>Here's the breakdown.</p>

            {/* TL;DR */}
            <div className="blog-tldr">
              <div className="blog-tldr-header">
                <h2 className="blog-tldr-header-title">⚡ TL;DR Answer</h2>
              </div>
              <div className="blog-tldr-body">
                <p className="blog-tldr-intro">Here's the simplest way to think about it:</p>
                <ul className="blog-tldr-list">
                  <li className="blog-tldr-item">
                    <span className="blog-tldr-num">1</span>
                    <span className="blog-tldr-item-text">
                      <strong>Physio</strong> = acute injury (0–6 weeks), diagnosis, hands-on treatment.
                    </span>
                  </li>
                  <li className="blog-tldr-item">
                    <span className="blog-tldr-num">2</span>
                    <span className="blog-tldr-item-text">
                      <strong>Exercise Physiology</strong> = chronic disease, long-term prevention, exercise as medicine.
                    </span>
                  </li>
                  <li className="blog-tldr-item">
                    <span className="blog-tldr-num">3</span>
                    <span className="blog-tldr-item-text">
                      <strong>Both</strong> = complementary & better together.
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {/* SECTION 1 */}
            <h2>What Does an Exercise Physiologist Do?</h2>
            <p>
              An Accredited Exercise Physiologist (AEP) is a university-qualified allied health professional who uses <strong>exercise as medicine</strong>. Not gym exercise. Clinical exercise — carefully designed, evidence-based movement programs that prevent, manage and treat chronic disease, injury and disability.
            </p>

            <div className="blog-highlight">
              <p>
                Physical inactivity is now one of the leading contributors to chronic disease in Australia — linked to pain, cardiovascular disease, type 2 diabetes, depression and cancer. AEPs exist specifically to address this. They don't just rehabilitate — they prescribe exercise as a standalone therapeutic intervention to prevent and manage these conditions long-term.
              </p>
            </div>

            <p>
              AEPs complete a minimum four-year degree and are accredited through Exercise and Sports Science Australia (ESSA).
            </p>
            <p>
              They're recognised under Medicare, NDIS, WorkCover and most private health funds.
            </p>

            <div className="blog-callout">
              <p>
                Where physio tends to focus on symptoms, exercise physiology focuses on causes — and helps empower you to manage your condition.
              </p>
            </div>

            {/* EXPERTISE GRID */}
            <h2>Where Exercise Physiologists Have Unique Expertise</h2>

            <div className="blog-expertise-grid">

              <div className="blog-expertise-card">
                <h3 className="blog-expertise-card-title">❤️ Metabolic &amp; Cardiovascular</h3>
                <ul className="blog-expertise-list">
                  <li><strong>Type 2 diabetes &amp; pre-diabetes</strong> — AEPs are the primary allied health profession for exercise-based glucose management</li>
                  <li><strong>Obesity &amp; weight management</strong> — structured clinical exercise programs</li>
                  <li><strong>Heart failure &amp; cardiovascular disease</strong> — cardiac rehabilitation is a core AEP domain</li>
                  <li><strong>Chronic kidney disease</strong> — exercise prescription with renal considerations</li>
                  <li><strong>COPD &amp; respiratory disease</strong> — pulmonary rehab led by AEPs</li>
                </ul>
              </div>

              <div className="blog-expertise-card">
                <h3 className="blog-expertise-card-title">🧠 Neurological</h3>
                <ul className="blog-expertise-list">
                  <li><strong>Parkinson's disease</strong> — progressive exercise to manage motor symptoms</li>
                  <li><strong>Multiple sclerosis</strong> — fatigue and function management through exercise</li>
                  <li><strong>Stroke rehabilitation (long-term)</strong> — functional capacity building</li>
                  <li><strong>Spinal cord injury</strong> (chronic phase)</li>
                  <li><strong>Traumatic brain injury</strong></li>
                  <li><strong>Cerebral palsy</strong></li>
                  <li><strong>Dementia</strong> — supervised exercise requiring clinical oversight</li>
                </ul>
              </div>

              <div className="blog-expertise-card">
                <h3 className="blog-expertise-card-title">🩺 Cancer</h3>
                <ul className="blog-expertise-list">
                  <li><strong>Oncology &amp; cancer rehabilitation</strong> — exercise during and post-treatment; AEPs are specifically trained for this; physios rarely lead this</li>
                </ul>
              </div>

              <div className="blog-expertise-card">
                <h3 className="blog-expertise-card-title">💬 Mental Health</h3>
                <ul className="blog-expertise-list">
                  <li><strong>Depression, anxiety &amp; psychosocial disability</strong> — AEPs are increasingly embedded in mental health teams; exercise is a standalone treatment, not just adjunct</li>
                </ul>
              </div>

              <div className="blog-expertise-card" style={{ gridColumn: '1 / -1' }}>
                <h3 className="blog-expertise-card-title">➕ Other</h3>
                <ul className="blog-expertise-list" style={{ columns: 2, columnGap: '32px' }}>
                  <li><strong>Osteoporosis</strong> — high-intensity resistance and impact training (e.g. LIFTMOR protocol)</li>
                  <li><strong>Eating disorders</strong> — exercise as part of recovery</li>
                  <li><strong>Endometriosis</strong> — emerging EP role in symptom management through exercise</li>
                  <li><strong>Fibromyalgia &amp; chronic fatigue</strong> — pacing and graded exercise</li>
                  <li><strong>Autism &amp; intellectual disability</strong> — NDIS-funded functional capacity programs</li>
                </ul>
              </div>

            </div>

            <div className="blog-aep-statement">
              <p>
                Physios can work with many of these conditions — but their training and primary focus doesn't go as deep into the metabolic, neurological and chronic disease exercise prescription space.
                <strong>AEPs complete the most in-depth clinical exercise training of any profession in Australia.</strong>
              </p>
            </div>

            {/* SECTION 2 */}
            <h2>What Does a Physiotherapist Do?</h2>
            <p>
              Physiotherapists are AHPRA-registered clinicians trained to assess, diagnose and treat physical conditions. They're often your first port of call after an injury — a rolled ankle, a torn muscle, post-surgical recovery.
            </p>
            <p>
              They use hands-on techniques like manual therapy, dry needling, taping and targeted exercise to restore function and reduce pain.
            </p>
            <div className="blog-callout">
              <p>
                Think of physio as the profession that gets you back to baseline. Acute, short-to-medium term, and highly skilled at treating the body after something goes wrong.
              </p>
            </div>

            {/* OVERLAP */}
            <h2>Where They Overlap</h2>
            <p>Despite their differences, both professions share significant common ground:</p>

            <div className="blog-overlap-grid">
              {[
                'Exercise prescription & rehabilitation programs',
                'Musculoskeletal rehab (sub-acute & chronic phases)',
                'Cardiovascular & pulmonary rehabilitation',
                'Falls prevention & balance training',
                'Chronic pain management',
                'Mental health support through structured exercise',
              ].map((item, i) => (
                <div key={i} className="blog-overlap-item">{item}</div>
              ))}
            </div>

            <div className="blog-highlight">
              <p>
                In fact, the two professions often work best together — physio managing the acute phase, exercise physiology taking over with long-term conditioning and disease management.
              </p>
            </div>

            {/* COMPARISON TABLE */}
            <h2>So Which One Do You Need?</h2>

            <div className="blog-table-wrap">
              <table className="blog-table">
                <thead>
                  <tr>
                    <th>Situation</th>
                    <th>See a…</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Acute injury (sprain, strain, post-surgery)</td>
                    <td>Physiotherapist</td>
                  </tr>
                  <tr>
                    <td>Undiagnosed pain</td>
                    <td>
                      GP or Physiotherapist first
                    </td>
                  </tr>
                  <tr>
                    <td>Chronic disease (diabetes, osteoporosis, obesity)</td>
                    <td>Exercise Physiologist</td>
                  </tr>
                  <tr>
                    <td>Long-term rehab and prevention</td>
                    <td>Exercise Physiologist</td>
                  </tr>
                  <tr>
                    <td>Ongoing pain that keeps coming back</td>
                    <td>Both</td>
                  </tr>
                  <tr>
                    <td>Mental health support through movement</td>
                    <td>Exercise Physiologist</td>
                  </tr>
                  <tr>
                    <td>Medicare CDM plan</td>
                    <td>Exercise Physiologist</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* BOTTOM LINE */}
            <div className="blog-bottom-line">
              <div className="blog-bottom-line-inner">
                <p className="blog-bottom-line-text" style={{ textTransform: 'none', lineHeight: '1.3', marginBottom: '24px' }}>
                  Exercise physiology and physio aren't competing — they're <span className="accent">complementary.</span><br />
                  Together, they cover the full picture of your health.
                </p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '18px', color: 'rgba(251,241,230,0.8)', marginBottom: '32px' }}>
                  If you're not sure where to start, we're here to help you figure it out.
                </p>
                <Link href="/contact" className="btn btn-orange">
                  Book in with the Valen Health team today
                </Link>
              </div>
            </div>

          </div>
        </div>

      </main>
      <Footer />
    </>
  );
}
