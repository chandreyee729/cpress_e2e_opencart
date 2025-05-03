const { defineConfig } = require("cypress");

module.exports = defineConfig({

  e2e: {
    specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  env: {
    URL_LOGIN: 'https://naveenautomationlabs.com/opencart/index.php?route=account/login',
    URL_REGISTER: 'https://naveenautomationlabs.com/opencart/index.php?route=account/register'
  }
});
