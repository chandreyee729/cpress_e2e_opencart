// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
  Cypress.Commands.add('addTestAttr', (selector, attrName, attrValue) => {
    cy.get(selector).invoke('attr', attrName, attrValue);
  });

  Cypress.Commands.add('addTestAttrByText', (selector, text, attrName, attrValue) => {
    cy.contains(selector, text)
      .should('exist') // Ensure element exists
      .invoke('attr', attrName, attrValue);
  });

 Cypress.Commands.add('login', (email, password) => { 
    cy.visit(Cypress.env('URL_LOGIN'));
    cy.get('#input-email').type(email);
    cy.get('#input-password').type(password, {
        log: false,        // Won't show in command log
        sensitive: true    // Won't show in videos/screenshots 
        })
    cy.contains('input[type = submit]','Login').click()    
  })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })