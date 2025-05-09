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
  cy.contains('input[type = submit]', 'Login').click()
})

Cypress.Commands.add('clearCart', () => {
  cy.addTestAttr('.btn.btn-inverse.btn-block.btn-lg.dropdown-toggle', 'cy-test', 'cart-item-shortcut');
  const removeCartItemElement = 'button[title="Remove"][onclick^="cart.remove"]';
  cy.get('[cy-test=cart-item-shortcut]').click();
  cy.get('body').then(($body) => {
    const itemCount = $body.find(removeCartItemElement).length;
    if (itemCount === 0) {
      cy.log('Cart is already empty');
      cy.get('[cy-test=cart-item-shortcut]').invoke('text').should('contain', '0 item(s) - $0.00');
      return;
    }
    cy.log(`Removing ${itemCount} items from cart`);
    const removeItemsSequentially = (remainingItems) => {
      if (remainingItems <= 0) return;

      cy.get(`${removeCartItemElement}:first`)
        .should('exist')
        .should('be.visible')
        .click()
        .then(() => {
          // Wait for the item to be fully removed
          cy.wait(1000);
          cy.get('[cy-test=cart-item-shortcut]').click();
          removeItemsSequentially(remainingItems - 1);
        });
    };
    removeItemsSequentially(itemCount);
  });
});

/*   Cypress.Commands.add('functionName', (email, password) => {
    
  })  */

Cypress.Commands.add("captureConsoleLogs", () => {
  const logs = [];
  cy.on("window:console", (log) => {
    logs.push(log);
  });

  Cypress.on('test:after:run', (test, runnable) => {
    const screenshotFileName = `${runnable.parent.title} -- ${test.title} (failed).png`.replace(/[/\\?%*:|"<>]/g, '-');
    const videoFileName = `${Cypress.spec.name}.mp4`;
  
    // Add screenshot if test failed
    if (test.state === 'failed') {
      addContext({ test }, `../screenshots/${Cypress.spec.name}/${screenshotFileName}`);
    }
  
    // Add video for every test
    addContext({ test }, `../videos/${videoFileName}`);
  });

});

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