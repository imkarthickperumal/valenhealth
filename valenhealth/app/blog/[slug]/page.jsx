import Link from 'next/link';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import '../blog.css';

const blogData = {
  'exercise-physiology-vs-physiotherapy': {
    title: "Exercise Physiology vs Physiotherapy:\nWhat's the Difference and Which One Do You Need?",
    metaTitle: "Exercise Physiology vs Physiotherapy | Valen Health",
    metaDesc: "What's the difference between an exercise physiologist and a physio — and which one do you need? Here's the clear breakdown.",
    authorName: "Valen Health",
    authorRole: "Clinical Team",
    avatar: "VH",
    image: "/images/blog/ep_physio_blog_image.png"
  },
  '5-new-friends-to-help-you-manage-diabetes': {
    title: "5 New Friends to Help You Manage Diabetes",
    metaTitle: "5 New Friends to Help You Manage Diabetes | Valen Health",
    metaDesc: "A diabetes diagnosis can feel overwhelming, but the good news is that you don't have to manage it alone.",
    authorName: "Kayle van Schalkwyk",
    authorRole: "Exercise Physiologist",
    avatar: "KV",
    image: "/images/blog/diabetes_blog_image.png"
  },
  'exercising-with-asthma': {
    title: "Exercising With Asthma",
    metaTitle: "Exercising With Asthma | Valen Health",
    metaDesc: "Having asthma doesn't mean you have to avoid exercise — it means understanding your body, knowing your triggers, and being prepared.",
    authorName: "Kayle van Schalkwyk",
    authorRole: "Exercise Physiologist",
    avatar: "KV",
    image: "/images/GYM/GYM_A738792.jpg"
  },
  'back-pain-australias-most-expensive-health-problem': {
    title: "Back Pain:\nAustralia's Most Expensive Health Problem",
    metaTitle: "Back Pain: Australia's Most Expensive Health Problem | Valen Health",
    metaDesc: "Back pain is the number one cause of disability in Australia and globally. Here's what the research actually shows about recovery, movement and better care.",
    authorName: "Aaron Dean",
    authorRole: "Exercise Physiologist",
    avatar: "AD",
    image: "/images/GYM/GYM_A738801.jpg"
  }
};

export function generateStaticParams() {
  return [
    { slug: 'exercise-physiology-vs-physiotherapy' },
    { slug: '5-new-friends-to-help-you-manage-diabetes' },
    { slug: 'exercising-with-asthma' },
    { slug: 'back-pain-australias-most-expensive-health-problem' },
  ];
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = blogData[slug];

  if (!post) {
    return { title: 'Post not found | Valen Health' };
  }

  return {
    title: post.metaTitle,
    description: post.metaDesc,
  };
}

export default async function BlogPost({ params }) {
  const { slug } = await params;
  const postInfo = blogData[slug];

  if (!postInfo) {
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

  const renderTitle = (title) => {
    if (title.includes(":\n")) {
      const parts = title.split(":\n");
      return (
        <>
          {parts[0]}:
          <span className="accent">{parts[1]}</span>
        </>
      );
    }
    return <span className="accent">{title}</span>;
  };

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
        <section className="blog-post-hero" style={{ backgroundImage: `url('${postInfo.image}')`, backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.7)', zIndex: 1 }}></div>
          <div className="blog-post-hero-inner" style={{ position: 'relative', zIndex: 2 }}>
            <div className="blog-post-meta-row">

            </div>
            <h1 className="blog-post-title">
              {renderTitle(postInfo.title)}
            </h1>
            <div className="blog-post-author-row">
              <div className="blog-post-author-avatar">{postInfo.avatar}</div>
              <div>
                <div className="blog-post-author-name">{postInfo.authorName}</div>
                <div className="blog-post-author-role">{postInfo.authorRole}</div>
              </div>
            </div>
          </div>
        </section>

        {/* POST BODY */}
        <div className="blog-post-body-wrap">
          <div className="blog-post-body">

            {slug === 'exercise-physiology-vs-physiotherapy' && (
              <>
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
              </>
            )}

            {slug === '5-new-friends-to-help-you-manage-diabetes' && (
              <>
                <p>A diabetes diagnosis can feel overwhelming, but the good news is that you don't have to manage it alone. Diabetes care works best when you have a team of health professionals supporting you, each bringing their own expertise to help you stay healthy, prevent complications, and feel your best.</p>
                <p>Think of these five professionals as your new "diabetes friends"—people who are on your team and want to help you succeed.</p>

                <h2>1. Your Dietitian – Your Food Coach</h2>
                <p>Food plays a huge role in managing diabetes, but that doesn't mean you have to give up everything you enjoy. A dietitian can help you understand how different foods affect your blood glucose levels and create a realistic eating plan that suits your lifestyle, culture, preferences, and budget.</p>
                <p>Rather than following restrictive diets you find online, a dietitian provides personalised advice based on your individual health goals.</p>
                <p>A dietitian can help you:</p>
                <ul style={{ paddingLeft: '20px', marginBottom: '32px' }}>
                  <li style={{ marginBottom: '8px' }}>Understand carbohydrates and portion sizes.</li>
                  <li style={{ marginBottom: '8px' }}>Build balanced meals that keep you satisfied.</li>
                  <li style={{ marginBottom: '8px' }}>Manage weight if appropriate.</li>
                  <li style={{ marginBottom: '8px' }}>Reduce cholesterol and blood pressure through nutrition.</li>
                  <li style={{ marginBottom: '8px' }}>Make sustainable changes rather than following fad diets.</li>
                </ul>
                <div className="blog-callout">
                  <p><strong>Remember:</strong> healthy eating for diabetes isn't about perfection—it's about consistency.</p>
                </div>

                <h2>2. Your Exercise Physiologist – Your Movement Expert</h2>
                <p>Exercise is one of the most powerful tools for managing diabetes. When you move, your muscles use glucose for energy, helping lower blood glucose levels and making your body more sensitive to insulin.</p>
                <p>However, not all exercise programs are the same. An Accredited Exercise Physiologist (AEP) can design an exercise program that's safe, effective, and tailored to your health, fitness level, and any other medical conditions you may have.</p>
                <p>An exercise physiologist can help you:</p>
                <ul style={{ paddingLeft: '20px', marginBottom: '32px' }}>
                  <li style={{ marginBottom: '8px' }}>Develop an exercise program you'll actually enjoy.</li>
                  <li style={{ marginBottom: '8px' }}>Exercise safely if you're taking insulin or medications that can cause low blood glucose.</li>
                  <li style={{ marginBottom: '8px' }}>Monitor your blood glucose responses to exercise.</li>
                  <li style={{ marginBottom: '8px' }}>Improve strength, fitness, balance, and mobility.</li>
                  <li style={{ marginBottom: '8px' }}>Reduce your risk of heart disease and other diabetes complications.</li>
                  <li style={{ marginBottom: '8px' }}>Stay motivated and accountable.</li>
                </ul>
                <p>Whether you're just getting started or looking to progress your exercise routine, having expert guidance can make all the difference.</p>

                <h2>3. Your Optometrist – Protecting Your Sight</h2>
                <p>Did you know that diabetes can affect the tiny blood vessels in your eyes long before you notice any changes in your vision?</p>
                <p>Diabetic eye disease often has no symptoms in its early stages, which is why regular eye examinations are so important.</p>
                <p>An optometrist can:</p>
                <ul style={{ paddingLeft: '20px', marginBottom: '32px' }}>
                  <li style={{ marginBottom: '8px' }}>Detect diabetic eye disease early.</li>
                  <li style={{ marginBottom: '8px' }}>Monitor any changes over time.</li>
                  <li style={{ marginBottom: '8px' }}>Refer you for specialist treatment if needed.</li>
                  <li style={{ marginBottom: '8px' }}>Help protect your vision for years to come.</li>
                </ul>
                <p>Most people with diabetes should have a comprehensive eye examination at least every one to two years, or more frequently if recommended by their eye care professional.</p>

                <h2>4. Your Podiatrist – Looking After Your Feet</h2>
                <p>Your feet deserve extra attention when you have diabetes.</p>
                <p>Over time, diabetes can reduce circulation and damage the nerves in your feet. This means small cuts, blisters, or pressure areas may go unnoticed and take longer to heal.</p>
                <p>An annual foot assessment with a podiatrist can identify problems before they become serious.</p>
                <p>A podiatrist can:</p>
                <ul style={{ paddingLeft: '20px', marginBottom: '32px' }}>
                  <li style={{ marginBottom: '8px' }}>Check circulation and nerve function.</li>
                  <li style={{ marginBottom: '8px' }}>Assess your foot shape and footwear.</li>
                  <li style={{ marginBottom: '8px' }}>Treat corns, calluses, and nail problems safely.</li>
                  <li style={{ marginBottom: '8px' }}>Help prevent ulcers and infections.</li>
                  <li style={{ marginBottom: '8px' }}>Provide advice on daily foot care.</li>
                </ul>
                <p>Checking your feet every day at home and seeing a podiatrist regularly are simple habits that can prevent major complications.</p>

                <h2>5. Your GP and Practice Nurse – Your Team Captain</h2>
                <p>Your GP and practice nurse help bring everything together.</p>
                <p>They'll regularly monitor your overall health, coordinate referrals, review your medications, and keep track of important diabetes checks.</p>
                <p>Your GP team may monitor:</p>
                <ul style={{ paddingLeft: '20px', marginBottom: '32px' }}>
                  <li style={{ marginBottom: '8px' }}>HbA1c (your average blood glucose over approximately three months).</li>
                  <li style={{ marginBottom: '8px' }}>Blood pressure.</li>
                  <li style={{ marginBottom: '8px' }}>Cholesterol.</li>
                  <li style={{ marginBottom: '8px' }}>Kidney function.</li>
                  <li style={{ marginBottom: '8px' }}>Weight and waist circumference.</li>
                  <li style={{ marginBottom: '8px' }}>Vaccinations.</li>
                  <li style={{ marginBottom: '8px' }}>Medication effectiveness.</li>
                  <li style={{ marginBottom: '8px' }}>Referrals to other members of your diabetes care team.</li>
                </ul>
                <p>Seeing your GP regularly helps ensure any changes are picked up early, allowing treatment to be adjusted before problems develop.</p>

                <div className="blog-highlight">
                  <h2 style={{ color: 'var(--orange)', marginTop: '0' }}>Diabetes Is a Team Sport</h2>
                  <p>Managing diabetes isn't about being perfect, it's about building healthy habits with the right support around you.</p>
                  <p>Each member of your healthcare team plays an important role:</p>
                  <ul style={{ paddingLeft: '20px', marginBottom: '0' }}>
                    <li style={{ marginBottom: '8px' }}><strong>Dietitian:</strong> Helps you eat well without missing out.</li>
                    <li style={{ marginBottom: '8px' }}><strong>Exercise Physiologist:</strong> Helps you move safely and confidently.</li>
                    <li style={{ marginBottom: '8px' }}><strong>Optometrist:</strong> Protects your eyesight.</li>
                    <li style={{ marginBottom: '8px' }}><strong>Podiatrist:</strong> Keeps your feet healthy.</li>
                    <li style={{ marginBottom: '0' }}><strong>GP and Practice Nurse:</strong> Coordinate your care and monitor your overall health.</li>
                  </ul>
                </div>

                <div className="blog-bottom-line">
                  <div className="blog-bottom-line-inner">
                    <p className="blog-bottom-line-text" style={{ textTransform: 'none', lineHeight: '1.3', marginBottom: '24px' }}>
                      If you've recently been diagnosed with diabetes or it's been a while since you've seen one of these professionals, now is a great time to book in.<br /><br />
                      <span className="accent" style={{ fontSize: '1.2em' }}>Your future self will thank you.</span>
                    </p>
                    <Link href="/contact" className="btn btn-orange">
                      Book in with the Valen Health team today
                    </Link>
                  </div>
                </div>
              </>
            )}

            {slug === 'exercising-with-asthma' && (
              <>
                <p>I have severe asthma, but I've learned that having asthma doesn't mean I have to avoid exercise, it means I need to understand my body, know my triggers, and be prepared.</p>
                <p>When I'm experiencing a flare-up, I'm much more mindful about when, where and how I exercise.</p>
                <p>One of my biggest personal triggers is cold evening and night air, so during a flare I avoid exercising outdoors later in the day and opt for daytime exercise where possible. I also find icy-cold drinks can aggravate my symptoms, so I choose room-temperature water instead.</p>
                <p>I also make sure I complete a slow and thorough warm-up before moving into anything more strenuous. Rather than jumping straight into higher-intensity exercise, I gradually increase the intensity and give my breathing and airways time to adjust.</p>

                <div className="blog-callout">
                  <p>I always have my reliever puffer with me when I exercise. Where possible, I also carry a spacer, as it can help more of the medication reach my lungs and makes correct inhaler technique easier.</p>
                </div>

                <p>I also pay attention to how I'm feeling. If my asthma symptoms are worsening or I'm struggling to breathe normally, that isn't something I try to "push through".</p>

                <h2>Why I Still Exercise</h2>
                <p>It can be tempting to avoid exercise when you have asthma, particularly if you've experienced breathlessness or asthma symptoms during activity. But when my asthma is appropriately managed, regular exercise is actually an important part of looking after my overall health and fitness.</p>
                <p>Exercise doesn't cure asthma or replace asthma medication, but regular physical activity can improve cardiovascular fitness and exercise capacity. As I become fitter, my body can perform the same activities more efficiently, meaning everyday tasks and exercise can feel less demanding.</p>
                <p>Regular exercise can also help support muscular strength, healthy body composition, mental wellbeing and confidence with physical activity. All of which are valuable for people living with a chronic respiratory condition.</p>

                <div className="blog-highlight">
                  <p>For me, the goal isn't to avoid anything that makes me breathe harder. It's to exercise safely, understand the difference between normal exercise-related breathlessness and my asthma symptoms, and adapt when my asthma isn't well controlled.</p>
                </div>

                <p>Having severe asthma has taught me that exercise doesn't have to be all-or-nothing. With good asthma management, awareness of my personal triggers and the right precautions, I can still stay active — I just sometimes need to adapt what exercise looks like for me that day.</p>
                <p style={{ fontSize: '14px', fontStyle: 'italic', color: 'var(--grey-soft)' }}>This is my personal experience with asthma and isn't a substitute for an individual asthma action plan or medical advice.</p>

                <div className="blog-bottom-line">
                  <div className="blog-bottom-line-inner">
                    <p className="blog-bottom-line-text" style={{ textTransform: 'none', lineHeight: '1.3', marginBottom: '24px' }}>
                      Living with asthma doesn't mean sitting on the sidelines — <span className="accent">it means training smart.</span>
                    </p>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '18px', color: 'rgba(251,241,230,0.8)', marginBottom: '32px' }}>
                      Talk to one of our exercise physiologists about a program built around your condition.
                    </p>
                    <Link href="/contact" className="btn btn-orange">
                      Book in with the Valen Health team today
                    </Link>
                  </div>
                </div>
              </>
            )}

            {slug === 'back-pain-australias-most-expensive-health-problem' && (
              <>
                <p>Back pain is not just a minor inconvenience. It is the number one cause of disability in Australia and globally — and much of the care people receive is not only ineffective, but may actively make things worse.</p>

                <h2>The Scale of the Problem</h2>
                <p>Approximately 4 million Australians — 1 in 6 — are living with back problems right now. Globally, low back pain (LBP) affected 619 million people in 2020, a number projected to reach 843 million by 2050. It has been the world's leading cause of disability since 1990.</p>
                <p>The financial burden is enormous. In 2020–21, AUD $3.4 billion was spent treating back problems in Australia. Emergency department and hospital presentations for LBP cost an estimated AUD $392.9 million per year. Add lost productivity, early retirement, welfare payments, and reduced GDP, and the true annual cost runs to many billions more.</p>

                <h2>Why So Much Treatment Fails</h2>
                <p>Here is something the research makes very clear: a significant portion of standard back pain care is not just ineffective — it may be harmful.</p>
                <p>The fear-avoidance model, one of the most replicated frameworks in pain science, describes how people who interpret pain as a sign of danger develop kinesiophobia — a fear of movement. This drives avoidance, muscle guarding, deconditioning, and, ultimately, greater pain and disability. Pain-related fear is specifically implicated in the transition from acute to chronic LBP.</p>

                <div className="blog-highlight">
                  <p>A 2025 qualitative survey published in The Journal of Pain found that phrases implying the spine is unstable, fragile, or in need of protection are harmful messages that amplify catastrophising and fear of movement in people with chronic pain. Well-intentioned advice — like being told to "brace your core to protect your spine" — can inadvertently reinforce the belief that movement is dangerous, increase muscular guarding, and worsen pain through central sensitisation mechanisms.</p>
                </div>

                <p>Routine imaging compounds the problem. X-rays and MRI scans for non-specific LBP frequently reveal incidental findings unrelated to pain, increase patient anxiety, and do not improve outcomes. Australian guidelines recommend imaging only when serious pathology — fracture, malignancy, infection, or cauda equina syndrome — is clinically suspected.</p>

                <h2>What the Research Supports</h2>

                <h2>1. Movement — With the Right Message</h2>
                <p>One of the most robust findings across international systematic reviews is that staying active produces better outcomes than rest. However, the framing of movement matters enormously. The goal is to build confidence in the body's capacity to move — not to teach people that movement is safe only when the spine is stabilised or protected.</p>
                <p>Cognitive Functional Therapy (CFT), developed by Professor Peter O'Sullivan at Curtin University in Western Australia, directly targets unhelpful spine-protection beliefs. It normalises movement, reduces the perceived threat of pain, and addresses the behavioural and psychological drivers of chronicity. RCTs have shown CFT outperforms combined exercise and pain education programs for non-specific chronic LBP.</p>

                <h2>2. Exercise — Type Matters Less Than You Think</h2>
                <p>A 2021 Cochrane systematic review of 249 RCTs involving 24,486 participants found that exercise overall produces clinically important reductions in pain and disability for chronic LBP compared to no treatment. A 2025 meta-analysis found Pilates, walking, yoga, and tai chi all achieved significant pain reduction. Walking, notably, showed zero heterogeneity across studies — its benefits are highly reproducible.</p>
                <p>Critically, the same evidence base shows that core stabilisation exercises are not superior to other exercise types (Gomes-Neto et al. 2017; Cochrane review by Saragiotto et al. 2016). And when core exercises are taught under a "protect the spine" frame, there is a real risk of reinforcing exactly the fear-avoidance patterns that perpetuate chronic pain. The best exercise is the one that builds confidence, is enjoyable, and will be sustained.</p>

                <h2>3. Pain Neuroscience Education</h2>
                <p>Understanding why pain occurs — and that it does not necessarily mean damage — directly reduces fear and catastrophising. A 2025 systematic review and meta-analysis confirmed that Pain Neuroscience Education (PNE) significantly reduces kinesiophobia, catastrophising, pain intensity, and disability in chronic LBP. Teaching people that pain is a protective alarm system — not a reliable indicator of tissue damage — changes behaviour, reduces guarding, and improves outcomes.</p>

                <h2>4. Psychological and Biopsychosocial Approaches</h2>
                <p>For patients with elevated fear-avoidance, anxiety, or catastrophising, psychological approaches including CBT, mindfulness-based stress reduction, and graded exposure to movement are recommended alongside physical interventions. A Cochrane review by Kamper et al. (2015) demonstrated that multidisciplinary biopsychosocial rehabilitation produced greater improvements in pain and function than physical treatment alone.</p>

                <h2>5. Medication: Last Resort, Not First Response</h2>
                <p>Australian and international guidelines consistently recommend that medication should not be the first line of management for non-specific LBP. When used, it should be at the lowest effective dose for the shortest duration, always combined with active approaches.</p>

                <div className="blog-aep-statement">
                  <p>
                    The research on back pain tells a clear story: how we talk about pain matters as much as what we prescribe for it. Treatment that frames the spine as fragile or in need of constant protection may do more harm than good.
                    <strong>The evidence-based path forward builds confidence, normalises movement, and addresses the psychological and social factors that drive chronicity.</strong>
                  </p>
                </div>

                <div className="blog-bottom-line">
                  <div className="blog-bottom-line-inner">
                    <p className="blog-bottom-line-text" style={{ textTransform: 'none', lineHeight: '1.3', marginBottom: '24px' }}>
                      Your spine isn't fragile — <span className="accent">it's built to move.</span>
                    </p>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '18px', color: 'rgba(251,241,230,0.8)', marginBottom: '32px' }}>
                      If back pain is holding you back, our exercise physiologists can build you an evidence-based path forward.
                    </p>
                    <Link href="/contact" className="btn btn-orange">
                      Book in with the Valen Health team today
                    </Link>
                  </div>
                </div>
              </>
            )}

          </div>
        </div>

      </main>
      <Footer />
    </>
  );
}
