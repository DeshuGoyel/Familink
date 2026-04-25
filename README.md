# Transfer Legacy

Protect the legacy. Transfer the access. The premier platform designed to securely and automatically transfer your digital footprint, crypto wallets, and vital assets to your family when it matters most.

*Transfer Legacy* solves the massive vulnerability in digital asset inheritance. Using heartbeat liveness detection, quorum (m-of-n) guardian logic, and advanced zero-knowledge client-side encryption, we ensure that what you've built isn't lost. 

## Features

- **Zero-Knowledge Architecture:** Cryptographic keys and passwords leave your device fully encrypted. We cannot view, access, or intercept your data.
- **M-of-N Guardian Governance:** Require multi-signature verification from designated trusted individuals to authorize the release of your vault.
- **Liveness Heartbeats:** Assets are only released after a verified system-detected period of inactivity and expiration of the grace period.
- **AI-Guided Setup & Transfer:** Ensure heirs—even those not digitally native—are guided step-by-step through the recovery process safely. 
- **Operations & CMS Portal:** A built-in operations center for managing waitlists, branded elements, audit trails, and the content management system.
- **Digital Passport:** A secure, portable web3-identity for managing heir privileges.

## Technology Stack

- **Frontend:** React 18, TypeScript, Vite
- **Styling:** Tailwind CSS
- **Animation & 3D:** Framer Motion, GSAP, Three.js, Spline
- **State Management:** Zustand
- **Architecture Concepts:** Zero-Knowledge Envelopes, OPAQUE Auth Protocol

## Local Development Setup

To work on Transfer Legacy locally, ensure you have Node.js installed, then follow the steps below:

1. **Clone the repository:**
   ```bash
   git clone <repo-url>
   cd Familink
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Copy the example environment file and customize it.
   ```bash
   cp .env.example .env
   ```

4. **Start the local development server:**
   ```bash
   npm run dev
   ```
   The application will become available at `http://localhost:5173`.

## Architecture & System Design

For an in-depth look into the threat models, sequence diagrams (OPAQUE Auth, Claim Initiation, Prewrapping), data flow components, and cryptography strategy, please read the [Detailed Technical Specifications](project-detailed.md).

## Backend

Temporary waitlist API (Supabase + Resend):

`git@github-vikash:ItsMeVikashKumarSingh/tl-temp-backend.git`

## License

(c) 2026 Transfer Legacy Global. All rights reserved.
