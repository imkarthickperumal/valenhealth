import { Metadata } from "next";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import "./privacy.css";

export const metadata: Metadata = {
  title: "Privacy Policy | Valen Health",
  description:
    "How Valen Health collects, holds, uses and discloses your personal and health information.",
  openGraph: {
    title: "Privacy Policy | Valen Health",
    description:
      "How Valen Health collects, holds, uses and discloses your personal and health information.",
    url: "https://valenhealth.com.au/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="privacy-page">
        {/* HERO */}
        <section className="privacy-hero">
          <div className="privacy-hero-inner">
            <div className="privacy-hero-eyebrow">Legal</div>
            <h1 className="privacy-hero-title">Privacy Policy</h1>
            <p className="privacy-hero-updated">
              Valen Health — Last updated 1 September 2026
            </p>
          </div>
        </section>

        {/* BODY */}
        <div className="privacy-body-wrap">
          <div className="privacy-body">
            <h2 className="privacy-section-title">
              <span className="privacy-section-num">1.</span>WHO WE ARE
            </h2>
            <p className="privacy-intro">
              <strong>Valen Health Pty Ltd</strong> (ABN 20 683 586 450),
              trading as Valen Health, is an exercise physiology clinic and 24/7
              gym at Unit 4, 235 Rockingham Road, Spearwood WA 6163. In this
              policy, &ldquo;we&rdquo;, &ldquo;us&rdquo; and &ldquo;our&rdquo;
              mean Valen Health.
              <br />
              <br />
              We take your privacy seriously. Because we provide a health
              service and hold health information, we are bound by the{" "}
              <em>Privacy Act 1988</em> (Cth) and the Australian Privacy
              Principles regardless of our size — the small business exemption
              does not apply to health service providers.
            </p>

            <div className="privacy-section">
              <h2 className="privacy-section-title">
                <span className="privacy-section-num">2.</span> What This Policy
                Covers
              </h2>
              <p>
                This policy explains how we collect, hold, use and disclose your
                personal information, including health information, whether you
                are a client of our exercise physiology services, a gym member,
                a visitor to this website, or someone who contacts us.
              </p>
            </div>

            <div className="privacy-section">
              <h2 className="privacy-section-title">
                <span className="privacy-section-num">3.</span> The Information
                We Collect
              </h2>

              <div className="privacy-subheading">Personal information</div>
              <p>
                Your name, date of birth, address, phone number, email address,
                emergency contact details, and your next of kin where you
                provide them.
              </p>

              <div className="privacy-subheading">Health information</div>
              <p>
                Health information is treated as sensitive information under the
                Privacy Act and is given a higher level of protection. This
                includes your medical history, current conditions and symptoms,
                injuries, medications, GP and specialist details, referral
                information, assessment results (including VALD ForceDecks and
                Dynamo testing data), clinical notes, exercise programs, and
                your progress over time.
              </p>

              <div className="privacy-subheading">
                Funding and payment information
              </div>
              <p>
                Your Medicare number, DVA card details, NDIS participant number,
                private health fund details, WorkCover or insurer claim details,
                and payment card information where you pay by card.
              </p>

              <div className="privacy-subheading">
                Gym membership information
              </div>
              <p>
                Membership type, billing details, access records showing when
                you enter the facility, and health screening responses you
                provide before using the gym.
              </p>

              <div className="privacy-subheading">
                Website and technical information
              </div>
              <p>
                When you visit our website we collect your IP address, browser
                and device type, the pages you view, how you arrived at our
                site, and how you interact with it. This is collected through
                Google Analytics and Google Ads and is generally not used to
                identify you personally.
              </p>
            </div>

            <div className="privacy-section">
              <h2 className="privacy-section-title">
                <span className="privacy-section-num">4.</span> How We Collect
                It
              </h2>
              <ul>
                <li>
                  Directly from you — in person, by phone, by email, through our
                  website contact form, or through our online booking system.
                </li>
                <li>
                  From your GP or referring practitioner, where you have been
                  referred to us.
                </li>
                <li>
                  From your insurer, WorkCover claims manager, rehabilitation
                  consultant or NDIS plan manager, where they are funding your
                  care.
                </li>
                <li>
                  From other health practitioners involved in your care, with
                  your consent.
                </li>
                <li>
                  Automatically, through cookies and analytics when you use our
                  website.
                </li>
              </ul>
              <p>
                Wherever it is reasonable and practicable, we collect your
                information directly from you.
              </p>
            </div>

            <div className="privacy-section">
              <h2 className="privacy-section-title">
                <span className="privacy-section-num">5.</span> Why We Collect
                It
              </h2>
              <ul>
                <li>
                  To assess your condition and design and deliver a safe,
                  appropriate exercise program.
                </li>
                <li>To keep accurate clinical records of your care.</li>
                <li>
                  To communicate with you about appointments, including
                  reminders.
                </li>
                <li>
                  To bill you and to claim on your behalf from Medicare, DVA,
                  NDIS, your private health fund, an insurer or WorkCover.
                </li>
                <li>
                  To report on your progress to your referring GP, insurer or
                  plan manager where that is part of your care or funding
                  arrangement.
                </li>
                <li>To manage your gym membership and facility access.</li>
                <li>
                  To meet our legal, professional and insurance obligations.
                </li>
                <li>To improve our services and our website.</li>
              </ul>
            </div>

            <div className="privacy-section">
              <h2 className="privacy-section-title">
                <span className="privacy-section-num">6.</span> Consent
              </h2>
              <p>
                We collect health information only with your consent, or where
                the law otherwise permits or requires it. You can withdraw your
                consent at any time by contacting us, although this may affect
                our ability to continue providing you with services.
              </p>
            </div>

            <div className="privacy-section">
              <h2 className="privacy-section-title">
                <span className="privacy-section-num">7.</span> Who We Share It
                With
              </h2>
              <p>
                We do not sell your personal information. We may share it with:
              </p>
              <ul>
                <li>
                  Your referring GP or specialist — progress reports and
                  treatment summaries, as part of your care.
                </li>
                <li>
                  Funders — Medicare, the Department of Veterans&apos; Affairs,
                  the NDIS, your private health fund, WorkCover WA or an
                  insurer, for the purpose of claiming and reporting.
                </li>
                <li>
                  Rehabilitation providers and claims managers, where they are
                  coordinating your return to work.
                </li>
                <li>
                  Other health practitioners involved in your care, with your
                  consent.
                </li>
                <li>
                  Our software and service providers — listed in section 8.
                </li>
                <li>
                  Anyone else you direct us to, or where we are required or
                  authorised by law to disclose, including where there is a
                  serious threat to someone&apos;s life, health or safety.
                </li>
              </ul>
            </div>

            <div className="privacy-section">
              <h2 className="privacy-section-title">
                <span className="privacy-section-num">8.</span> Our Service
                Providers and Overseas Storage
              </h2>
              <p>
                We use the following platforms to run our services. Some are
                operated by companies outside Australia, which means your
                information may be stored or accessed overseas.
              </p>
              <div className="privacy-table-wrap">
                <table className="privacy-table">
                  <thead>
                    <tr>
                      <th>Provider</th>
                      <th>Purpose</th>
                      <th>Location</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>PracSuite</td>
                      <td>Clinical records, appointments, invoicing</td>
                      <td>Australia</td>
                    </tr>
                    <tr>
                      <td>GymMaster</td>
                      <td>Gym memberships, access records</td>
                      <td>New Zealand</td>
                    </tr>
                    <tr>
                      <td>Square</td>
                      <td>Card payments</td>
                      <td>United States</td>
                    </tr>
                    <tr>
                      <td>Xero</td>
                      <td>Accounting and invoicing records</td>
                      <td>New Zealand / Australia</td>
                    </tr>
                    <tr>
                      <td>Google</td>
                      <td>Website analytics and advertising data</td>
                      <td>United States</td>
                    </tr>
                    <tr>
                      <td>Brevo</td>
                      <td>Email communications</td>
                      <td>European Union</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p>
                Your clinical records are held in Australia. Before disclosing
                personal information overseas we take reasonable steps to ensure
                the recipient handles it consistently with the Australian
                Privacy Principles.
              </p>
            </div>

            <div className="privacy-section">
              <h2 className="privacy-section-title">
                <span className="privacy-section-num">9.</span> How We Protect
                Your Information
              </h2>
              <p>
                We take reasonable steps to protect your information from
                misuse, interference, loss, and unauthorised access,
                modification or disclosure. This includes password-protected and
                access-controlled systems, encryption of clinical data in
                transit and at rest, restricting staff access to what each
                person needs for their role, secure storage of any paper
                records, and confidentiality obligations for all staff and
                contractors.
              </p>
            </div>

            <div className="privacy-section">
              <h2 className="privacy-section-title">
                <span className="privacy-section-num">10.</span> How Long We
                Keep It
              </h2>
              <p>
                We retain clinical records for at least seven years from your
                last appointment. Where you were under 18 at your last
                appointment, we retain your records until you turn 25. Other
                records are kept only as long as we need them for the purpose
                they were collected or to meet our legal obligations, after
                which they are securely destroyed or de-identified.
              </p>
            </div>

            <div className="privacy-section">
              <h2 className="privacy-section-title">
                <span className="privacy-section-num">11.</span> Direct
                Marketing
              </h2>
              <p>
                We may send you information about our services, classes,
                programs and offers. Every marketing message includes an
                unsubscribe option, and you can opt out at any time by
                contacting us. We will not use your health information for
                marketing without your consent.
              </p>
            </div>

            <div className="privacy-section">
              <h2 className="privacy-section-title">
                <span className="privacy-section-num">12.</span> Cookies and
                Website Tracking
              </h2>
              <p>
                Our website uses cookies and similar technologies through Google
                Analytics and Google Ads to understand how people use the site
                and to measure our advertising. This may include remarketing,
                which means you may see our ads on other websites after visiting
                ours.
              </p>
              <p>
                You can control or disable cookies through your browser
                settings, and you can opt out of personalised Google advertising
                through Google&apos;s Ads Settings. Disabling cookies may affect
                how parts of our website work.
              </p>
            </div>

            <div className="privacy-section">
              <h2 className="privacy-section-title">
                <span className="privacy-section-num">13.</span> Accessing and
                Correcting Your Information
              </h2>
              <p>
                You can ask for a copy of the personal information we hold about
                you, and ask us to correct it if it is inaccurate, out of date,
                incomplete or misleading. Contact us using the details in
                section 16.
              </p>
              <p>
                We will respond within a reasonable time, normally 30 days.
                There is no fee to request access, though we may charge a
                reasonable fee for the time and materials involved in providing
                it. In limited circumstances we may refuse access or correction
                — if we do, we will explain why in writing and tell you how to
                complain.
              </p>
            </div>

            <div className="privacy-section">
              <h2 className="privacy-section-title">
                <span className="privacy-section-num">14.</span> Complaints
              </h2>
              <p>
                If you believe we have breached the Australian Privacy
                Principles, please contact us first. We will acknowledge your
                complaint within 7 days and aim to resolve it within 30 days.
              </p>
              <p>
                If you are not satisfied with our response, you can contact the
                Office of the Australian Information Commissioner at{" "}
                <a
                  href="https://www.oaic.gov.au"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  oaic.gov.au
                </a>{" "}
                or on 1300 363 992.
              </p>
            </div>

            <div className="privacy-section">
              <h2 className="privacy-section-title">
                <span className="privacy-section-num">15.</span> Data Breaches
              </h2>
              <p>
                If a data breach occurs that is likely to result in serious
                harm, we will notify you and the Office of the Australian
                Information Commissioner as required under the Notifiable Data
                Breaches scheme.
              </p>
            </div>

            <div className="privacy-section">
              <h2 className="privacy-section-title">
                <span className="privacy-section-num">16.</span> Contact Us
              </h2>
              <div className="privacy-contact-card">
                <p>
                  <strong>Valen Health — Privacy Officer</strong>
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

            <div className="privacy-section">
              <h2 className="privacy-section-title">
                <span className="privacy-section-num">17.</span> Changes to This
                Policy
              </h2>
              <p>
                We may update this policy from time to time. The current version
                is always available at{" "}
                <a href="/privacy">valenhealth.com.au/privacy</a>, and the date
                at the top shows when it was last updated.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
