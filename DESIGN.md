# Design System: Transfer Legacy
**Project ID:** 18429125869773387925

## 1. Visual Theme & Atmosphere
The Transfer Legacy visual theme is a dark, premium, "glassmorphism" aesthetic designed to convey maximum security, trust, and sophistication. The atmosphere is sleek, rich, and highly refined, utilizing deep-green and charcoal backdrops punctuated by warm orange and gold accents. Subtle micro-interactions, custom interactive cursors, and organic drifting ambient glow orbs create a dynamic, modern, and immersive feel that makes a traditionally morbid topic (inheritance planning) feel premium, inviting, and secure.

## 2. Color Palette & Roles
*   **Deep Dark Jade-Black (#080B0A):** The primary background color (`--bg`). Used for overall page background to create a dark, focused canvas.
*   **Deep Sage-Forest Charcoal (#0F1410):** The secondary background color (`--bg2`). Used for structural sections (stats strip, features, testimonials, footer) to group content.
*   **Muted Forest Gray (#161C17):** The tertiary background color (`--bg3`). Used for card hovers and elevated panels.
*   **Elevated Charcoal-Sage (#1E261F):** The quaternary background color (`--bg4`). Used for progress bar tracks and deep inner elements.
*   **Vibrant Rust-Orange (#F97316):** The primary brand/accent color (`--or`). Used for high-emphasis buttons, active status dots, eyebrows, and primary actions.
*   **Soft Amber-Orange (#FB923C):** The secondary accent color (`--or2`). Used for button hover states and highlight text.
*   **Warm Gold (#D97706):** The secondary brand color (`--gold`). Used for accent borders, quote accents, and warning badges.
*   **Bright Amber-Gold (#F59E0B):** The bright gold accent color (`--gold2`). Used for highlighted italic words and active star ratings.
*   **Deep Sage-Green (#4A7C59):** The primary green accent color (`--sage`). Used for secondary trust metrics and secure branding.
*   **Luminous Sage-Green (#6FAE84):** The secondary green accent color (`--sage2`). Used for success icons, encryption status labels, and secure checkmarks.
*   **Pure White (#FFFFFF):** The standard white text color (`--white`). Used for headings and primary labels.
*   **Ice-White (#E8EDF0):** The primary body text color (`--off`). Used for high-readability body copy.
*   **Muted Steel-Gray (rgba(255,255,255,0.38)):** The low-contrast text color (`--muted`). Used for subtitles, labels, and timestamps.
*   **Muted Pearl-Gray (rgba(255,255,255,0.58)):** The mid-contrast text color (`--muted2`). Used for navigation links and descriptive secondary copy.
*   **Ghost-Line Border (rgba(255,255,255,0.07)):** The standard border color (`--border`). Used for subtle separators, cards, and input boundaries.

## 3. Typography Rules
*   **Headline Font:** 'Cormorant Garamond', serif (`--fh`). Used for large headlines, section headers, stats numbers, and italicized callouts to project a classic, authoritative, and trustworthy presence.
*   **Body Font:** 'DM Sans', sans-serif (`--fb`). Used for body text, paragraphs, buttons, and navigation for high legibility and a modern look.
*   **Monospace Font:** 'DM Mono', monospace (`--fm`). Used for eyebrow labels, tags, badge indicators, and stats labels to provide a technical, secure, and structured look.
*   **Typography Hierarchy & Letter-Spacing:**
    *   *Hero Heading:* Clamped size `3.5rem` to `7rem`, line-height `1.0`, letter-spacing `-0.01em`.
    *   *Section Title:* Clamped size `2.2rem` to `3.8rem`, line-height `1.1`.
    *   *Eyebrow/Tags:* 9px to 10px, uppercase, letter-spacing `0.14em`.
    *   *Paragraph/Body:* 13px to 18px, line-height `1.65` to `1.75`.

## 4. Component Stylings
*   **Buttons:**
    *   *Primary/Hero Button:* Rounded-8px (`rounded-[8px]`) or rounded-10px (`rounded-[10px]`), background color `#F97316` (Rust-Orange), white text. Features a subtle top-down semi-transparent overlay gradient. Hovers expand slightly and apply a soft glow shadow (`0 8px 24px rgba(249,115,22,.35)`).
    *   *Ghost Button:* Background transparent, border 1px solid `rgba(255,255,255,.15)` or `var(--border)`, muted gray text. Hovers transition to white text and a brighter border.
    *   *Pricing Button:* 100% width, transparent background, subtle border, transitioning to light background on hover.
*   **Cards/Containers:**
    *   *Standard Card (e.g., Step, Testimonial, Price Card):* Background `#0F1410` (Deep Sage-Forest Charcoal), border 1px solid `rgba(255,255,255,0.07)`. Corner roundness is 12px to 16px (`rounded-xl` or `rounded-2xl`). Cards feature interactive 3D parallax hover rotation effect and transition smoothly to background `#161C17`.
    *   *Featured Card:* Includes a border color of `rgba(249,115,22,.35)` and a subtle orange gradient backdrop fading to the card background.
*   **Inputs/Forms:**
    *   *Standard Input:* Background `rgba(255,255,255,.06)`, border 1px solid `rgba(255,255,255,.15)`, rounded corners 9px (`rounded-[9px]`), padded heavily. On focus, the border transitions to a glowing rust-orange `rgba(249,115,22,.5)`. Includes background blur (`backdrop-filter: blur(10px)`).

## 5. Layout Principles
*   **Spacing Strategy:** Section padding is set to a generous vertical spacing of `120px` (or `160px` for CTA) and horizontal padding of `60px` (`80px` / `24px` on mobile screens) to allow the visual elements and typography to breathe.
*   **Max Width:** Main container layouts are strictly constrained to a maximum width of `1280px` (`max-width: 1280px`) and centered.
*   **Grid System:** Responsive grids transition from 3 or 4 columns on large screens down to a single column on tablet/mobile views (`@media(max-width:900px)`), with horizontal separators disabled on smaller viewports.
