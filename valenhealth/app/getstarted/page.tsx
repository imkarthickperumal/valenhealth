import { Metadata } from "next";
import GetStartedClient from "./GetStartedClient";
import "./get-started.css";

export const metadata: Metadata = {
  title: "Book Your Assessment | Valen Health",
  description:
    "We don't guess — we assess. Objective VALD force plate testing and a graded, supervised exercise program matched to your diagnosis.",
  openGraph: {
    title: "Book Your Assessment | Valen Health",
    description:
      "We don't guess — we assess. Objective VALD force plate testing and a graded, supervised exercise program matched to your diagnosis.",
    url: "https://valenhealth.com.au/getstarted",
  },
};

export default function GetStartedPage() {
  return <GetStartedClient />;
}
