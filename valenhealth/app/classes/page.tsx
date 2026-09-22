import { Metadata } from "next";
import ClassesClient from "./ClassesClient";
import "./classes.css";

export const metadata: Metadata = {
  title: "Weekly Classes & Timetable Spearwood | Valen Health",
  description: "View our weekly group fitness timetable in Spearwood. Offering Circuit Classes and EP-led Fit and Fab Clinical Classes for all fitness levels. Book now.",
  openGraph: {
    title: "Weekly Classes & Timetable Spearwood | Valen Health",
    description: "EP-led Fit & Fab clinical classes and high-energy Circuit classes in Spearwood. View weekly schedule and book in today.",
    url: "https://valenhealth.com.au/classes",
  },
};

export default function ClassesPage() {
  return <ClassesClient />;
}
