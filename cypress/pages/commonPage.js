export class CommonPage{

    locators = {
        searchInput: '.form-control.input-lg',
        clickSearch: '.btn.btn-default.btn-lg',
        pageContent: '#content',
        goToCartButton:'.btn.btn-inverse.btn-block.btn-lg.dropdown-toggle',
        cart_product_name: '.text-left',
        cart_product_count_amount: 'tr td.text-right',
        goToWishlistButton: '#wishlist-total'
    }

   /************************************************************************************/
    // page elements

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
  
  goToWishList(){
    cy.addTestAttr(this.locators.goToWishlistButton, 'cy-test', 'wishlist-button');
    return cy.get('[cy-test=wishlist-button]');
  }

  goToCart(){
    cy.addTestAttr(this.locators.goToCartButton, 'cy-test', 'cart-item-shortcut');
    return cy.get('[cy-test=cart-item-shortcut]');
  }

  /************************************************************************************/

  injectDynamicCartAttributes(){
    cy.get(this.locators.cart_product_count_amount, {timeout: 25000}).each(($product_detail, index) => {
      cy.wrap($product_detail).invoke('attr', 'cy-test', `cart_item_count-${index + 1}`)
    }); 
    return this;
  }
  // Get cart details



  getCartItemName(cartIndex){
    cy.get(this.locators.cart_product_name, {timeout: 25000}).each(($product_name, index) => {
      cy.wrap($product_name).invoke('attr', 'cy-test', `cart_item_name-${index + 1}`)
    });  
    return cy.get(`[cy-test=cart_item_name-${cartIndex}]`).invoke('text');
  }
  
  getCartItemCount(cartIndex){
    this.injectDynamicCartAttributes()
      return cy.get(`[cy-test=cart_item_count-${cartIndex}]`).invoke('text');
  }

  getCartItemAmount(cartIndex){
    this.injectDynamicCartAttributes()
    if(cartIndex === 1){
      return cy.get(`[cy-test=cart_item_count-${cartIndex * 2}]`).invoke('text');
    } else
    return cy.get(`[cy-test=cart_item_count-${cartIndex * 2 - 1}]`).invoke('text');
  }
}