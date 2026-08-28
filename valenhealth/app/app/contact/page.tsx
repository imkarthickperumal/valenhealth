import { Metadata } from "next";
import ContactClient from "./ContactClient";
import "./contact.css";

export const metadata: Metadata = {
  title: "Contact Valen Health - Book an EP Appointment or Gym Tour | Spearwood",
  description: "Get in touch with Valen Health in Spearwood. Book an exercise physiology appointment, schedule a gym tour, or ask about Medicare, DVA & NDIS funding.",
  openGraph: {
    title: "Contact Valen Health - Book an EP Appointment or Gym Tour",
    description: "Book an exercise physiology appointment or schedule a gym tour at Valen Health, Spearwood.",
    url: "https://valenhealth.com.au/contact",
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
