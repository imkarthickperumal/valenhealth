import { Metadata } from "next";
import ReferralClient from "./ReferralClient";
import "./referral.css";

export const metadata: Metadata = {
  title: "GP Referral - Exercise Physiology | Valen Health Spearwood",
  description: "Refer your patient to Valen Health for clinical exercise physiology. Medicare EPC/CDM, DVA, WorkCover WA & NDIS accepted. VALD-equipped clinic in Spearwood.",
  openGraph: {
    title: "GP Referral - Exercise Physiology | Valen Health",
    description: "Refer your patient to Valen Health for clinical EP. Medicare, DVA, WorkCover & NDIS accepted.",
    url: "https://valenhealth.com.au/referral",
  },
};

export default function ReferralPage() {
  return <ReferralClient />;
}
