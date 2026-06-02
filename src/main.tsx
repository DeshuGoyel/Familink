import React from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

const rootElement = document.getElementById('root')!;

// Only hydrate if the root has children AND it's not just the preloader
const hasPreloader = rootElement.querySelector('.app-preloader');
if (rootElement.hasChildNodes() && !hasPreloader) {
  hydrateRoot(rootElement, <React.StrictMode><App /></React.StrictMode>);
} else {
  createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  )
}
