# cpress_e2e_opencart
This reporsitory has an Automated end-to-end testing suite for [OpenCart](https://www.opencart.com/) using Cypress — aimed at validating key user flows like product browsing, cart operations, and checkout(WIP). 

# About NaveenAutomationLabs-Opencart portal
[opencart](https://naveenautomationlabs.com/opencart/)This a live demo e-commerce platform built on OpenCart, provided by Naveen AutomationLabs. It simulates a real online store with features like user registration, login, product browsing, search, cart, and checkout — making it ideal for practicing frontend and backend Cypress automation testing in realistic shopping workflows.

This project includes:
- [x] Page Object Model based Framework  
- [x] `it()` blocks include logs and response error validations 
- [x] independent execution of each tests in `describe()` block through `beforeEach()` and `after()` hooks  
- [x] Secure handling of secrets using GitHub Secrets in Workflows
- [x] Tag based Test isolation on CI/CD Pipeline for Smoke, E2E, new Feature etc. based tests using grep plugin (`cypress-grep/src/plugin`)
- [x] Mochawesome reporting (`cypress-mochawesome-reporter/`)
- [x] Isolated Workflows based on test tags for parallel execution and report publishing 
- [x] API Test Coverage through `cy.request()` and `cy.intercept()`
- [x] UI Coverage
- [ ] Complete functional flow of an ecommerce application (This is a WIP)

# Project setup
[```git clone https://github.com/chandreyee729/cpress_e2e_opencart.git
cd cpress_e2e_opencart
npm install```]

# Run Tests
Install cypress: `npm install cypress --save -dev`
Open cypress: `npx cypress open`
Headless run: `npx cypress run`

# Reporting
install packages if reporter is not downloaded:
`npm install --save-dev mochawesome mochawesome-merge mochawesome-report-generator`
`npm install --save-dev cypress cypress-mochawesome-reporter`
After test execution merge json reports
`npx mochawesome-merge cypress/reports/*.json > cypress/reports/merged-report.json`
generate HTML report:
`npx marge cypress/reports/merged-report.json --reportDir cypress/reports --reportFilename final-report`


# Reports are isolated based on tags and published on different webpages
Test Reports are published in https://chandreyee729.github.io/cpress_e2e_opencart/

Created By
Chandreyee Chakraborty
GitHub: @chandreyee729
