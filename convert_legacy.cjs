const fs = require('fs');
const path = require('path');

const basePath = path.resolve(__dirname);

const htmlFile = path.normalize(path.resolve(basePath, 'TransferLegacy_Landing.html'));
const cssFile = path.normalize(path.resolve(basePath, 'src', 'landing.css'));
const tsxFile = path.normalize(path.resolve(basePath, 'src', 'pages', 'Landing.tsx'));

if (!htmlFile.startsWith(basePath) || !cssFile.startsWith(basePath) || !tsxFile.startsWith(basePath)) {
  throw new Error("Path traversal detected: attempt to access files outside the project directory.");
}

const content = fs.readFileSync(htmlFile, 'utf-8');

// Extract CSS
const cssMatch = content.match(/<style>([\s\S]*?)<\/style>/);
if (cssMatch) {
  let css = cssMatch[1];
  
  // Scope CSS under .landing-root container to prevent polluting global HTML tags like nav, footer, button, etc.
  const rootRules = [];
  let otherRules = css.replace(/:root\[data-theme="[^"]*"\]\s*\{[\s\S]*?\}/g, (match) => {
    rootRules.push(match);
    return '';
  });
  
  otherRules = otherRules.replace(/\bbody\s*\{/g, '.landing-root {');
  otherRules = otherRules.replace(/\bhtml\s*\{/g, '.landing-root {');
  
  const scopedCss = `${rootRules.join('\n')}\n\n.landing-root {\n${otherRules}\n}`;
  fs.writeFileSync(cssFile, scopedCss);
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
  bodyHtml = bodyHtml.replace(/className="brand" href="#"/g, 'className="brand" href="/"');
  bodyHtml = bodyHtml.replace(/className="nav-signin" href="#"/g, 'className="nav-signin" href="/login"');

  const reactComponent = `import React, { useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';
import '../landing.css';

export default function Landing() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme, setTheme } = useTheme();

  // Sync next-themes state with the data-theme attribute on document root
  useEffect(() => {
    if (theme) {
      document.documentElement.setAttribute('data-theme', theme);
    }
  }, [theme]);

  useEffect(() => {
    if (!containerRef.current) return;

    // ── NAV SCROLL ──
    const handleScroll = () => {
      document.getElementById('nav')?.classList.toggle('scrolled', window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);

    // ── THEME TOGGLE ──
    const themeBtn = document.getElementById('themeBtn');
    const handleThemeClick = () => {
      setTheme(theme === 'dark' ? 'light' : 'dark');
    };
    themeBtn?.addEventListener('click', handleThemeClick);

    // ── SCROLL REVEAL ──
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => { 
        if (e.isIntersecting) {
          e.target.classList.add('in'); 
          observer.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('.rv').forEach(el => observer.observe(el));

    // ── FAQ ACCORDION ──
    const faqQuestions = document.querySelectorAll('.faq-q');
    const handleFaqClick = (e: Event) => {
      const q = e.currentTarget as HTMLElement;
      if (q && q.parentElement) {
        q.parentElement.classList.toggle('open');
      }
    };
    faqQuestions.forEach(q => q.addEventListener('click', handleFaqClick));

    // ── WAITLIST FORM CTA ──
    const heroForms = document.querySelectorAll('.hero-form');
    const handleFormSubmit = (e: Event) => {
      e.preventDefault();
      const form = e.currentTarget as HTMLFormElement;
      const input = form.querySelector('input') as HTMLInputElement;
      const email = input?.value;
      if (email) {
        alert('Welcome to Transfer Legacy! We\\'ll be in touch at ' + email);
      }
    };
    heroForms.forEach(form => form.addEventListener('submit', handleFormSubmit));

    // ── SMOOTH HOVER CARD TILT ──
    const cards = document.querySelectorAll('.plan,.prob,.tcard') as NodeListOf<HTMLElement>;
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
      window.removeEventListener('scroll', handleScroll);
      themeBtn?.removeEventListener('click', handleThemeClick);
      faqQuestions.forEach(q => q.removeEventListener('click', handleFaqClick));
      heroForms.forEach(form => form.removeEventListener('submit', handleFormSubmit));
    };
  }, [theme, setTheme]);

  const rawHtml = ${JSON.stringify(bodyMatch[1].replace(/<script>[\s\S]*?<\/script>/, ''))};

  return (
    <div ref={containerRef} className="landing-root" dangerouslySetInnerHTML={{ __html: rawHtml }} />
  );
}
`;
  
  fs.writeFileSync(tsxFile, reactComponent);
}

console.log('Conversion completed.');
