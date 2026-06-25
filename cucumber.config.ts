import { IConfiguration } from '@cucumber/cucumber';

const config: Partial<IConfiguration> = {
  paths: ['e2e/features/**/*.feature'],
  require: [
    'e2e/support/world.ts',
    'e2e/support/hooks.ts',
    'e2e/steps/**/*.steps.ts',
  ],
  requireModule: ['ts-node/register'],
  format: [
    'progress-bar',
    'html:e2e/reports/report.html',
    'json:e2e/reports/report.json',
  ],
  formatOptions: { snippetInterface: 'async-await' },
  publishQuiet: true,
  parallel: 1,
};

export default config;
