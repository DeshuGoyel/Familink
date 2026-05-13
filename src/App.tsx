import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import MainWebsite from './pages/MainWebsite';

function App() {
  return (
    <Router>
      <MainWebsite />
    </Router>
  );
}

export default App;
