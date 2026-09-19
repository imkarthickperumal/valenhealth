import { Metadata } from "next";
import GetStartedClient from "./GetStartedClient";
import "./get-started.css";

export const metadata: Metadata = {
  title: "Exercise Physiologist Spearwood | Book Your Assessment",
  description:
    "Exercise physiology clinic and 24/7 gym in Spearwood, near Cockburn and Fremantle. Book your assessment online. Private health claimed on the spot.",
  openGraph: {
    title: "Exercise Physiologist Spearwood | Book Your Assessment | Valen Health",
    description:
      "Exercise physiology clinic and 24/7 gym in Spearwood, near Cockburn and Fremantle. Book your assessment online. Private health claimed on the spot.",
    url: "https://valenhealth.com.au/getstarted",
  },
};

export default function GetStartedPage() {
  return <GetStartedClient />;
}
