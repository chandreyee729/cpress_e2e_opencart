export class ProductPage{

    locators = {
        pageContent: '#content',
        productLayout: '.product-layout',
        caption: '.caption',
        product_name:'.caption a',
        price: '.price',
        successAlert:'div.alert.alert-success.alert-dismissible',
    }

  /* Visits the page and injects dynamic attributes to the each buttons available in each product layout */
    
  pageVisit() {
    this.injectDynamicProductAttributes();
    return this;
  }

    injectDynamicProductAttributes() {
      cy.get(this.locators.productLayout).each(($product, index) => {
        cy.wrap($product)
          .invoke('attr', 'cy-test', `product-${index + 1}`)
          .should('have.attr', 'cy-test', `product-${index + 1}`)// Verify injection
      });
      return this;
    } 

  //product action helper to index products and access indexed buttons 
  productAction(productIndex) {
    return cy.get(`[cy-test=product-${productIndex}]`, { timeout: 5000 })
  }

  // Specific product actions
  addToCart(productIndex) {
    return this.productAction(productIndex).find('button:contains("Add to Cart")');
  }

  addToWishlist(productIndex) {
    return this.productAction(productIndex).find('button[data-original-title="Add to Wish List"]');
  }

  compareProduct(productIndex) {
    return this.productAction(productIndex).find('button[data-original-title="Compare this Product"]');
  }
  
  // Get product details
  getProducts(){
    return cy.get(`[cy-test*=product-]`)
  }

  getProductName(productIndex) {
    return cy.get(`[cy-test=product-${productIndex}]`).find(this.locators.product_name).eq(0).invoke('text');
  }

  getProductPrice(productIndex){
    return cy.get(`[cy-test=product-${productIndex}]`).find(this.locators.price).eq(0).invoke('text').then(text => text.trim());
  }

  /************************************************************************************/
    // page elements

  pageContent(){
    return cy.get(this.locators.pageContent);
  }

  cartSuccessAlert(){
    //cy.addTestAttr(this.locators.successAlert, 'cy-test', 'cart-success-alert');
    //return cy.get('[cy-test=cart-success-alert]',{timeout: 30000});
    return cy.get(this.locators.successAlert,{timeout: 3000});

  }

}