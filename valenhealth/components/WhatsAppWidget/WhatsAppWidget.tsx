"use client";

import { useState, useEffect } from "react";
import "./WhatsAppWidget.css";

export default function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    // Show a subtle notification badge/tooltip after 4 seconds to grab attention
    const timer = setTimeout(() => {
      setShowNotification(true);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  const toggleWidget = () => {
    setIsOpen(!isOpen);
    setShowNotification(false);
  };

  const handleStartChat = () => {
    const phoneNumber = "919500790694";
    const message = encodeURIComponent("Hi Valen Health, I'm visiting your website and would like to learn more about your services!");
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="wa-widget-container">
      {/* Pop-up Chat Box */}
      <div className={`wa-chat-box ${isOpen ? "open" : ""}`}>
        {/* Chat Box Header */}
        <div className="wa-chat-header">
          <div className="wa-avatar-section">
            <div className="wa-avatar-wrapper">
              <img src="/images/logo/3.png" alt="Valen Health" className="wa-brand-avatar" />
              <span className="wa-online-dot"></span>
            </div>
            <div className="wa-brand-info">
              <h3>Valen Health</h3>
              <p>Typically replies in minutes</p>
            </div>
          </div>
          <button className="wa-close-btn" onClick={toggleWidget} aria-label="Close Chat">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* Chat Box Body */}
        <div className="wa-chat-body">
          <div className="wa-bubble-container">
            <span className="wa-bubble-arrow"></span>
            <div className="wa-chat-bubble">
              <p className="wa-bubble-sender">Valen Health Support</p>
              <p className="wa-bubble-text">
                Hi there! 👋 Welcome to Valen Health. How can we help you today with your fitness, gym memberships, or recovery goals?
              </p>
              <span className="wa-bubble-time">Just now</span>
            </div>
          </div>
        </div>

        {/* Chat Box Footer / Action */}
        <div className="wa-chat-footer">
          <button className="wa-action-btn" onClick={handleStartChat}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: '8px' }}>
              <path d="M12.031 2c-5.514 0-9.969 4.456-9.969 9.971 0 1.954.563 3.775 1.532 5.315l-1.594 4.714 4.887-1.562c1.472.852 3.185 1.344 5.01 1.344 5.515 0 9.969-4.455 9.969-9.971s-4.454-9.971-9.969-9.971zm.04 17.518c-1.708 0-3.292-.505-4.629-1.371l-.331-.215-2.885.922.938-2.772-.239-.379c-.947-1.506-1.45-3.261-1.45-5.112 0-5.074 4.129-9.199 9.208-9.199 5.083 0 9.208 4.125 9.208 9.199 0 5.078-4.125 9.207-9.208 9.207zm4.747-6.52c-.26-.13-1.539-.759-1.776-.846-.237-.087-.41-.13-.58.13-.172.26-.667.846-.818 1.02-.15.173-.3.195-.56.065-.26-.13-1.097-.404-2.09-1.289-.773-.69-1.294-1.542-1.445-1.802-.15-.26-.016-.4-.146-.53-.117-.117-.26-.304-.39-.456-.13-.152-.173-.26-.26-.434-.087-.174-.043-.326-.021-.456.021-.13.172-.412.26-.617.087-.205.173-.346.26-.52.087-.173.043-.324-.022-.455-.065-.13-.58-1.399-.795-1.92-.21-.504-.42-.416-.58-.423l-.496-.007c-.173 0-.455.065-.693.325-.239.26-.91.889-.91 2.167 0 1.279.931 2.513 1.06 2.686.13.174 1.83 2.793 4.433 3.918.619.268 1.102.428 1.478.548.623.198 1.19.171 1.637.104.499-.074 1.539-.629 1.756-1.236.216-.607.216-1.127.151-1.236-.065-.11-.237-.174-.497-.304z"/>
            </svg>
            Start Chat on WhatsApp
          </button>
        </div>
      </div>

      {/* Pulsing Floating WhatsApp Button */}
      <div className="wa-trigger-wrapper">
        {showNotification && !isOpen && (
          <div className="wa-tooltip">
            <span className="wa-tooltip-close" onClick={(e) => { e.stopPropagation(); setShowNotification(false); }}>×</span>
            <p>Hey! Need any help? Chat with us now! 💬</p>
          </div>
        )}
        
        <button 
          className={`wa-trigger-btn ${isOpen ? "active" : ""}`} 
          onClick={toggleWidget}
          aria-label="Chat with us on WhatsApp"
        >
          {isOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="wa-icon-close">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          ) : (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" className="wa-icon-message">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.73-1.45L0 24zm6.59-4.846c1.66.986 3.288 1.48 4.96 1.48 5.41 0 9.813-4.403 9.816-9.818.002-2.624-1.018-5.09-2.873-6.947C16.638 1.998 14.152 1.002 11.517 1.002c-5.415 0-9.819 4.404-9.822 9.82-.001 1.902.501 3.599 1.448 5.239l-.953 3.484 3.865-.989zm11.366-5.493c-.268-.134-1.589-.784-1.835-.873-.247-.089-.427-.134-.607.134-.18.269-.696.873-.853 1.053-.158.179-.315.201-.583.067-.269-.134-1.134-.418-2.16-1.334-.798-.712-1.336-1.593-1.493-1.862-.158-.269-.017-.414.118-.548.121-.12.269-.314.403-.471.134-.157.179-.269.269-.449.09-.179.045-.336-.022-.471-.067-.134-.607-1.46-.83-1.999-.217-.522-.456-.451-.628-.459l-.538-.009c-.18 0-.472.067-.718.337-.247.269-.942.92-.942 2.244s.964 2.599 1.099 2.779c.135.179 1.9 2.899 4.6 4.064.642.277 1.144.443 1.536.567.605.19 1.156.163 1.591.098.486-.072 1.589-.649 1.813-1.277.224-.628.224-1.166.157-1.277-.067-.112-.247-.179-.516-.314z"/>
            </svg>
          )}
          {/* pulsating background rings */}
          <span className="wa-pulse-ring"></span>
          <span className="wa-pulse-ring delay"></span>
        </button>
      </div>
    </div>
  );
}
