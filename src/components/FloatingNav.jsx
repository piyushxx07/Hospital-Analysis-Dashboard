import React from 'react';
import { Sparkles } from 'lucide-react';
import './FloatingNav.css';

const FloatingNav = () => {
  return (
    <div className="floating-nav-wrapper">
      <nav className="floating-nav glass">
        <div className="nav-brand">
          <Sparkles size={16} />
          <span>AgentReady</span>
        </div>
        
        <div className="nav-links">
          <a href="#features">Features</a>
          <a href="#use-cases">Use Cases</a>
          <a href="#pricing">Pricing</a>
        </div>
        
        <button className="nav-cta">
          Get Started
        </button>
      </nav>
    </div>
  );
};

export default FloatingNav;
