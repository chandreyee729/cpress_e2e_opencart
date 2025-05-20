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
import routes from '../pages/routes';
const {cart_url, login_url, add_to_cart_url, remove_from_cart_url, wishlist_info, remove_from_wishlist_url} = routes;

Cypress.Commands.add('addTestAttr', (selector, attrName, attrValue) => {
  cy.log(`looking for: ${attrValue}`);
  cy.get(selector).invoke('attr', attrName, attrValue);
});

Cypress.Commands.add('addTestAttrByText', (selector, text, attrName, attrValue) => {
  cy.log(`looking for: ${attrValue}`);
  cy.contains(selector, text)
    .should('exist') // Ensure element exists
    .invoke('attr', attrName, attrValue);
});

Cypress.Commands.add('login', (email, password) => {
  cy.visit(login_url);
  cy.get('#input-email').type(email);
  cy.get('#input-password').type(password, {
    log: false,        // Won't show in command log
    sensitive: true    // Won't show in videos/screenshots 
  })
  cy.contains('input[type = submit]', 'Login').click()
})

Cypress.Commands.add('clearCart', () => {
  const cart_shortcut ='.btn.btn-inverse.btn-block.btn-lg.dropdown-toggle';
  cy.addTestAttr(cart_shortcut, 'cy-test', 'cart-item-shortcut');
  const removeCartItemElement = 'button[title="Remove"][onclick^="cart.remove"]';
  //cy.intercept('POST', remove_from_cart_url).as('cartRemoval');
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
          //cy.wait('@cartRemoval');
          cy.get(cart_shortcut).click();
          removeItemsSequentially(remainingItems - 1);
        });
    };
    removeItemsSequentially(itemCount);
  });
});

Cypress.Commands.add('loginByApi', (email, password) => {
  cy.request({
    method: 'POST',
    url: login_url,
    form: true,
    body: {
      email: email,
      password: password,
      followRedirect: false
    }
  }).then((response) => {
    //expect(response.status).to.eq(302);   // Redirect after login
    //expect(response.redirectedToUrl).to.include('/account/account'); 
    cy.log(`${email} logged in successfully.`)
  });
});

Cypress.Commands.add('navigationByApi', (page) => {
      cy.request(page).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.headers['content-type']).to.include('text/html');
        cy.log(`${page} loaded successfully.`)
  });
})

Cypress.Commands.add('addToCartByApi', (productId, quantity) => {
  cy.request({
    method: 'POST',
    url: add_to_cart_url,
    form: true,
    body: {
      product_id: productId,    
      quantity: quantity
    }
  }).then((response) => {
    expect(response.status).to.eq(200);
    expect(response.body.success).to.exist; 
  });
});

Cypress.Commands.add('clearWishlist', () => {

  cy.request(wishlist_info).then((response) => {
  const html = Cypress.$(response.body);
  html.find('a[href*="remove="]').each((index, element) => {
    const href = Cypress.$(element).attr('href');
    const productId = href.match(/remove=(\d+)/)[1];
    cy.log(`Found product_id: ${productId}`);
    cy.request({
      method: 'GET',
      url: `${remove_from_wishlist_url}=${productId}`,
      followRedirect: true
    }).then((response) => {
      expect(response.status).to.eq(200);
    })
  });
  });
});


/*   Cypress.Commands.add('functionName', () => {
  })    
  */

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