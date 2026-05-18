import type { Metadata } from "next";
import { League_Spartan, Open_Sans, Playfair_Display, Fraunces } from "next/font/google";
import "./globals.css";
import MetaPixel from "../components/MetaPixel";

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
  title: "Valen Health — Move with Purpose",
  description:
    "Spearwood's only science-backed gym. 24/7 gym + clinical Exercise Physiology under one roof.",
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
        <MetaPixel />
        {children}
      </body>
    </html>
  );
}
