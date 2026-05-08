import Link from "next/link";

export default function Footer() {
  return (
    <footer className="sub-footer">
      <div className="sub-footer-inner">
        <div className="sub-footer-logo">
          <img src="/images/logo/2.png" alt="Valen Health" style={{ height: '40px', width: 'auto', display: 'block' }} />
        </div>
        <div className="sub-footer-meta">Unit 4, 235 Rockingham Road, Spearwood WA 6163</div>
        <div className="sub-footer-meta">© Valen Health · Vitality And Longevity Exercise Network</div>
      </div>
    </footer>
  );
}
