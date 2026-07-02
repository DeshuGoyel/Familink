import { Before, After, BeforeAll, AfterAll, Status, setDefaultTimeout } from '@cucumber/cucumber';
import { ICustomWorld } from './world';
import * as fs from 'fs';

// Set default step timeout to 30 seconds
setDefaultTimeout(30000);

// Create reports directories if not exists
BeforeAll(async function () {
  const dirs = ['e2e/reports', 'e2e/reports/screenshots', 'e2e/reports/videos'];
  dirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });
});

// Initialize browser before each scenario
Before(async function (this: ICustomWorld) {
  await this.init();
});

// Take screenshot on failure
After(async function (this: ICustomWorld, scenario) {
  if (scenario.result?.status === Status.FAILED) {
    const scenarioName = scenario.pickle.name.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const screenshotPath = `e2e/reports/screenshots/${scenarioName}_${timestamp}.png`;

    try {
      const screenshot = await this.page.screenshot({ fullPage: true });
      await this.attach(screenshot, 'image/png');
      fs.writeFileSync(screenshotPath, screenshot);
      console.log(`Screenshot saved: ${screenshotPath}`);
    } catch (err) {
      console.error('Failed to take screenshot:', err);
    }
  }

  // Destroy browser after each scenario
  await this.destroy();
});

AfterAll(async function () {
  console.log('\n✅ Test suite completed!');
  console.log('📁 Reports available at: e2e/reports/');
});
