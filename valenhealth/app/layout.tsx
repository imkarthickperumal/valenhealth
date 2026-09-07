import type { Metadata } from "next";
import {
  League_Spartan,
  Open_Sans,
  Playfair_Display,
  Fraunces,
} from "next/font/google";
import Script from "next/script";
import "./globals.css";
import MetaPixel from "../components/MetaPixel";
import WhatsAppWidget from "../components/WhatsAppWidget/WhatsAppWidget";
const leagueSpartan = League_Spartan({
  variable: "--font-league-spartan",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["300", "400"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: {
    default:
      "Valen Health - Exercise Physiology Clinic & 24/7 Gym | Spearwood, Perth",
    template: "%s | Valen Health",
  },
  description:
    "Spearwood's EP clinic + 24/7 gym under one roof. Medicare bulk-billed exercise physiology, NDIS, DVA & private health.",
  metadataBase: new URL("https://valenhealth.com.au"),
  openGraph: {
    siteName: "Valen Health",
    type: "website",
    locale: "en_AU",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-AU"
      className={`${leagueSpartan.variable} ${openSans.variable} ${fraunces.variable} ${playfairDisplay.variable}`}
    >
      <body>
        {/* Attribution Cookie Tracker */}
        <Script id="vh-attribution" strategy="beforeInteractive">
          {`
            (function () {
              var MAXAGE = 90 * 24 * 60 * 60;
              function setCookie(n, v) {
                document.cookie = n + '=' + encodeURIComponent(v) + ';path=/;max-age=' + MAXAGE + ';SameSite=Lax';
              }
              function getCookie(n) {
                var m = document.cookie.match('(^|;)\\\\s*' + n + '\\\\s*=\\\\s*([^;]+)');
                return m ? decodeURIComponent(m[2]) : '';
              }
              var qs = new URLSearchParams(window.location.search);
              ['gclid','fbclid','utm_source','utm_medium','utm_campaign','utm_term','utm_content'].forEach(function (p) {
                if (qs.get(p)) setCookie('vh_' + p, qs.get(p));
              });
              if (!getCookie('vh_landing_page')) {
                setCookie('vh_landing_page', window.location.href);
                setCookie('vh_referrer', document.referrer || 'direct');
              }
              window.vhGet = getCookie;
            })();
          `}
        </Script>
        <MetaPixel />
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-5NJG3GH762"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-5NJG3GH762');
            gtag('config', 'AW-18279882531');
            window.trackConversion = function() {
              if (typeof window !== 'undefined' && window.gtag) {
                window.gtag('event', 'conversion', {
                  'send_to': 'AW-18279882531/jn-TCMGDncccEKO-w4xE',
                  'value': 1.0,
                  'currency': 'AUD'
                });
              }
            };
          `}
        </Script>
        {children}
        <WhatsAppWidget />
        {/* Start of HubSpot Embed Code */}
        <Script
          type="text/javascript"
          id="hs-script-loader"
          async
          defer
          src="https://js-ap1.hs-scripts.com/443661932.js"
          strategy="afterInteractive"
        />
        {/* End of HubSpot Embed Code */}
      </body>
    </html>
  );
}
