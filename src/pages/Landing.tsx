import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import '../landing.css';

export default function Landing() {
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { isAuthenticated } = useStore();

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
        alert('Welcome to Transfer Legacy! We\'ll be in touch at ' + email);
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
        card.style.transform = `perspective(600px) rotateY(${x}deg) rotateX(${y}deg) translateY(-4px)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
        card.style.transition = 'transform .4s ease';
      });
      card.addEventListener('mouseenter', () => {
        card.style.transition = 'none';
      });
    });

    // ── NAVIGATION REDIRECTS ──
    const handleLogin = (e: Event) => {
      e.preventDefault();
      navigate('/login');
    };

    const handleSignup = (e: Event) => {
      e.preventDefault();
      navigate('/onboarding');
    };

    const handleContact = (e: Event) => {
      e.preventDefault();
      navigate('/contact');
    };

    const handleDashboard = (e: Event) => {
      e.preventDefault();
      navigate('/dashboard');
    };

    const handleDeveloper = (e: Event) => {
      e.preventDefault();
      navigate('/developer');
    };

    const handlePrivacy = (e: Event) => {
      e.preventDefault();
      navigate('/legal/privacy');
    };

    const handleTerms = (e: Event) => {
      e.preventDefault();
      navigate('/legal/terms');
    };

    const handleSecurity = (e: Event) => {
      e.preventDefault();
      navigate('/legal/security-architecture');
    };

    const handleCompliance = (e: Event) => {
      e.preventDefault();
      navigate('/legal/compliance');
    };

    // Bind Navbar CTA
    const signInBtn = containerRef.current.querySelector('.nav-cta .btn-ghost');
    signInBtn?.addEventListener('click', handleLogin);

    const getStartedBtn = containerRef.current.querySelector('.nav-cta .btn-primary');
    getStartedBtn?.addEventListener('click', handleSignup);

    // Bind Hero Actions
    const heroBtn = containerRef.current.querySelector('.hero-actions .btn-hero');
    heroBtn?.addEventListener('click', handleSignup);

    // Bind Pricing Cards
    const priceCards = containerRef.current.querySelectorAll('.price-card');
    priceCards.forEach((card, idx) => {
      const btn = card.querySelector('.btn-price');
      if (btn) {
        if (idx === 3) {
          btn.addEventListener('click', handleContact);
        } else {
          btn.addEventListener('click', handleSignup);
        }
      }
    });

    // Bind Footer Links
    const footerLinks = containerRef.current.querySelectorAll('footer a');
    footerLinks.forEach(link => {
      const text = link.textContent?.trim().toLowerCase();
      if (text === 'contact') {
        link.addEventListener('click', handleContact);
      } else if (text === 'dashboard') {
        link.addEventListener('click', handleDashboard);
      } else if (text === 'api & developers') {
        link.addEventListener('click', handleDeveloper);
      } else if (text === 'privacy policy' || text === 'privacy') {
        link.addEventListener('click', handlePrivacy);
      } else if (text === 'terms of service' || text === 'terms') {
        link.addEventListener('click', handleTerms);
      } else if (text === 'security') {
        link.addEventListener('click', handleSecurity);
      } else if (text === 'compliance') {
        link.addEventListener('click', handleCompliance);
      }
    });

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      document.querySelectorAll('button,a,[onclick],.faq-q').forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
      // Remove navigation listeners
      signInBtn?.removeEventListener('click', handleLogin);
      getStartedBtn?.removeEventListener('click', handleSignup);
      heroBtn?.removeEventListener('click', handleSignup);
      priceCards.forEach((card, idx) => {
        const btn = card.querySelector('.btn-price');
        if (btn) {
          if (idx === 3) {
            btn.removeEventListener('click', handleContact);
          } else {
            btn.removeEventListener('click', handleSignup);
          }
        }
      });
      footerLinks.forEach(link => {
        const text = link.textContent?.trim().toLowerCase();
        if (text === 'contact') {
          link.removeEventListener('click', handleContact);
        } else if (text === 'dashboard') {
          link.removeEventListener('click', handleDashboard);
        } else if (text === 'api & developers') {
          link.removeEventListener('click', handleDeveloper);
        } else if (text === 'privacy policy' || text === 'privacy') {
          link.removeEventListener('click', handlePrivacy);
        } else if (text === 'terms of service' || text === 'terms') {
          link.removeEventListener('click', handleTerms);
        } else if (text === 'security') {
          link.removeEventListener('click', handleSecurity);
        } else if (text === 'compliance') {
          link.removeEventListener('click', handleCompliance);
        }
      });
    };
  }, [navigate]);

  // ── Auth-aware CTA swap ──────────────────────────────────────────────────
  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const navCta = container.querySelector('.nav-cta') as HTMLElement | null;
    const heroActions = container.querySelector('.hero-actions') as HTMLElement | null;

    if (isAuthenticated) {
      // Replace nav buttons with a single 'Go to Dashboard' button
      if (navCta) {
        navCta.innerHTML = `
          <button class="btn-primary" id="nav-dashboard-btn"
            style="display:inline-flex;align-items:center;gap:8px">
            Go to Dashboard
            <svg viewBox="0 0 24 24" style="width:13px;height:13px;stroke:currentColor;stroke-width:2;fill:none">
              <line x1="5" y1="12" x2="19" y2="12"/>
              <polyline points="12 5 19 12 12 19"/>
            </svg>
          </button>
        `;
        navCta.querySelector('#nav-dashboard-btn')?.addEventListener('click', (e) => {
          e.preventDefault();
          navigate('/dashboard');
        });
      }
      // Replace hero primary CTA with dashboard button
      if (heroActions) {
        const primaryBtn = heroActions.querySelector('.btn-hero') as HTMLElement | null;
        if (primaryBtn) {
          primaryBtn.innerHTML = `
            Go to Dashboard
            <svg viewBox="0 0 24 24" style="width:16px;height:16px;stroke:currentColor;stroke-width:1.5;fill:none">
              <line x1="5" y1="12" x2="19" y2="12"/>
              <polyline points="12 5 19 12 12 19"/>
            </svg>
          `;
          // Remove old click handlers by cloning
          const clone = primaryBtn.cloneNode(true) as HTMLElement;
          primaryBtn.replaceWith(clone);
          clone.addEventListener('click', (e) => {
            e.preventDefault();
            navigate('/dashboard');
          });
        }
      }
    }
  }, [isAuthenticated, navigate]);

  const rawHtml = "\r\n\r\n<!-- Custom cursor -->\r\n<div class=\"cursor cursor-dot\" id=\"cur-dot\"></div>\r\n<div class=\"cursor cursor-ring\" id=\"cur-ring\"></div>\r\n\r\n<!-- ══════════════ NAV ══════════════ -->\r\n<nav id=\"navbar\">\r\n  <div class=\"nav-brand\">\r\n    <div class=\"nav-logo\"><svg viewBox=\"0 0 24 24\"><path d=\"M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z\"/></svg></div>\r\n    <div class=\"nav-name\">Transfer Legacy</div>\r\n  </div>\r\n  <div class=\"nav-links\">\r\n    <a href=\"#how\">How it works</a>\r\n    <a href=\"#features\">Features</a>\r\n    <a href=\"#pricing\">Pricing</a>\r\n    <a href=\"#faq\">FAQ</a>\r\n  </div>\r\n  <div class=\"nav-cta\">\r\n    <button class=\"btn-ghost\">Sign in</button>\r\n    <button class=\"btn-primary\">Get started free</button>\r\n  </div>\r\n</nav>\r\n\r\n<!-- ══════════════ HERO ══════════════ -->\r\n<section class=\"hero\">\r\n  <div class=\"orb orb1\"></div>\r\n  <div class=\"orb orb2\"></div>\r\n  <div class=\"orb orb3\"></div>\r\n\r\n  <div class=\"hero-eyebrow\">\r\n    <div class=\"eyebrow-dot\"></div>\r\n    <span class=\"eyebrow-text\">Now in early access · Founding tier open</span>\r\n  </div>\r\n\r\n  <h1 class=\"hero-h1\">\r\n    <span class=\"line1\">Your entire digital life.</span>\r\n    <span class=\"line2\">Protected. Organised.</span>\r\n    <span class=\"line3\">Passed on.</span>\r\n  </h1>\r\n\r\n  <p class=\"hero-sub\">\r\n    Bank accounts, passwords, files, photos, subscriptions — your family accesses everything in under 10 minutes. No technical knowledge required.\r\n  </p>\r\n\r\n  <div class=\"hero-actions\">\r\n    <button class=\"btn-hero\">\r\n      Protect your family\r\n      <svg viewBox=\"0 0 24 24\"><line x1=\"5\" y1=\"12\" x2=\"19\" y2=\"12\"/><polyline points=\"12 5 19 12 12 19\"/></svg>\r\n    </button>\r\n    <button class=\"btn-hero-ghost\">\r\n      <svg viewBox=\"0 0 24 24\"><circle cx=\"12\" cy=\"12\" r=\"10\"/><polygon points=\"10 8 16 12 10 16 10 8\"/></svg>\r\n      Watch 2-min demo\r\n    </button>\r\n  </div>\r\n\r\n  <div class=\"hero-trust\">\r\n    <div class=\"trust-item\"><svg viewBox=\"0 0 24 24\"><rect x=\"3\" y=\"11\" width=\"18\" height=\"11\" rx=\"2\"/><path d=\"M7 11V7a5 5 0 0110 0v4\"/></svg><span>Zero-knowledge encrypted</span></div>\r\n    <div class=\"trust-sep\"></div>\r\n    <div class=\"trust-item\"><svg viewBox=\"0 0 24 24\"><polyline points=\"20 6 9 17 4 12\"/></svg><span>No technical knowledge needed</span></div>\r\n    <div class=\"trust-sep\"></div>\r\n    <div class=\"trust-item\"><svg viewBox=\"0 0 24 24\"><path d=\"M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z\"/></svg><span>Your data — never ours</span></div>\r\n    <div class=\"trust-sep\"></div>\r\n    <div class=\"trust-item\"><svg viewBox=\"0 0 24 24\"><path d=\"M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2\"/><circle cx=\"9\" cy=\"7\" r=\"4\"/></svg><span>Guardian system</span></div>\r\n  </div>\r\n\r\n  <!-- Dashboard preview mockup -->\r\n  <div style=\"width:100%;max-width:880px;margin:72px auto 0;position:relative;z-index:2;animation:fadeUp 1.1s .6s ease both\">\r\n    <div style=\"background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.1);border-radius:20px;overflow:hidden;box-shadow:0 40px 120px rgba(0,0,0,.6)\">\r\n      <!-- Browser chrome -->\r\n      <div style=\"background:var(--bg2);padding:12px 20px;display:flex;align-items:center;gap:8px;border-bottom:1px solid var(--border)\">\r\n        <div style=\"display:flex;gap:5px\"><div style=\"width:11px;height:11px;border-radius:50%;background:#FF5F57\"></div><div style=\"width:11px;height:11px;border-radius:50%;background:#FEBC2E\"></div><div style=\"width:11px;height:11px;border-radius:50%;background:#28C840\"></div></div>\r\n        <div style=\"flex:1;background:rgba(255,255,255,.05);border:1px solid var(--border);border-radius:6px;padding:5px 14px;font-family:var(--fm);font-size:10px;color:var(--muted);max-width:260px;margin:0 auto\">app.transferlegacy.com</div>\r\n      </div>\r\n      <!-- App shell preview -->\r\n      <div style=\"display:grid;grid-template-columns:160px 1fr;min-height:420px;background:var(--bg)\">\r\n        <!-- Sidebar -->\r\n        <div style=\"background:var(--bg2);border-right:1px solid var(--border);padding:16px 10px\">\r\n          <div style=\"display:flex;align-items:center;gap:7px;margin-bottom:20px;padding:0 6px\">\r\n            <div style=\"width:20px;height:20px;background:rgba(249,115,22,.12);border:1px solid rgba(249,115,22,.3);border-radius:5px;display:flex;align-items:center;justify-content:center\"><svg width=\"10\" height=\"10\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"var(--or)\" stroke-width=\"2\"><path d=\"M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z\"/></svg></div>\r\n            <span style=\"font-family:var(--fh);font-size:.75rem;color:var(--white);font-weight:600\">Transfer Legacy</span>\r\n          </div>\r\n          <div style=\"display:flex;flex-direction:column;gap:2px\">\r\n            <div style=\"display:flex;align-items:center;gap:7px;padding:7px 9px;border-radius:6px;background:rgba(249,115,22,.1);border:1px solid rgba(249,115,22,.2)\">\r\n              <div style=\"width:11px;height:11px;border-radius:2px;border:1.5px solid var(--or)\"></div>\r\n              <span style=\"font-size:11px;color:var(--or);font-weight:500\">Dashboard</span>\r\n            </div>\r\n            <div style=\"display:flex;align-items:center;gap:7px;padding:7px 9px;border-radius:6px\">\r\n              <div style=\"width:11px;height:11px;border-radius:2px;border:1.5px solid var(--muted)\"></div>\r\n              <span style=\"font-size:11px;color:var(--muted)\">Asset Vault</span>\r\n            </div>\r\n            <div style=\"display:flex;align-items:center;gap:7px;padding:7px 9px;border-radius:6px\">\r\n              <div style=\"width:11px;height:11px;border-radius:2px;border:1.5px solid var(--muted)\"></div>\r\n              <span style=\"font-size:11px;color:var(--muted)\">Guardians</span>\r\n            </div>\r\n            <div style=\"display:flex;align-items:center;gap:7px;padding:7px 9px;border-radius:6px\">\r\n              <div style=\"width:11px;height:11px;border-radius:2px;border:1.5px solid var(--muted)\"></div>\r\n              <span style=\"font-size:11px;color:var(--muted)\">Trust Center</span>\r\n            </div>\r\n            <div style=\"display:flex;align-items:center;gap:7px;padding:7px 9px;border-radius:6px\">\r\n              <div style=\"width:11px;height:11px;border-radius:2px;border:1.5px solid var(--muted)\"></div>\r\n              <span style=\"font-size:11px;color:var(--muted)\">Analytics</span>\r\n            </div>\r\n          </div>\r\n        </div>\r\n        <!-- Dashboard content -->\r\n        <div style=\"padding:24px\">\r\n          <div style=\"display:flex;align-items:center;gap:6px;margin-bottom:10px\">\r\n            <div style=\"width:6px;height:6px;border-radius:50%;background:var(--or);animation:pulse 2s ease-in-out infinite\"></div>\r\n            <span style=\"font-family:var(--fm);font-size:8.5px;letter-spacing:.12em;color:var(--or);text-transform:uppercase\">Institutional Access Live</span>\r\n          </div>\r\n          <div style=\"font-family:var(--fh);font-size:1.6rem;font-weight:500;color:var(--white);margin-bottom:4px\">Welcome back, <em style=\"font-style:italic;color:var(--gold2)\">Deshu</em></div>\r\n          <div style=\"font-size:11px;color:var(--muted2);margin-bottom:18px\">Your succession protocol is active.</div>\r\n          <!-- Stat cards -->\r\n          <div style=\"display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-bottom:16px\">\r\n            <div style=\"background:var(--bg2);border:1px solid var(--border);border-radius:9px;padding:12px;text-align:center\">\r\n              <div style=\"font-family:var(--fm);font-size:7.5px;letter-spacing:.1em;color:var(--or);text-transform:uppercase;margin-bottom:5px\">Score</div>\r\n              <div style=\"font-family:var(--fh);font-size:1.4rem;font-weight:500;color:var(--white)\">51</div>\r\n            </div>\r\n            <div style=\"background:var(--bg2);border:1px solid var(--border);border-radius:9px;padding:12px;text-align:center\">\r\n              <div style=\"font-family:var(--fm);font-size:7.5px;letter-spacing:.1em;color:var(--muted);text-transform:uppercase;margin-bottom:5px\">Assets</div>\r\n              <div style=\"font-family:var(--fh);font-size:1.4rem;font-weight:500;color:var(--white)\">9</div>\r\n            </div>\r\n            <div style=\"background:var(--bg2);border:1px solid var(--border);border-radius:9px;padding:12px;text-align:center\">\r\n              <div style=\"font-family:var(--fm);font-size:7.5px;letter-spacing:.1em;color:var(--muted);text-transform:uppercase;margin-bottom:5px\">Guardians</div>\r\n              <div style=\"font-family:var(--fh);font-size:1.4rem;font-weight:500;color:var(--white)\">0</div>\r\n            </div>\r\n            <div style=\"background:var(--bg2);border:1px solid var(--border);border-radius:9px;padding:12px;text-align:center\">\r\n              <div style=\"font-family:var(--fm);font-size:7.5px;letter-spacing:.1em;color:var(--muted);text-transform:uppercase;margin-bottom:5px\">Heirs</div>\r\n              <div style=\"font-family:var(--fh);font-size:1.4rem;font-weight:500;color:var(--white)\">2</div>\r\n            </div>\r\n          </div>\r\n          <!-- Mini vault row -->\r\n          <div style=\"background:var(--bg2);border:1px solid var(--border);border-radius:9px;padding:12px 14px;display:flex;align-items:center;justify-content:space-between;margin-bottom:8px\">\r\n            <div><div style=\"font-size:11px;font-weight:500;color:var(--white);margin-bottom:2px\">HDFC Savings Account</div><div style=\"font-size:9px;color:var(--muted)\">Bank account · Protected</div></div>\r\n            <div style=\"font-family:var(--fm);font-size:11px;color:var(--or2)\">₹2,40,000</div>\r\n          </div>\r\n          <div style=\"background:var(--bg2);border:1px solid var(--border);border-radius:9px;padding:12px 14px;display:flex;align-items:center;justify-content:space-between\">\r\n            <div><div style=\"font-size:11px;font-weight:500;color:var(--white);margin-bottom:2px\">Will & Testament</div><div style=\"font-size:9px;color:var(--muted)\">Legal document · Protected</div></div>\r\n            <div style=\"display:inline-flex;align-items:center;gap:4px;padding:2px 8px;border-radius:20px;background:rgba(34,197,94,.1);border:1px solid rgba(34,197,94,.2);font-size:9px;color:#4ade80\">Encrypted</div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n    <!-- Glow -->\r\n    <div style=\"position:absolute;bottom:-60px;left:50%;transform:translateX(-50%);width:60%;height:1px;background:linear-gradient(90deg,transparent,rgba(249,115,22,.3),transparent);filter:blur(8px)\"></div>\r\n  </div>\r\n</section>\r\n\r\n<!-- ══════════════ STATS ══════════════ -->\r\n<div class=\"stats-strip reveal\">\r\n  <div class=\"stat-item\"><div class=\"stat-num\">$<span>140</span>B</div><div class=\"stat-label\">Digital wealth permanently lost</div></div>\r\n  <div class=\"stat-item\"><div class=\"stat-num\"><span>4.9</span>B</div><div class=\"stat-label\">People with no digital estate plan</div></div>\r\n  <div class=\"stat-item\"><div class=\"stat-num\"><span>0</span></div><div class=\"stat-label\">Dominant solutions exist</div></div>\r\n  <div class=\"stat-item\"><div class=\"stat-num\"><span>10</span>m</div><div class=\"stat-label\">For your family to access everything</div></div>\r\n</div>\r\n\r\n<!-- ══════════════ PROBLEM ══════════════ -->\r\n<div class=\"problem-section\" id=\"problem\">\r\n<div class=\"problem-inner\">\r\n  <div class=\"section-eyebrow reveal\"><div class=\"section-dot\"></div><span class=\"section-tag\">The crisis nobody talks about</span></div>\r\n  <h2 class=\"section-h reveal\" style=\"max-width:620px\">The estate planning industry was built for a world that no longer exists.</h2>\r\n\r\n  <div class=\"story-quote reveal reveal-delay-1\">\r\n    <div class=\"story-text\">\"A man spent eleven years building $2.3 million in Bitcoin. He kept his seed phrase in his head — for security. He died. His wife found a Ledger in the drawer. She held it for an hour. She had no idea what it was. Every satoshi — gone forever.\"</div>\r\n    <div class=\"story-attr\">Real story · Digital inheritance crisis · 2024</div>\r\n  </div>\r\n\r\n  <p class=\"section-sub reveal\">This isn't just a crypto problem. Every person who dies leaves behind bank accounts, passwords, photos, subscriptions, online businesses — with no plan. Their family spends months fighting to access what was built. Most of it is lost.</p>\r\n\r\n  <div class=\"problem-grid reveal reveal-delay-1\">\r\n    <div class=\"prob-card\">\r\n      <div class=\"prob-accent\" style=\"background:var(--red,#EF4444)\"></div>\r\n      <div class=\"prob-num\">64<span style=\"font-size:1.4rem\">%</span></div>\r\n      <div class=\"prob-label\">of adults have no digital estate plan</div>\r\n      <div class=\"prob-sub\">They assume someone will figure it out. They won't — not without a plan, not without instructions, not without you.</div>\r\n    </div>\r\n    <div class=\"prob-card\">\r\n      <div class=\"prob-accent\" style=\"background:var(--or)\"></div>\r\n      <div class=\"prob-num\">100<span style=\"font-size:1.4rem\">M+</span></div>\r\n      <div class=\"prob-label\">accounts permanently locked every year</div>\r\n      <div class=\"prob-sub\">Bank accounts, email, photos, businesses, crypto. Not hacked. Not stolen. Just gone — because no plan existed.</div>\r\n    </div>\r\n    <div class=\"prob-card\">\r\n      <div class=\"prob-accent\" style=\"background:var(--gold)\"></div>\r\n      <div class=\"prob-num\">$<span style=\"font-size:2rem\">500</span>B</div>\r\n      <div class=\"prob-label\">industry built for physical assets only</div>\r\n      <div class=\"prob-sub\">Traditional wills, password managers, insurance — none of them were designed for the digital world we live in today.</div>\r\n    </div>\r\n  </div>\r\n</div>\r\n</div>\r\n\r\n<!-- ══════════════ HOW IT WORKS ══════════════ -->\r\n<div class=\"how-section\" id=\"how\">\r\n  <div class=\"section-eyebrow reveal\"><div class=\"section-dot\"></div><span class=\"section-tag\">How it works</span></div>\r\n  <h2 class=\"section-h reveal\">Four things working together<br>for the first time.</h2>\r\n  <div class=\"steps-grid\">\r\n    <div class=\"step-card reveal reveal-delay-1\">\r\n      <div class=\"step-num\" style=\"background:rgba(249,115,22,.12);border:1px solid rgba(249,115,22,.2)\" data-num=\"\"></div>\r\n      <div style=\"width:44px;height:44px;border-radius:12px;background:rgba(249,115,22,.1);border:1px solid rgba(249,115,22,.2);display:flex;align-items:center;justify-content:center;margin-bottom:20px\">\r\n        <svg style=\"width:20px;height:20px;stroke:var(--or);stroke-width:1.5;fill:none\" viewBox=\"0 0 24 24\"><rect x=\"3\" y=\"11\" width=\"18\" height=\"11\" rx=\"2\"/><path d=\"M7 11V7a5 5 0 0110 0v4\"/></svg>\r\n      </div>\r\n      <div class=\"step-title\">The Vault</div>\r\n      <div class=\"step-body\">Zero-knowledge encrypted storage for bank credentials, passwords, seed phrases, files, photos, and digital access instructions. We never see your data.</div>\r\n    </div>\r\n    <div class=\"step-card reveal reveal-delay-2\">\r\n      <div style=\"width:44px;height:44px;border-radius:12px;background:rgba(217,119,6,.1);border:1px solid rgba(217,119,6,.2);display:flex;align-items:center;justify-content:center;margin-bottom:20px\">\r\n        <svg style=\"width:20px;height:20px;stroke:var(--gold2);stroke-width:1.5;fill:none\" viewBox=\"0 0 24 24\"><path d=\"M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2\"/><circle cx=\"9\" cy=\"7\" r=\"4\"/><path d=\"M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75\"/></svg>\r\n      </div>\r\n      <div class=\"step-title\">Guardian System</div>\r\n      <div class=\"step-body\">Designate 1–5 trusted guardians — your spouse, lawyer, adult child. They hold conditional access that activates only when needed. No technical knowledge required.</div>\r\n    </div>\r\n    <div class=\"step-card reveal reveal-delay-3\">\r\n      <div style=\"width:44px;height:44px;border-radius:12px;background:rgba(74,124,89,.12);border:1px solid rgba(74,124,89,.25);display:flex;align-items:center;justify-content:center;margin-bottom:20px\">\r\n        <svg style=\"width:20px;height:20px;stroke:var(--sage2);stroke-width:1.5;fill:none\" viewBox=\"0 0 24 24\"><path d=\"M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z\"/><polyline points=\"14 2 14 8 20 8\"/><line x1=\"16\" y1=\"13\" x2=\"8\" y2=\"13\"/><line x1=\"16\" y1=\"17\" x2=\"8\" y2=\"17\"/></svg>\r\n      </div>\r\n      <div class=\"step-title\">Transfer Guide</div>\r\n      <div class=\"step-body\">Step-by-step heir experience. Your family accesses everything in under 10 minutes — even if they've never heard of a seed phrase, a password manager, or a 2FA code.</div>\r\n    </div>\r\n    <div class=\"step-card reveal reveal-delay-4\">\r\n      <div style=\"width:44px;height:44px;border-radius:12px;background:rgba(59,130,246,.1);border:1px solid rgba(59,130,246,.2);display:flex;align-items:center;justify-content:center;margin-bottom:20px\">\r\n        <svg style=\"width:20px;height:20px;stroke:#60a5fa;stroke-width:1.5;fill:none\" viewBox=\"0 0 24 24\"><rect x=\"3\" y=\"3\" width=\"7\" height=\"7\" rx=\"1\"/><rect x=\"14\" y=\"3\" width=\"7\" height=\"7\" rx=\"1\"/><rect x=\"3\" y=\"14\" width=\"7\" height=\"7\" rx=\"1\"/><rect x=\"14\" y=\"14\" width=\"7\" height=\"7\" rx=\"1\"/></svg>\r\n      </div>\r\n      <div class=\"step-title\">Legacy Organiser</div>\r\n      <div class=\"step-body\">Living digital inventory — bank accounts, investments, subscriptions, domain names, online businesses, insurance policies. Updated by you, ready for your family.</div>\r\n    </div>\r\n  </div>\r\n</div>\r\n\r\n<!-- ══════════════ FEATURES ══════════════ -->\r\n<div class=\"features-section\" id=\"features\">\r\n<div class=\"features-inner\">\r\n  <div class=\"section-eyebrow reveal\"><div class=\"section-dot\"></div><span class=\"section-tag\">Platform features</span></div>\r\n  <h2 class=\"section-h reveal\">Everything your family needs.<br>Nothing they don't.</h2>\r\n  <div class=\"features-grid\">\r\n    <div class=\"feature-list\">\r\n      <div class=\"feature-item active\" id=\"f1\" onclick=\"activateFeature(1)\">\r\n        <div class=\"feature-icon\" style=\"background:rgba(249,115,22,.1)\"><svg style=\"stroke:var(--or)\" viewBox=\"0 0 24 24\"><rect x=\"3\" y=\"11\" width=\"18\" height=\"11\" rx=\"2\"/><path d=\"M7 11V7a5 5 0 0110 0v4\"/></svg></div>\r\n        <div class=\"feature-title\">Zero-knowledge encryption</div>\r\n        <div class=\"feature-body\">AES-256 client-side encryption. Your data is encrypted in your browser before it ever leaves your device. We are the safe, not the bank.</div>\r\n      </div>\r\n      <div class=\"feature-item\" id=\"f2\" onclick=\"activateFeature(2)\">\r\n        <div class=\"feature-icon\" style=\"background:rgba(217,119,6,.1)\"><svg style=\"stroke:var(--gold2)\" viewBox=\"0 0 24 24\"><path d=\"M22 11.08V12a10 10 0 11-5.93-9.14\"/><polyline points=\"22 4 12 14.01 9 11.01\"/></svg></div>\r\n        <div class=\"feature-title\">Proof of Life heartbeat</div>\r\n        <div class=\"feature-body\">Regular check-ins confirm you're active. If you stop responding, your guardians are notified and the succession process can begin.</div>\r\n      </div>\r\n      <div class=\"feature-item\" id=\"f3\" onclick=\"activateFeature(3)\">\r\n        <div class=\"feature-icon\" style=\"background:rgba(74,124,89,.12)\"><svg style=\"stroke:var(--sage2)\" viewBox=\"0 0 24 24\"><circle cx=\"18\" cy=\"5\" r=\"3\"/><circle cx=\"6\" cy=\"12\" r=\"3\"/><circle cx=\"18\" cy=\"19\" r=\"3\"/><line x1=\"8.59\" y1=\"13.51\" x2=\"15.42\" y2=\"17.49\"/><line x1=\"15.41\" y1=\"6.51\" x2=\"8.59\" y2=\"10.49\"/></svg></div>\r\n        <div class=\"feature-title\">Shamir's Secret Sharing</div>\r\n        <div class=\"feature-body\">Your vault key is cryptographically split across multiple guardians. No single guardian can access your vault alone — only a quorum together.</div>\r\n      </div>\r\n      <div class=\"feature-item\" id=\"f4\" onclick=\"activateFeature(4)\">\r\n        <div class=\"feature-icon\" style=\"background:rgba(59,130,246,.1)\"><svg style=\"stroke:#60a5fa\" viewBox=\"0 0 24 24\"><path d=\"M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22\"/></svg></div>\r\n        <div class=\"feature-title\">Works with everything</div>\r\n        <div class=\"feature-body\">Bank accounts, crypto, email, cloud storage, domain names, online businesses, subscriptions. Platform-agnostic — we work with every service.</div>\r\n      </div>\r\n    </div>\r\n    <!-- Feature preview -->\r\n    <div class=\"feature-preview reveal\" id=\"feature-preview\">\r\n      <!-- Preview 1 -->\r\n      <div id=\"preview-1\" class=\"preview-inner\">\r\n        <div style=\"width:72px;height:72px;border-radius:18px;background:rgba(249,115,22,.12);border:1px solid rgba(249,115,22,.25);display:flex;align-items:center;justify-content:center;margin:0 auto 20px\">\r\n          <svg style=\"width:34px;height:34px;stroke:var(--or);stroke-width:1.3;fill:none\" viewBox=\"0 0 24 24\"><rect x=\"3\" y=\"11\" width=\"18\" height=\"11\" rx=\"2\"/><path d=\"M7 11V7a5 5 0 0110 0v4\"/></svg>\r\n        </div>\r\n        <div style=\"font-family:var(--fh);font-size:1.5rem;color:var(--white);margin-bottom:8px\">AES-256 Encrypted</div>\r\n        <div style=\"font-size:13px;color:var(--muted2);line-height:1.65;margin-bottom:20px\">Client-side only. The server receives only encrypted ciphertext — never your keys, never your data.</div>\r\n        <div style=\"display:flex;flex-direction:column;gap:8px\">\r\n          <div style=\"background:var(--bg3);border:1px solid rgba(34,197,94,.2);border-radius:8px;padding:10px 14px;display:flex;align-items:center;justify-content:space-between\">\r\n            <span style=\"font-size:12px;color:var(--off)\">HDFC Savings</span>\r\n            <span style=\"font-family:var(--fm);font-size:10px;color:var(--sage2)\">●  ENCRYPTED</span>\r\n          </div>\r\n          <div style=\"background:var(--bg3);border:1px solid rgba(34,197,94,.2);border-radius:8px;padding:10px 14px;display:flex;align-items:center;justify-content:space-between\">\r\n            <span style=\"font-size:12px;color:var(--off)\">Gmail password</span>\r\n            <span style=\"font-family:var(--fm);font-size:10px;color:var(--sage2)\">●  ENCRYPTED</span>\r\n          </div>\r\n          <div style=\"background:var(--bg3);border:1px solid rgba(34,197,94,.2);border-radius:8px;padding:10px 14px;display:flex;align-items:center;justify-content:space-between\">\r\n            <span style=\"font-size:12px;color:var(--off)\">Will & Testament</span>\r\n            <span style=\"font-family:var(--fm);font-size:10px;color:var(--sage2)\">●  ENCRYPTED</span>\r\n          </div>\r\n        </div>\r\n      </div>\r\n      <!-- Preview 2 -->\r\n      <div id=\"preview-2\" class=\"preview-inner\" style=\"display:none\">\r\n        <div style=\"width:72px;height:72px;border-radius:18px;background:rgba(217,119,6,.1);border:1px solid rgba(217,119,6,.25);display:flex;align-items:center;justify-content:center;margin:0 auto 20px\">\r\n          <svg style=\"width:34px;height:34px;stroke:var(--gold2);stroke-width:1.3;fill:none\" viewBox=\"0 0 24 24\"><path d=\"M22 11.08V12a10 10 0 11-5.93-9.14\"/><polyline points=\"22 4 12 14.01 9 11.01\"/></svg>\r\n        </div>\r\n        <div style=\"font-family:var(--fh);font-size:1.5rem;color:var(--white);margin-bottom:8px\">6 Days Remaining</div>\r\n        <div style=\"font-size:13px;color:var(--muted2);line-height:1.65;margin-bottom:20px\">Regular heartbeats confirm you're active. Your guardians are only notified when you stop responding.</div>\r\n        <div style=\"background:var(--bg3);border:1px solid rgba(249,115,22,.2);border-radius:12px;padding:18px\">\r\n          <div style=\"display:flex;justify-content:space-between;margin-bottom:12px\"><span style=\"font-size:13px;color:var(--off)\">Proof of Life</span><span style=\"font-family:var(--fm);font-size:11px;color:var(--green)\">ACTIVE</span></div>\r\n          <div style=\"background:var(--bg4);border-radius:4px;height:6px;overflow:hidden;margin-bottom:10px\"><div style=\"width:20%;height:100%;background:linear-gradient(90deg,var(--or),var(--gold2));border-radius:4px\"></div></div>\r\n          <div style=\"font-size:11px;color:var(--muted)\">Next check-in required in 6 days</div>\r\n        </div>\r\n      </div>\r\n      <!-- Preview 3 -->\r\n      <div id=\"preview-3\" class=\"preview-inner\" style=\"display:none\">\r\n        <div style=\"width:72px;height:72px;border-radius:18px;background:rgba(74,124,89,.12);border:1px solid rgba(74,124,89,.25);display:flex;align-items:center;justify-content:center;margin:0 auto 20px\">\r\n          <svg style=\"width:34px;height:34px;stroke:var(--sage2);stroke-width:1.3;fill:none\" viewBox=\"0 0 24 24\"><circle cx=\"18\" cy=\"5\" r=\"3\"/><circle cx=\"6\" cy=\"12\" r=\"3\"/><circle cx=\"18\" cy=\"19\" r=\"3\"/><line x1=\"8.59\" y1=\"13.51\" x2=\"15.42\" y2=\"17.49\"/><line x1=\"15.41\" y1=\"6.51\" x2=\"8.59\" y2=\"10.49\"/></svg>\r\n        </div>\r\n        <div style=\"font-family:var(--fh);font-size:1.5rem;color:var(--white);margin-bottom:8px\">Guardian Network</div>\r\n        <div style=\"font-size:13px;color:var(--muted2);line-height:1.65;margin-bottom:20px\">Your key is split — 2-of-3 guardians needed. No single person can access your vault alone.</div>\r\n        <div style=\"display:grid;grid-template-columns:1fr 1fr;gap:8px\">\r\n          <div style=\"background:rgba(74,124,89,.08);border:1px solid rgba(74,124,89,.2);border-radius:8px;padding:12px;text-align:center\"><div style=\"font-size:12px;font-weight:500;color:var(--white);margin-bottom:2px\">Priya G.</div><div style=\"font-size:10px;color:var(--sage2)\">Key fragment 1</div></div>\r\n          <div style=\"background:rgba(74,124,89,.08);border:1px solid rgba(74,124,89,.2);border-radius:8px;padding:12px;text-align:center\"><div style=\"font-size:12px;font-weight:500;color:var(--white);margin-bottom:2px\">Rahul G.</div><div style=\"font-size:10px;color:var(--sage2)\">Key fragment 2</div></div>\r\n          <div style=\"background:var(--bg3);border:1px dashed var(--border);border-radius:8px;padding:12px;text-align:center;grid-column:span 2\"><div style=\"font-size:11px;color:var(--muted)\">+ Add third guardian to complete quorum</div></div>\r\n        </div>\r\n      </div>\r\n      <!-- Preview 4 -->\r\n      <div id=\"preview-4\" class=\"preview-inner\" style=\"display:none\">\r\n        <div style=\"width:72px;height:72px;border-radius:18px;background:rgba(59,130,246,.1);border:1px solid rgba(59,130,246,.2);display:flex;align-items:center;justify-content:center;margin:0 auto 20px\">\r\n          <svg style=\"width:34px;height:34px;stroke:#60a5fa;stroke-width:1.3;fill:none\" viewBox=\"0 0 24 24\"><rect x=\"3\" y=\"3\" width=\"7\" height=\"7\" rx=\"1\"/><rect x=\"14\" y=\"3\" width=\"7\" height=\"7\" rx=\"1\"/><rect x=\"3\" y=\"14\" width=\"7\" height=\"7\" rx=\"1\"/><rect x=\"14\" y=\"14\" width=\"7\" height=\"7\" rx=\"1\"/></svg>\r\n        </div>\r\n        <div style=\"font-family:var(--fh);font-size:1.5rem;color:var(--white);margin-bottom:8px\">All Asset Types</div>\r\n        <div style=\"font-size:13px;color:var(--muted2);line-height:1.65;margin-bottom:18px\">Every digital asset type you own — in one place.</div>\r\n        <div style=\"display:flex;flex-wrap:wrap;gap:6px;justify-content:center\">\r\n          <span style=\"padding:5px 12px;border-radius:20px;font-size:11.5px;color:var(--off);background:var(--bg3);border:1px solid var(--border)\">Bank accounts</span>\r\n          <span style=\"padding:5px 12px;border-radius:20px;font-size:11.5px;color:var(--off);background:var(--bg3);border:1px solid var(--border)\">Passwords</span>\r\n          <span style=\"padding:5px 12px;border-radius:20px;font-size:11.5px;color:var(--off);background:var(--bg3);border:1px solid var(--border)\">Crypto</span>\r\n          <span style=\"padding:5px 12px;border-radius:20px;font-size:11.5px;color:var(--off);background:var(--bg3);border:1px solid var(--border)\">Photos & files</span>\r\n          <span style=\"padding:5px 12px;border-radius:20px;font-size:11.5px;color:var(--off);background:var(--bg3);border:1px solid var(--border)\">Domain names</span>\r\n          <span style=\"padding:5px 12px;border-radius:20px;font-size:11.5px;color:var(--off);background:var(--bg3);border:1px solid var(--border)\">Online businesses</span>\r\n          <span style=\"padding:5px 12px;border-radius:20px;font-size:11.5px;color:var(--off);background:var(--bg3);border:1px solid var(--border)\">Subscriptions</span>\r\n          <span style=\"padding:5px 12px;border-radius:20px;font-size:11.5px;color:var(--off);background:var(--bg3);border:1px solid var(--border)\">Insurance</span>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n</div>\r\n\r\n<!-- ══════════════ PRICING ══════════════ -->\r\n<div class=\"pricing-section\" id=\"pricing\">\r\n  <div class=\"section-eyebrow reveal\"><div class=\"section-dot\"></div><span class=\"section-tag\">Simple pricing</span></div>\r\n  <h2 class=\"section-h reveal\">One plan for your entire family.<br>No hidden fees. Ever.</h2>\r\n  <div class=\"pricing-grid\">\r\n    <div class=\"price-card reveal reveal-delay-1\">\r\n      <div class=\"price-badge\" style=\"background:rgba(255,255,255,.06);color:var(--muted2);border:1px solid var(--border)\">ESSENTIAL</div>\r\n      <div class=\"price-name\">For individuals</div>\r\n      <div class=\"price-val\">$99</div>\r\n      <div class=\"price-per\">per year</div>\r\n      <div class=\"price-sep\"></div>\r\n      <div class=\"price-features\">\r\n        <div class=\"pf-item\"><svg viewBox=\"0 0 24 24\"><polyline points=\"20 6 9 17 4 12\"/></svg>1 vault</div>\r\n        <div class=\"pf-item\"><svg viewBox=\"0 0 24 24\"><polyline points=\"20 6 9 17 4 12\"/></svg>2 trusted guardians</div>\r\n        <div class=\"pf-item\"><svg viewBox=\"0 0 24 24\"><polyline points=\"20 6 9 17 4 12\"/></svg>Basic heir guide</div>\r\n        <div class=\"pf-item\"><svg viewBox=\"0 0 24 24\"><polyline points=\"20 6 9 17 4 12\"/></svg>Email support</div>\r\n      </div>\r\n      <button class=\"btn-price\">Get started</button>\r\n    </div>\r\n    <div class=\"price-card featured reveal reveal-delay-2\">\r\n      <div class=\"price-badge\" style=\"background:rgba(249,115,22,.15);color:var(--or2);border:1px solid rgba(249,115,22,.3)\">FOUNDING · MOST POPULAR</div>\r\n      <div class=\"price-name\">For founding members</div>\r\n      <div class=\"price-val\" style=\"color:var(--gold2)\">$149</div>\r\n      <div class=\"price-per\" style=\"color:var(--or)\">per year · locked forever</div>\r\n      <div class=\"price-sep\"></div>\r\n      <div class=\"price-features\">\r\n        <div class=\"pf-item\"><svg viewBox=\"0 0 24 24\"><polyline points=\"20 6 9 17 4 12\"/></svg>5 trusted guardians</div>\r\n        <div class=\"pf-item\"><svg viewBox=\"0 0 24 24\"><polyline points=\"20 6 9 17 4 12\"/></svg>Priority support</div>\r\n        <div class=\"pf-item\"><svg viewBox=\"0 0 24 24\"><polyline points=\"20 6 9 17 4 12\"/></svg>Founding badge</div>\r\n        <div class=\"pf-item\"><svg viewBox=\"0 0 24 24\"><polyline points=\"20 6 9 17 4 12\"/></svg>Price locked forever</div>\r\n        <div class=\"pf-item\"><svg viewBox=\"0 0 24 24\"><polyline points=\"20 6 9 17 4 12\"/></svg>Roadmap input</div>\r\n      </div>\r\n      <button class=\"btn-price btn-price-or\">Claim founding price</button>\r\n    </div>\r\n    <div class=\"price-card reveal reveal-delay-3\">\r\n      <div class=\"price-badge\" style=\"background:rgba(59,130,246,.1);color:#60a5fa;border:1px solid rgba(59,130,246,.2)\">FAMILY</div>\r\n      <div class=\"price-name\">For families</div>\r\n      <div class=\"price-val\">$249</div>\r\n      <div class=\"price-per\">per year</div>\r\n      <div class=\"price-sep\"></div>\r\n      <div class=\"price-features\">\r\n        <div class=\"pf-item\"><svg viewBox=\"0 0 24 24\"><polyline points=\"20 6 9 17 4 12\"/></svg>3 family vaults</div>\r\n        <div class=\"pf-item\"><svg viewBox=\"0 0 24 24\"><polyline points=\"20 6 9 17 4 12\"/></svg>10 guardians</div>\r\n        <div class=\"pf-item\"><svg viewBox=\"0 0 24 24\"><polyline points=\"20 6 9 17 4 12\"/></svg>Video heir guides</div>\r\n        <div class=\"pf-item\"><svg viewBox=\"0 0 24 24\"><polyline points=\"20 6 9 17 4 12\"/></svg>Dedicated onboarding</div>\r\n      </div>\r\n      <button class=\"btn-price\">Get started</button>\r\n    </div>\r\n    <div class=\"price-card reveal reveal-delay-4\">\r\n      <div class=\"price-badge\" style=\"background:rgba(139,92,246,.1);color:#a78bfa;border:1px solid rgba(139,92,246,.2)\">ADVISOR</div>\r\n      <div class=\"price-name\">For estate lawyers</div>\r\n      <div class=\"price-val\">$499</div>\r\n      <div class=\"price-per\">per year</div>\r\n      <div class=\"price-sep\"></div>\r\n      <div class=\"price-features\">\r\n        <div class=\"pf-item\"><svg viewBox=\"0 0 24 24\"><polyline points=\"20 6 9 17 4 12\"/></svg>Unlimited client links</div>\r\n        <div class=\"pf-item\"><svg viewBox=\"0 0 24 24\"><polyline points=\"20 6 9 17 4 12\"/></svg>White-label heir guides</div>\r\n        <div class=\"pf-item\"><svg viewBox=\"0 0 24 24\"><polyline points=\"20 6 9 17 4 12\"/></svg>Lawyer dashboard</div>\r\n        <div class=\"pf-item\"><svg viewBox=\"0 0 24 24\"><polyline points=\"20 6 9 17 4 12\"/></svg>Referral analytics</div>\r\n      </div>\r\n      <button class=\"btn-price\">Contact us</button>\r\n    </div>\r\n  </div>\r\n</div>\r\n\r\n<!-- ══════════════ TESTIMONIALS ══════════════ -->\r\n<div class=\"testimonials\">\r\n<div class=\"test-inner\">\r\n  <div class=\"section-eyebrow reveal\"><div class=\"section-dot\"></div><span class=\"section-tag\">Early members</span></div>\r\n  <h2 class=\"section-h reveal\">What founding members are saying.</h2>\r\n  <div class=\"test-grid\">\r\n    <div class=\"test-card reveal reveal-delay-1\">\r\n      <div class=\"test-stars\"><svg viewBox=\"0 0 24 24\"><polygon points=\"12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2\"/></svg><svg viewBox=\"0 0 24 24\"><polygon points=\"12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2\"/></svg><svg viewBox=\"0 0 24 24\"><polygon points=\"12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2\"/></svg><svg viewBox=\"0 0 24 24\"><polygon points=\"12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2\"/></svg><svg viewBox=\"0 0 24 24\"><polygon points=\"12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2\"/></svg></div>\r\n      <div class=\"test-quote\">\"I've been meaning to sort this out for years. My wife had no idea what accounts I held or how to access anything. Transfer Legacy is the first product that made this actually doable.\"</div>\r\n      <div class=\"test-author\"><div class=\"test-av\" style=\"background:rgba(249,115,22,.15);color:var(--or2)\">AK</div><div><div class=\"test-name\">Arjun K.</div><div class=\"test-role\">Software engineer · Bangalore</div></div></div>\r\n    </div>\r\n    <div class=\"test-card reveal reveal-delay-2\">\r\n      <div class=\"test-stars\"><svg viewBox=\"0 0 24 24\"><polygon points=\"12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2\"/></svg><svg viewBox=\"0 0 24 24\"><polygon points=\"12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2\"/></svg><svg viewBox=\"0 0 24 24\"><polygon points=\"12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2\"/></svg><svg viewBox=\"0 0 24 24\"><polygon points=\"12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2\"/></svg><svg viewBox=\"0 0 24 24\"><polygon points=\"12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2\"/></svg></div>\r\n      <div class=\"test-quote\">\"I'm an estate lawyer and my clients ask me every week about digital inheritance. I've been waiting for a product like this. The guardian system is exactly what I needed to recommend.\"</div>\r\n      <div class=\"test-author\"><div class=\"test-av\" style=\"background:rgba(74,124,89,.15);color:var(--sage2)\">SM</div><div><div class=\"test-name\">Sanya M.</div><div class=\"test-role\">Estate lawyer · Mumbai</div></div></div>\r\n    </div>\r\n    <div class=\"test-card reveal reveal-delay-3\">\r\n      <div class=\"test-stars\"><svg viewBox=\"0 0 24 24\"><polygon points=\"12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2\"/></svg><svg viewBox=\"0 0 24 24\"><polygon points=\"12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2\"/></svg><svg viewBox=\"0 0 24 24\"><polygon points=\"12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2\"/></svg><svg viewBox=\"0 0 24 24\"><polygon points=\"12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2\"/></svg><svg viewBox=\"0 0 24 24\"><polygon points=\"12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2\"/></svg></div>\r\n      <div class=\"test-quote\">\"My father passed away last year. It took us 14 months to access his accounts. I signed up for Transfer Legacy the same week. I won't put my kids through what we went through.\"</div>\r\n      <div class=\"test-author\"><div class=\"test-av\" style=\"background:rgba(59,130,246,.12);color:#60a5fa\">RV</div><div><div class=\"test-name\">Rohit V.</div><div class=\"test-role\">Entrepreneur · Delhi</div></div></div>\r\n    </div>\r\n  </div>\r\n</div>\r\n</div>\r\n\r\n<!-- ══════════════ FAQ ══════════════ -->\r\n<div class=\"faq-section\" id=\"faq\">\r\n  <div class=\"section-eyebrow reveal\"><div class=\"section-dot\"></div><span class=\"section-tag\">FAQ</span></div>\r\n  <h2 class=\"section-h reveal\">Questions you're probably thinking.</h2>\r\n  <div style=\"margin-top:48px\" id=\"faq-list\">\r\n    <div class=\"faq-item reveal\" onclick=\"toggleFaq(this)\"><div class=\"faq-q\"><div class=\"faq-question\">Can Transfer Legacy actually see my data?</div><div class=\"faq-icon\"><svg viewBox=\"0 0 24 24\"><line x1=\"12\" y1=\"5\" x2=\"12\" y2=\"19\"/><line x1=\"5\" y1=\"12\" x2=\"19\" y2=\"12\"/></svg></div></div><div class=\"faq-answer\">No. Everything is encrypted in your browser before it leaves your device using AES-256 encryption. We store only encrypted ciphertext. We have no ability to decrypt it — we never have your keys. We are the safe, not the bank.</div></div>\r\n    <div class=\"faq-item reveal reveal-delay-1\" onclick=\"toggleFaq(this)\"><div class=\"faq-q\"><div class=\"faq-question\">What happens if Transfer Legacy shuts down?</div><div class=\"faq-icon\"><svg viewBox=\"0 0 24 24\"><line x1=\"12\" y1=\"5\" x2=\"12\" y2=\"19\"/><line x1=\"5\" y1=\"12\" x2=\"19\" y2=\"12\"/></svg></div></div><div class=\"faq-answer\">Your encrypted data is always exportable. We also provide a self-hosted option and the open-source protocol specification so any technically capable person can access your data independently. Your family is never locked in.</div></div>\r\n    <div class=\"faq-item reveal reveal-delay-2\" onclick=\"toggleFaq(this)\"><div class=\"faq-q\"><div class=\"faq-question\">How does my family access everything when I'm gone?</div><div class=\"faq-icon\"><svg viewBox=\"0 0 24 24\"><line x1=\"12\" y1=\"5\" x2=\"12\" y2=\"19\"/><line x1=\"5\" y1=\"12\" x2=\"19\" y2=\"12\"/></svg></div></div><div class=\"faq-answer\">When 2-of-3 (or your configured quorum) guardians confirm the succession event, they can initiate the Transfer Guide — a plain-language, step-by-step process that walks any non-technical family member through accessing every asset you've stored. Average completion time: under 10 minutes.</div></div>\r\n    <div class=\"faq-item reveal reveal-delay-3\" onclick=\"toggleFaq(this)\"><div class=\"faq-q\"><div class=\"faq-question\">Is this only for crypto holders?</div><div class=\"faq-icon\"><svg viewBox=\"0 0 24 24\"><line x1=\"12\" y1=\"5\" x2=\"12\" y2=\"19\"/><line x1=\"5\" y1=\"12\" x2=\"19\" y2=\"12\"/></svg></div></div><div class=\"faq-answer\">Not at all. Transfer Legacy works for any digital asset — bank accounts, investment accounts, email, photos, online businesses, domain names, subscriptions, insurance policies, and yes, crypto too. If it's digital and valuable to your family, it belongs in your vault.</div></div>\r\n    <div class=\"faq-item reveal reveal-delay-4\" onclick=\"toggleFaq(this)\"><div class=\"faq-q\"><div class=\"faq-question\">What is the Proof of Life system?</div><div class=\"faq-icon\"><svg viewBox=\"0 0 24 24\"><line x1=\"12\" y1=\"5\" x2=\"12\" y2=\"19\"/><line x1=\"5\" y1=\"12\" x2=\"19\" y2=\"12\"/></svg></div></div><div class=\"faq-answer\">Proof of Life is a periodic check-in system. You confirm you're active every 30 days (configurable). If you stop responding, we alert your guardians with escalating notifications before any succession process begins. This prevents false triggers and gives you multiple opportunities to check in.</div></div>\r\n    <div class=\"faq-item reveal\" onclick=\"toggleFaq(this)\"><div class=\"faq-q\"><div class=\"faq-question\">What does the Founding Tier price lock mean?</div><div class=\"faq-icon\"><svg viewBox=\"0 0 24 24\"><line x1=\"12\" y1=\"5\" x2=\"12\" y2=\"19\"/><line x1=\"5\" y1=\"12\" x2=\"19\" y2=\"12\"/></svg></div></div><div class=\"faq-answer\">Founding members who sign up now at $149/year keep that price permanently — regardless of what we charge new users in the future. When we raise prices (which we will as the product matures), founding members are grandfathered in forever. It's our commitment to the people who believed in us early.</div></div>\r\n  </div>\r\n</div>\r\n\r\n<!-- ══════════════ CTA ══════════════ -->\r\n<div class=\"cta-section\">\r\n  <div class=\"cta-bg\"></div>\r\n  <div class=\"reveal\">\r\n    <div class=\"cta-h\">Every family deserves to inherit<br>the <em>digital life</em> their loved one built.</div>\r\n    <p class=\"cta-sub\">Set up in 10 minutes. Protected forever. Your family gets everything when they need it most.</p>\r\n    <div style=\"max-width:420px;margin:0 auto 28px\">\r\n      <div class=\"email-form\">\r\n        <input class=\"email-inp\" type=\"email\" placeholder=\"your@email.com\" id=\"cta-email\">\r\n        <button class=\"btn-hero\" style=\"white-space:nowrap;border-radius:9px;padding:13px 20px;font-size:14px\" onclick=\"handleCTA()\">Start free</button>\r\n      </div>\r\n    </div>\r\n    <p style=\"font-size:12.5px;color:var(--muted)\">No credit card required · 30-day free trial · Cancel anytime</p>\r\n  </div>\r\n</div>\r\n\r\n<!-- ══════════════ FOOTER ══════════════ -->\r\n<footer>\r\n<div class=\"footer-inner\">\r\n  <div class=\"footer-top\">\r\n    <div>\r\n      <div class=\"footer-brand\">\r\n        <div class=\"nav-logo\"><svg viewBox=\"0 0 24 24\"><path d=\"M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z\"/></svg></div>\r\n        <div class=\"nav-name\">Transfer Legacy</div>\r\n      </div>\r\n      <div class=\"footer-desc\">Digital estate planning for everyone. Your entire digital life — protected, organised, and passed on to the people you love.</div>\r\n    </div>\r\n    <div>\r\n      <div class=\"footer-col-title\">Product</div>\r\n      <div class=\"footer-links\">\r\n        <a href=\"#how\">How it works</a>\r\n        <a href=\"#features\">Features</a>\r\n        <a href=\"#pricing\">Pricing</a>\r\n        <a href=\"#\">Dashboard</a>\r\n        <a href=\"#\">API & Developers</a>\r\n      </div>\r\n    </div>\r\n    <div>\r\n      <div class=\"footer-col-title\">Company</div>\r\n      <div class=\"footer-links\">\r\n        <a href=\"#\">About</a>\r\n        <a href=\"#\">Blog</a>\r\n        <a href=\"#\">Careers</a>\r\n        <a href=\"#\">Press</a>\r\n        <a href=\"#\">Contact</a>\r\n      </div>\r\n    </div>\r\n    <div>\r\n      <div class=\"footer-col-title\">Legal</div>\r\n      <div class=\"footer-links\">\r\n        <a href=\"#\">Privacy Policy</a>\r\n        <a href=\"#\">Terms of Service</a>\r\n        <a href=\"#\">Security</a>\r\n        <a href=\"#\">Cookie Policy</a>\r\n        <a href=\"#\">Compliance</a>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  <div class=\"footer-bottom\">\r\n    <div class=\"footer-copy\">© 2026 Transfer Legacy. All rights reserved.</div>\r\n    <div class=\"footer-legal\">\r\n      <a href=\"#\">Privacy</a>\r\n      <a href=\"#\">Terms</a>\r\n      <a href=\"#\">Security</a>\r\n    </div>\r\n  </div>\r\n</div>\r\n</footer>\r\n\r\n\r\n";

  return (
    <div ref={containerRef} className="landing-page-root" dangerouslySetInnerHTML={{ __html: rawHtml }} />
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
