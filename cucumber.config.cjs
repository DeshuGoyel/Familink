module.exports = {
  default: {
    paths: ['e2e/features/**/*.feature'],
    import: [
      'e2e/support/world.ts',
      'e2e/support/hooks.ts',
      'e2e/steps/common.steps.ts',
    ],
    format: [
      'progress-bar',
      'html:e2e/reports/report.html',
      'json:e2e/reports/report.json',
    ],
    formatOptions: { snippetInterface: 'async-await' },
    parallel: 1,
  }
};
