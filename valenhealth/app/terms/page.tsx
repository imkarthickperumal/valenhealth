import { Metadata } from "next";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import "./terms.css";

export const metadata: Metadata = {
  title: "Website Terms of Use | Valen Health",
  description:
    "The terms and conditions that apply to your use of valenhealth.com.au.",
  openGraph: {
    title: "Website Terms of Use | Valen Health",
    description:
      "The terms and conditions that apply to your use of valenhealth.com.au.",
    url: "https://valenhealth.com.au/terms",
  },
};

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="terms-page">
        {/* HERO */}
        <section className="terms-hero">
          <div className="terms-hero-inner">
            <div className="terms-hero-eyebrow">Legal</div>
            <h1 className="terms-hero-title">Website Terms of Use</h1>
            <p className="terms-hero-updated">
              Valen Health — Last updated 1 September 2026
            </p>
          </div>
        </section>

        {/* BODY */}
        <div className="terms-body-wrap">
          <div className="terms-body">
            <h2 className="terms-section-title">
              <span className="terms-section-num">1.</span> ABOUT THESE TERMS
            </h2>
            <p className="terms-intro">
              These terms apply to your use of valenhealth.com.au. By using this
              website you agree to them. If you don&apos;t agree, please
              don&apos;t use the site.
              <br />
              <br />
              This website is operated by <strong>
                Valen Health Pty Ltd
              </strong>{" "}
              (ABN 20 683 586 450), Unit 4, 235 Rockingham Road, Spearwood WA
              6163.
            </p>

            <div className="terms-section">
              <h2 className="terms-section-title">
                <span className="terms-section-num">2.</span> This Website Is
                Not Medical Advice
              </h2>
              <p>
                The information on this website is general in nature and
                provided for information only. It is not a substitute for
                individual assessment or advice from a qualified health
                professional, and you should not rely on it to diagnose or treat
                any condition.
              </p>
              <p>
                Exercise carries risks. Before starting any exercise program,
                speak with your doctor or one of our Accredited Exercise
                Physiologists, particularly if you have an existing injury, a
                chronic condition, or you are unsure whether exercise is safe
                for you.
              </p>
              <div className="terms-callout">
                <p>If you are experiencing a medical emergency, call 000.</p>
              </div>
            </div>

            <div className="terms-section">
              <h2 className="terms-section-title">
                <span className="terms-section-num">3.</span> Bookings Made
                Through This Website
              </h2>
              <p>
                Appointments booked online are subject to availability and
                confirmation by us. We may need to reschedule where a
                practitioner is unavailable, and will contact you as soon as
                possible if that happens.
              </p>
              <p>
                You are responsible for giving us accurate information when you
                book, including any health conditions relevant to your safety
                during exercise.
              </p>
            </div>

            <div className="terms-section">
              <h2 className="terms-section-title">
                <span className="terms-section-num">4.</span> Fees, Funding and
                Cancellations
              </h2>
              <p>
                Current fees are available on request and are displayed at the
                clinic. Where you are claiming through Medicare, DVA, NDIS, a
                private health fund, an insurer or WorkCover, your eligibility
                and the amount covered are determined by that funder, not by us.
                Any gap is payable by you.
              </p>
              <p>
                If you need to cancel or reschedule an appointment, we ask for
                at least 24 hours&apos; notice. Cancellations with less than 24
                hours&apos; notice, and appointments you do not attend, incur a
                $50 fee.
              </p>
              <p>
                We understand things come up. If something unavoidable happens,
                please call us on <a href="tel:0489293000">0489 293 000</a> as
                early as you can and we will do our best to work with you.
              </p>
            </div>

            <div className="terms-section">
              <h2 className="terms-section-title">
                <span className="terms-section-num">5.</span> Gym Membership
              </h2>
              <p>
                Gym memberships are governed by the separate membership terms
                and conditions, health screening and waiver you agree to when
                you join. Those documents take precedence over these website
                terms for anything relating to your membership, facility access
                and billing.
              </p>
            </div>

            <div className="terms-section">
              <h2 className="terms-section-title">
                <span className="terms-section-num">6.</span> Using This Website
              </h2>
              <p>
                You agree not to use this website in any way that is unlawful,
                or that could damage, disable or impair it or interfere with
                anyone else&apos;s use of it. You must not attempt to gain
                unauthorised access to any part of the site or our systems.
              </p>
            </div>

            <div className="terms-section">
              <h2 className="terms-section-title">
                <span className="terms-section-num">7.</span> Our Content
              </h2>
              <p>
                All content on this website — text, images, logos, video and
                design — is owned by Valen Health or used with permission, and
                is protected by copyright. You may view and print it for your
                own personal use. You may not reproduce, republish or use it
                commercially without our written permission.
              </p>
            </div>

            <div className="terms-section">
              <h2 className="terms-section-title">
                <span className="terms-section-num">8.</span> Links to Other
                Websites
              </h2>
              <p>
                This website may link to third-party sites, including our online
                booking system. We provide those links for convenience and are
                not responsible for the content, accuracy or privacy practices
                of any site we do not operate.
              </p>
            </div>

            <div className="terms-section">
              <h2 className="terms-section-title">
                <span className="terms-section-num">9.</span> Availability and
                Accuracy
              </h2>
              <p>
                We try to keep this website accurate and available, but we
                don&apos;t guarantee it will be uninterrupted, error-free, or
                free of viruses. We may change or remove content at any time
                without notice.
              </p>
            </div>

            <div className="terms-section">
              <h2 className="terms-section-title">
                <span className="terms-section-num">10.</span> Liability
              </h2>
              <p>
                Nothing in these terms excludes any rights or guarantees you
                have under the Australian Consumer Law that cannot lawfully be
                excluded. To the extent permitted by law, we are not liable for
                any loss or damage arising from your use of this website or
                reliance on its content, and our liability is limited to
                resupplying the relevant service or paying the cost of having it
                resupplied.
              </p>
            </div>

            <div className="terms-section">
              <h2 className="terms-section-title">
                <span className="terms-section-num">11.</span> Privacy
              </h2>
              <p>
                Our handling of your personal information is set out in our
                Privacy Policy at{" "}
                <a href="/privacy">valenhealth.com.au/privacy</a>.
              </p>
            </div>

            <div className="terms-section">
              <h2 className="terms-section-title">
                <span className="terms-section-num">12.</span> Governing Law
              </h2>
              <p>
                These terms are governed by the laws of Western Australia, and
                you submit to the non-exclusive jurisdiction of the courts of
                that state.
              </p>
            </div>

            <div className="terms-section">
              <h2 className="terms-section-title">
                <span className="terms-section-num">13.</span> Changes to These
                Terms
              </h2>
              <p>
                We may update these terms from time to time. The current version
                is always available at{" "}
                <a href="/terms">valenhealth.com.au/terms</a>.
              </p>
            </div>

            <div className="terms-section">
              <h2 className="terms-section-title">
                <span className="terms-section-num">14.</span> Contact Us
              </h2>
              <div className="terms-contact-card">
                <p>
                  <strong>Valen Health</strong>
                  <br />
                  Unit 4, 235 Rockingham Road, Spearwood WA 6163
                  <br />
                  Phone: <a href="tel:0489293000">0489 293 000</a>
                  <br />
                  Email:{" "}
                  <a href="mailto:admin@valenhealth.com.au">
                    admin@valenhealth.com.au
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
