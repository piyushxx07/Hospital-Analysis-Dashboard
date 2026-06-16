import React from 'react';
import { ArrowRight, Sparkles, Clock, MessageCircle, Lock } from 'lucide-react';
import './Sidebar.css';

const menuItems = [
  { id: 'morning_briefing', label: 'Morning Briefing', num: '01' },
  { id: 'catch_up', label: 'Catch Up', num: '02' },
  { id: 'action_plan', label: 'Action Plan', num: '03' },
  { id: 'deep_work', label: 'Deep Work', num: '04' },
  { id: 'inbox', label: 'Inbox', num: '05' },
  { id: 'meeting_prep', label: 'Meeting Prep', num: '06' },
  { id: 'daily_recap', label: 'Daily Recap', num: '07' },
];

const Sidebar = ({ activeTab, setActiveTab }) => {
  return (
    <div className="sidebar-container">
      <div className="sidebar-top">
        <p className="intro-text">Introducing AgentReady</p>
        <h1 className="bold-headline">
          The AI coworker<br />that never sleeps.
        </h1>
        
        <ul className="feature-list">
          <li>
            <Sparkles size={16} className="icon" />
            Helps you get work done across 30+ apps
          </li>
          <li>
            <Clock size={16} className="icon" />
            Drafts emails and preps meetings around the clock
          </li>
          <li>
            <MessageCircle size={16} className="icon" />
            Chat via iMessage, Slack, mobile, or web
          </li>
          <li>
            <Lock size={16} className="icon" />
            Enterprise-grade encryption — we never train on your data
          </li>
        </ul>
        
        <button className="pill-button mt-4">
          Get Started <ArrowRight size={16} />
        </button>
      </div>

      <div className="sidebar-bottom">
        <h2 className="menu-heading">What AgentReady handles for you</h2>
        <div className="menu-list">
          {menuItems.map((item) => (
            <div 
              key={item.id}
              className={`menu-item ${activeTab === item.id ? 'active' : ''}`}
              onClick={() => setActiveTab(item.id)}
            >
              <div className="menu-label">
                {activeTab === item.id && <div className="active-indicator"></div>}
                {item.label}
              </div>
              <span className="menu-num">{item.num}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
