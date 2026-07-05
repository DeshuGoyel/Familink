# 🧪 Familink — Automation Test Framework

## Tech Stack
- **Playwright** — Browser automation
- **Cucumber.js** — BDD (Gherkin feature files)
- **TypeScript** — Type-safe step definitions
- **Page Object Model** — Reusable page interactions

---

## 📁 Folder Structure

```
e2e/
├── features/              ← Gherkin test cases (.feature files)
│   ├── smoke/             ← Master smoke tests
│   ├── auth/              ← Login, Forgot Password
│   ├── dashboard/         ← Dashboard tests
│   ├── assets/            ← Assets page tests
│   ├── heirs/             ← Heirs page tests
│   ├── guardians/         ← Guardians page tests
│   ├── allocations/       ← Allocations page tests
│   ├── settings/          ← Settings page tests
│   ├── memory-capsules/   ← Memory Capsules tests
│   ├── check-in/          ← Check-In Center tests
│   └── ai-planner/        ← AI Planner tests
├── pages/                 ← Page Object Model (reusable actions)
│   ├── BasePage.ts        ← Common methods
│   ├── LoginPage.ts       ← Login-specific actions
│   ├── DashboardPage.ts   ← Dashboard-specific actions
│   └── GenericPage.ts     ← Generic reusable actions
├── steps/
│   └── common.steps.ts    ← All step definitions
├── support/
│   ├── world.ts           ← Browser setup
│   └── hooks.ts           ← Before/After hooks + screenshots
└── reports/               ← Generated test reports (auto-created)
```

---

## ⚙️ Setup

### 1. Environment Variables
Copy `.env.test` and fill in real credentials:
```bash
BASE_URL=http://localhost:5173
TEST_EMAIL=your-test-account@email.com
TEST_PASSWORD=YourPassword123!
HEADLESS=true
```

### 2. Load env before running tests (Windows PowerShell):
```powershell
Get-Content .env.test | ForEach-Object {
  if ($_ -match '^([^#][^=]+)=(.*)$') {
    [System.Environment]::SetEnvironmentVariable($matches[1], $matches[2])
  }
}
```

---

## 🚀 Running Tests

| Command | Description |
|---------|-------------|
| `npm run test:smoke` | Run only smoke tests (fastest) |
| `npm run test:e2e` | Run ALL test cases |
| `npm run test:auth` | Run only auth tests (Login, Forgot Password) |
| `npm run test:headed` | Run with browser visible (for debugging) |
| `npm run test:report` | Run tests + generate HTML report |

---

## 📊 Reports

After running tests, reports are saved at:
- **HTML Report**: `e2e/reports/report.html` (open in browser)
- **JSON Report**: `e2e/reports/report.json`
- **Screenshots** (on failure): `e2e/reports/screenshots/`

---

## ✍️ How to Add a New Test Case

1. Open the relevant `.feature` file in `e2e/features/`
2. Add a new `Scenario:` block in Gherkin format:
```gherkin
Scenario: My new test case
  Given I am logged in
  When I navigate to "/my-page"
  Then the page should load without errors
```
3. If a new step is needed, add it to `e2e/steps/common.steps.ts`

---

## 🔍 VS Code Extensions (Install These)

1. **Cucumber (Gherkin) Full Support** — by Alexander Krechik
2. **Playwright Test for VS Code** — by Microsoft

---

## 📝 Test Tags

| Tag | Feature Files |
|-----|--------------|
| `@smoke` | smoke/smoke.feature |
| `@auth` | auth/login.feature, auth/forgot-password.feature |
| `@dashboard` | dashboard/dashboard.feature |
| `@assets` | assets/assets.feature |
| `@heirs` | heirs/heirs.feature |
| `@guardians` | guardians/guardians.feature |
| `@settings` | settings/settings.feature |
| `@memory-capsules` | memory-capsules/memory-capsules.feature |
| `@checkin` | check-in/check-in.feature |
| `@ai-planner` | ai-planner/ai-planner.feature |
