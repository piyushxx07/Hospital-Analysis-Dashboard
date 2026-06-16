import React from 'react';
import { Video, Sun, Layers } from 'lucide-react';
import './MainDisplay.css';

const contentMap = {
  morning_briefing: {
    heading: 'Morning Briefing',
    subtext: 'AgentReady collates overnight updates from your connected integrations into a single briefing so you start your day with clarity.',
    mockup: (
      <div className="mockup-content">
        <div className="mockup-badge">1.00</div>
        <div className="mockup-header-text">DUBAI 24°</div>
        <h2 className="mockup-greeting">
          Good Morning, <span className="mockup-highlight">Steve.</span>
          <br />
          You have <Video size={36} className="mockup-icon" /> 4 meetings
          <br />
          but a free <Sun size={36} className="mockup-icon" /> afternoon.
        </h2>
        
        <div className="mockup-divider">
          <Layers size={16} /> MORNING BRIEFING
        </div>
        
        <p className="mockup-footer-text">
          12:30, then lunch with <span className="avatar-pill"><img src="https://ui-avatars.com/api/?name=Dana&background=random" alt="Dana" /> Dana</span> .
          <br />
          <span className="event-pill"><img src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Google_Calendar_icon_%282020%29.svg" alt="Calendar" className="cal-icon" /> Meridian off-prem call</span> this evening.
        </p>
      </div>
    )
  },
  catch_up: {
    heading: 'Catch Up',
    subtext: 'Quickly review the most important threads and messages you missed while you were away.',
    mockup: <div className="mockup-content"><h2 className="mockup-greeting">You're all caught up!</h2></div>
  },
  // Add fallback for others
};

const MainDisplay = ({ activeTab }) => {
  const content = contentMap[activeTab] || contentMap.morning_briefing;

  return (
    <div className="main-display-container">
      <div className="top-status-bar">
        <span className="location">MUMBAI</span>
        <button className="status-pill">
          AgentReady is winding down on May 20, 2026 &rarr;
        </button>
      </div>
      
      <div className="display-content-area">
        <h1 className="content-heading">{content.heading}</h1>
        <p className="content-subtext">{content.subtext}</p>
        
        <div className="mockup-window glass">
          {content.mockup}
        </div>
      </div>
    </div>
  );
};

export default MainDisplay;
