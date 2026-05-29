import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import MainWebsite from './pages/MainWebsite';
import { AnalyticsProvider } from './components/seo/Analytics';

function App() {
  return (
    <Router>
      <AnalyticsProvider>
        <MainWebsite />
      </AnalyticsProvider>
    </Router>
  );
}

export default App;
