const { defineConfig } = require('cypress');
const mochawesome = require('cypress-mochawesome-reporter/plugin');
const cypressGrep = require('cypress-grep/src/plugin');

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    charts: true,
    reportPageTitle: 'My Test Report',
    reportDir: 'cypress/reports/html',
    inlineAssets: true,
    overwrite: true,
    html: true,
    json: true,
  },
  video: true,
  screenshotOnRunFailure: true,

  e2e: {
    baseUrl: 'https://naveenautomationlabs.com/opencart',
    specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",
    setupNodeEvents(on, config) {
      mochawesome(on);
      cypressGrep(config); 
      return config;
    },
    experimentalRunAllSpecs : true
  },

  env: {
    grepFilterSpecs: true,
    grepOmitFiltered: true,
    URL_LOGIN: 'https://naveenautomationlabs.com/opencart/index.php?route=account/login',
    URL_REGISTER: 'https://naveenautomationlabs.com/opencart/index.php?route=account/register',
    URL_HOMEPAGE: 'https://naveenautomationlabs.com/opencart/'
  }
});
