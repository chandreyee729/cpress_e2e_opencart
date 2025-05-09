const { defineConfig } = require("cypress");
const mochawesome = require('cypress-mochawesome-reporter/plugin');

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    charts: true,
    reportPageTitle: 'My Test Report',
    reportDir: 'cypress/reports',
    inlineAssets: true,
    overwrite: true,
    html: true,
    json: true,
  },
  video: true,
  screenshotOnRunFailure: true,

  e2e: {
    specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",
    setupNodeEvents(on, config) {
      // implement node event listeners here
      mochawesome(on);
    },
  },
  env: {
    URL_LOGIN: 'https://naveenautomationlabs.com/opencart/index.php?route=account/login',
    URL_REGISTER: 'https://naveenautomationlabs.com/opencart/index.php?route=account/register',
    URL_HOMEPAGE: 'https://naveenautomationlabs.com/opencart/'
  }
});