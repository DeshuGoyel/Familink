const fs = require('fs');
const path = require('path');

const htmlFile = path.join(__dirname, 'TransferLegacy_Landing.html');
const cssFile = path.join(__dirname, 'src', 'landing.css');
const tsxFile = path.join(__dirname, 'src', 'pages', 'Landing.tsx');

const content = fs.readFileSync(htmlFile, 'utf-8');

// Extract CSS
const cssMatch = content.match(/<style>([\s\S]*?)<\/style>/);
if (cssMatch) {
  let css = cssMatch[1];
  fs.writeFileSync(cssFile, css);
}

// Extract body HTML
const bodyMatch = content.match(/<body>([\s\S]*?)<\/body>/);
if (bodyMatch) {
  let bodyHtml = bodyMatch[1];
  
  // Remove script tag at the end
  bodyHtml = bodyHtml.replace(/<script>[\s\S]*?<\/script>/, '');
  
  // Replace standard HTML attributes with React ones
  bodyHtml = bodyHtml.replace(/class=/g, 'className=');
  bodyHtml = bodyHtml.replace(/for=/g, 'htmlFor=');
  bodyHtml = bodyHtml.replace(/onclick=/g, 'onClick=');
  bodyHtml = bodyHtml.replace(/stroke-width=/g, 'strokeWidth=');
  bodyHtml = bodyHtml.replace(/fill-rule=/g, 'fillRule=');
  bodyHtml = bodyHtml.replace(/clip-rule=/g, 'clipRule=');
  bodyHtml = bodyHtml.replace(/stroke-linecap=/g, 'strokeLinecap=');
  bodyHtml = bodyHtml.replace(/stroke-linejoin=/g, 'strokeLinejoin=');
  bodyHtml = bodyHtml.replace(/viewbox=/gi, 'viewBox=');
  
  // Fix inline styles
  bodyHtml = bodyHtml.replace(/style="([^"]*)"/g, (match, styleString) => {
    const styleObj = {};
    styleString.split(';').forEach(rule => {
      const parts = rule.split(':');
      if (parts.length >= 2) {
        let key = parts[0].trim();
        let value = parts.slice(1).join(':').trim();
        if (key && value) {
          // CamelCase for React (unless it's a CSS variable)
          if (!key.startsWith('--')) {
            key = key.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
          }
          styleObj[key] = value;
        }
      }
    });
    return `style={${JSON.stringify(styleObj)}}`;
  });
  
  // Fix specific HTML structure to fit React
  bodyHtml = bodyHtml.replace(/<!--[\s\S]*?-->/g, ''); // Remove comments (some can cause issues if poorly placed)
  bodyHtml = bodyHtml.replace(/<br>/g, '<br/>');
  bodyHtml = bodyHtml.replace(/<hr>/g, '<hr/>');
  bodyHtml = bodyHtml.replace(/<input([^>]*?[^\/])>/g, '<input$1 />');
  bodyHtml = bodyHtml.replace(/<img([^>]*?[^\/])>/g, '<img$1 />');
  bodyHtml = bodyHtml.replace(/<rect([^>]*?[^\/])>/g, '<rect$1 />');
  bodyHtml = bodyHtml.replace(/<path([^>]*?[^\/])>/g, '<path$1 />');
  bodyHtml = bodyHtml.replace(/<circle([^>]*?[^\/])>/g, '<circle$1 />');
  bodyHtml = bodyHtml.replace(/<line([^>]*?[^\/])>/g, '<line$1 />');
  bodyHtml = bodyHtml.replace(/<polyline([^>]*?[^\/])>/g, '<polyline$1 />');
  bodyHtml = bodyHtml.replace(/<polygon([^>]*?[^\/])>/g, '<polygon$1 />');
  
  // Special logic for interactivity (FAQ, Features)
  // Let's just use raw html injection via dangerouslySetInnerHTML to ensure 100% fidelity without breaking JSX
  const reactComponent = `import React, { useEffect, useRef } from 'react';
import '../landing.css';

export default function Landing() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    // ── CURSOR ──
    const dot = document.getElementById('cur-dot');
    const ring = document.getElementById('cur-ring');
    const handleMouseMove = (e: MouseEvent) => {
      if (dot && ring) {
        dot.style.left = e.clientX + 'px';
        dot.style.top  = e.clientY + 'px';
        ring.style.left = e.clientX + 'px';
        ring.style.top  = e.clientY + 'px';
      }
    };
    document.addEventListener('mousemove', handleMouseMove);

    const handleMouseEnter = () => ring?.classList.add('hover');
    const handleMouseLeave = () => ring?.classList.remove('hover');
    document.querySelectorAll('button,a,[onclick],.faq-q').forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    // ── NAV SCROLL ──
    const handleScroll = () => {
      document.getElementById('navbar')?.classList.toggle('scrolled', window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);

    // ── SCROLL REVEAL ──
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // ── FAQ ──
    window.toggleFaq = (el: HTMLElement) => {
      const isOpen = el.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(f => f.classList.remove('open'));
      if (!isOpen) el.classList.add('open');
    };

    // ── FEATURE SWITCHER ──
    window.activateFeature = (n: number) => {
      [1,2,3,4].forEach(i => {
        const item = document.getElementById('f'+i);
        if (item) {
          if (i === n) item.classList.add('active');
          else item.classList.remove('active');
        }
        const p = document.getElementById('preview-'+i);
        if (p) p.style.display = i === n ? 'block' : 'none';
      });
    };

    // ── CTA ──
    window.handleCTA = () => {
      const emailInput = document.getElementById('cta-email') as HTMLInputElement;
      if (emailInput) {
        const email = emailInput.value;
        if (!email) { emailInput.style.borderColor = 'rgba(249,115,22,.6)'; return; }
        alert('Welcome to Transfer Legacy! We\\'ll be in touch at ' + email);
      }
    };

    // ── SMOOTH HOVER EFFECTS ──
    const cards = document.querySelectorAll('.price-card,.step-card,.test-card') as NodeListOf<HTMLElement>;
    cards.forEach(card => {
      card.addEventListener('mousemove', (e: Event) => {
        const mouseEvent = e as MouseEvent;
        const rect = card.getBoundingClientRect();
        const x = ((mouseEvent.clientX - rect.left) / rect.width - 0.5) * 6;
        const y = ((mouseEvent.clientY - rect.top) / rect.height - 0.5) * -6;
        card.style.transform = \`perspective(600px) rotateY(\${x}deg) rotateX(\${y}deg) translateY(-4px)\`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
        card.style.transition = 'transform .4s ease';
      });
      card.addEventListener('mouseenter', () => {
        card.style.transition = 'none';
      });
    });

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      document.querySelectorAll('button,a,[onclick],.faq-q').forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  const rawHtml = ${JSON.stringify(bodyMatch[1].replace(/<script>[\s\S]*?<\/script>/, ''))};

  return (
    <div ref={containerRef} dangerouslySetInnerHTML={{ __html: rawHtml }} />
  );
}

// Add these to window for the onclick handlers in raw HTML to work
declare global {
  interface Window {
    toggleFaq: (el: HTMLElement) => void;
    activateFeature: (n: number) => void;
    handleCTA: () => void;
  }
}
`;
  
  fs.writeFileSync(tsxFile, reactComponent);
}

console.log('Conversion completed.');
