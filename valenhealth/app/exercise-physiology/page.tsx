import { Metadata } from "next";
import ExercisePhysiologyClient from "./ExercisePhysiologyClient";
import "./exercise-physiology.css";

export const metadata: Metadata = {
  title: "Exercise Physiology Spearwood - Medicare, DVA, NDIS | Valen Health",
  description: "Clinical exercise physiology in Spearwood, Perth. Medicare bulk-billed (EPC/CDM), DVA, NDIS & private health (HICAPS on-site). Chronic disease, injury rehab, pain management. Book online.",
  openGraph: {
    title: "Exercise Physiology Spearwood - Medicare, DVA, NDIS",
    description: "Clinical exercise physiology in Spearwood. Medicare bulk-billed, DVA, NDIS & private health. Book online.",
    url: "https://valenhealth.com.au/exercise-physiology",
  },
};

export default function ExercisePhysiologyPage() {
  return <ExercisePhysiologyClient />;
}
