import Header from "../../components/Header";
import Footer from "../../components/Footer";
import RegistrationForm from "../../components/RegistrationForm/RegistrationForm";

export default function JoinPage() {
  return (
    <div className="join-page">
      <Header />
      
      <main style={{ background: "var(--stone-100)", minHeight: "80vh", padding: "60px 20px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", textAlign: "center", marginBottom: "40px" }}>
          <span className="eyebrow" style={{ color: "var(--orange)", fontWeight: 700, letterSpacing: "0.2em" }}>Registration</span>
          <h1 style={{ fontSize: "clamp(32px, 5vw, 48px)", fontWeight: 700, margin: "16px 0" }}>
            Join the <em className="serif-i" style={{ color: "var(--orange)" }}>Valen</em> Network
          </h1>
        </div>
        
        <div style={{ maxWidth: "500px", margin: "0 auto", background: "white", borderRadius: "12px", boxShadow: "0 20px 40px rgba(0,0,0,0.1)", overflow: "hidden" }}>
          <RegistrationForm />
        </div>
      </main>

      <Footer />
    </div>
  );
}
