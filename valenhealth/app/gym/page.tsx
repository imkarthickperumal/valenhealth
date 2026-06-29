import { Metadata } from "next";
import GymClient from "./GymClient";
import "./gym.css";

export const metadata: Metadata = {
  title: "24/7 Gym Spearwood - From $18/wk | Valen Health",
  description: "24/7 gym access in Spearwood from $18/week. Full commercial equipment, no lock-in contracts. VALD ForceDecks & Dynamo performance testing available. Join online.",
  openGraph: {
    title: "24/7 Gym Spearwood - From $18/wk | Valen Health",
    description: "24/7 gym access in Spearwood from $18/week. Full commercial equipment, no lock-in contracts.",
    url: "https://valenhealth.com.au/gym",
  },
};

export default function GymPage() {
  return <GymClient />;
}
