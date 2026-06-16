import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import MainDisplay from './components/MainDisplay';
import FloatingNav from './components/FloatingNav';

function App() {
  const [activeTab, setActiveTab] = useState('morning_briefing');

  return (
    <div className="app-layout">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <MainDisplay activeTab={activeTab} />
      <FloatingNav />
    </div>
  );
}

export default App;
