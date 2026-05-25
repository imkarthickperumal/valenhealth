"use client";

import { useState, useEffect, useRef, FormEvent } from "react";
import "./WhatsAppWidget.css";

type Message = {
  id: string;
  text: string;
  sender: "user" | "bot";
  time: string;
};

export default function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "bot",
      text: "Hi there! 👋 Welcome to Valen Health. How can we help you today with your fitness, gym memberships, or recovery goals?\n\n1️⃣ Book a session\n2️⃣ Our services\n3️⃣ Pricing & plans\n4️⃣ Location & hours\n5️⃣ Talk to our team",
      time: "Just now",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isAwaitingContact, setIsAwaitingContact] = useState(false);
  const [mounted, setMounted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    // Show a subtle notification badge/tooltip after 4 seconds to grab attention
    const timer = setTimeout(() => {
      setShowNotification(true);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const toggleWidget = () => {
    setIsOpen(!isOpen);
    setShowNotification(false);
  };

  const handleSendMessage = async (e: FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue.trim(),
      sender: "user",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    try {
      if (isAwaitingContact) {
        // Send email notification with contact info
        await fetch("/api/webchat/notify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ contactInfo: userMessage.text, history: [...messages, userMessage] }),
        });

        setTimeout(() => {
          const botMessage: Message = {
            id: (Date.now() + 1).toString(),
            text: "✅ Thank you! We've notified our team and sent your details to admin@valenhealth.com.au. We will be in touch shortly.",
            sender: "bot",
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          };
          setMessages((prev) => [...prev, botMessage]);
          setIsTyping(false);
          setIsAwaitingContact(false);
        }, 800);
        return;
      }

      const response = await fetch("/api/webchat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage.text }),
      });

      const data = await response.json();

      if (data.reply) {
        let finalReply = data.reply;
        
        // Check if the bot is telling the user that the team will reach out
        if (finalReply.includes("A member of the Valen Health team will reach out")) {
          finalReply += "\n\n👉 *Please reply with your Name and Email or Phone Number* so we know how to contact you.";
          setIsAwaitingContact(true);
        }

        // Simulate a slight delay to make it feel like real typing
        setTimeout(() => {
          const botMessage: Message = {
            id: (Date.now() + 1).toString(),
            text: finalReply,
            sender: "bot",
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          };
          setMessages((prev) => [...prev, botMessage]);
          setIsTyping(false);
        }, 600);
      } else {
        setIsTyping(false);
      }
    } catch (error) {
      console.error("Chat error:", error);
      setIsTyping(false);
    }
  };

  // Helper to format text with line breaks (like in WhatsApp)
  const formatText = (text: string) => {
    return text.split("\n").map((line, i) => (
      <span key={i}>
        {line}
        <br />
      </span>
    ));
  };

  if (!mounted) return null;

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
              <p>Typically replies in seconds</p>
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
          <div className="wa-messages-list">
            {messages.map((msg) => (
              <div key={msg.id} className={`wa-message-wrapper ${msg.sender}`}>
                <div className="wa-chat-bubble">
                  {msg.sender === "bot" && <p className="wa-bubble-sender">Valen Health Support</p>}
                  <p className="wa-bubble-text">{formatText(msg.text)}</p>
                  <span className="wa-bubble-time">{msg.time}</span>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="wa-message-wrapper bot">
                <div className="wa-chat-bubble wa-typing-bubble">
                  <div className="wa-typing-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Chat Box Footer / Action */}
        <form className="wa-chat-footer" onSubmit={handleSendMessage}>
          <input
            type="text"
            className="wa-chat-input"
            placeholder="Type a message..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button type="submit" className="wa-send-btn" disabled={!inputValue.trim()}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </button>
        </form>
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
          suppressHydrationWarning
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
