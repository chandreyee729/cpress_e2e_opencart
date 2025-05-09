export class ProductPage{

    locators = {
        searchInput: '.form-control.input-lg',
        clickSearch: '.btn.btn-default.btn-lg',
        pageContent: '#content',
        productLayout: '.product-layout',
        caption: '.caption',
        price: '.price',
        goToCartButton:'.btn.btn-inverse.btn-block.btn-lg.dropdown-toggle',
        successAlert:'.alert.alert-success.alert-dismissible'
    }

    /* Visits the page and injects dynamic attributes to buttons of the page for multiple products */
    
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
    return this.productAction(productIndex).find('button:contains("Wishlist")');
  }

  compareProduct(productIndex) {
    return this.productAction(productIndex).find('button:contains("Compare")');
  }
/************************************************************************************/

  // Get product details

  getProducts(){
    return cy.get(`[cy-test*=product-]`)
  }

  getProductName(productIndex) {
    return cy.get(`[cy-test=product-${productIndex}]`).find(this.locators.caption).eq(0).invoke('text');
  }

  getProductPrice(productIndex){
    return cy.get(`[cy-test=product-${productIndex}]`).find(this.locators.price).eq(0).invoke('text').then(text => text.trim());
  }

  /************************************************************************************/

  enterSearchText(product){
    cy.addTestAttr(this.locators.searchInput, 'cy-test', 'search-input');
    return cy.get('[cy-test=search-input]').type(product);
  }
  
  clickSearch(){
    cy.addTestAttr(this.locators.clickSearch, 'cy-test', 'search-button');
    return cy.get('[cy-test=search-button]').click();
  }

  pageContent(){
    return cy.get(this.locators.pageContent);
  }

  goToCart(){
    cy.addTestAttr(this.locators.goToCartButton, 'cy-test', 'cart-item-shortcut');
    return cy.get('[cy-test=cart-item-shortcut]');
  }

  cartSuccessAlert(){
    cy.addTestAttr(this.locators.successAlert, 'cy-test', 'cart-success-alert');
    return cy.get('[cy-test=cart-success-alert]',{timeout: 3000});
  }


}