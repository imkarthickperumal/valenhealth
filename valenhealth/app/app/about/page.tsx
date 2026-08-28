import { Metadata } from "next";
import AboutClient from "./AboutClient";
import "./about.css";

export const metadata: Metadata = {
  title: "About Valen Health - EP Clinic & Gym in Spearwood, Perth",
  description: "A clinic and a gym, under one roof. Meet the team behind Spearwood's only combined exercise physiology clinic and 24/7 gym.",
  openGraph: {
    title: "About Valen Health - EP Clinic & Gym in Spearwood",
    description: "Meet the team behind Spearwood's only combined exercise physiology clinic and 24/7 gym.",
    url: "https://valenhealth.com.au/about",
  },
};

export default function AboutPage() {
  return <AboutClient />;
}
