export class CartPage {
    locators = {
        shopping_cart_button: '.fa.fa-shopping-cart',
        pageContent: '#content',
        checkout: '.btn.btn-primary',
        table_header: '.table-responsive table thead tr',
        table_layout: '.table-responsive table tbody tr'
    };

    pageVisit() {
        this.injectDynamicCartAttributes();
        return this;
    }

    injectDynamicCartAttributes() {
        cy.get(this.locators.table_layout).each(($cart_item, index) => {
            cy.wrap($cart_item)
                .invoke('attr', 'cy-test', `cart-item-${index + 1}`)
                .should('have.attr', 'cy-test', `cart-item-${index + 1}`)// Verify injection
        });
        return this;
    }

    //product action helper to index products and access indexed buttons 
    cartAction(cartIndex) {
        return cy.get(`[cy-test=cart-item-${cartIndex}]`, { timeout: 5000 })
    }
    //get cart items by index from the cart table

    productImage(cartIndex) {
        return this.cartAction(cartIndex).find('td:nth-child(1) img ');
    }

    producName(cartIndex) {
        return this.cartAction(cartIndex).find('td:nth-child(2)');
    }

    productModel(cartIndex) {
        return this.cartAction(cartIndex).find('td:nth-child(3)');
    }

    productQuantity(cartIndex) {
        return this.cartAction(cartIndex).find('td:nth-child(4) input');
    }

    changeProductQuantity(cartIndex) {
        return this.cartAction(cartIndex).find('td:nth-child(4) input').clear();
    }

    updateProductQuantity(cartIndex) {
        return this.cartAction(cartIndex).find('button[type="submit"]');
    }

    removeProduct(cartIndex) {
        return this.cartAction(cartIndex).find('button[type="button"]')
    }

    productUnitPrice(cartIndex) {
        return this.cartAction(cartIndex).find('td:nth-child(5)');
    }

    productTotalPrice(cartIndex) {
        return this.cartAction(cartIndex).find('td:nth-child(6)');
    }

    /************************************************************************************/
    // page elements

    shoppingCart() {
        cy.addTestAttr(this.locators.shopping_cart_button, 'cy-test', 'shopping-cart');
        return cy.get('[cy-test=shopping-cart]').first()
    }

    pageContent() {
        return cy.get(this.locators.pageContent)
    }

    tableHeaders() {
        return cy.get(this.locators.table_header)
    }

    checkout() {
        cy.addTestAttrByText(this.locators.checkout, 'Checkout', 'cy-test', 'checkout');
        return cy.get('[cy-test=checkout]')
    }

}