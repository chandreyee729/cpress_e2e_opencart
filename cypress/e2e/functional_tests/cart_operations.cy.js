import routes from '../../pages/routes'
import userData from '../../fixtures/userData.json';
import cartData from '../../fixtures/cartData.json'
import { CartPage } from '../../pages/cartPage';

const cart = new CartPage();
const {homepage_url, cart_url} = routes;
const registeredEmail = userData.registeredUser_2.email;
const password = userData.registeredUser_2.password;
const cart_product_id = cartData.CartProducts.firstItemInCart.productId;
const cart_product_name = cartData.CartProducts.firstItemInCart.itemName;
const cart_product_model = cartData.CartProducts.firstItemInCart.productModel;
const cart_product_unitPrice = cartData.CartProducts.firstItemInCart.itemPrice;
const cart_index = cartData.CartProducts.firstItemInCart.itemIndexinCart;

const add_setup_product_quantity = 1;
const update_product_quantity = 3;


const tableHeaders = [
    'Image',
    'Product Name',
    'Model',
    'Quantity',
    'Unit Price',
    'Total'
  ];

describe('Manage Shopping Cart Successfully', () => {

    beforeEach(()=> {
        cy.loginByApi(registeredEmail,password);
        cy.addToCartByApi(cart_product_id, add_setup_product_quantity);
        cy.visit(cart_url)
    })

    it('Go to Shopping Cart with items in Cart ', () => {
        cy.visit(homepage_url);
        cart.shoppingCart().click();
        cart.pageContent().should('contain', "Shopping Cart");
        cart.pageContent().should('contain', "What would you like to do next?");
        cart.checkout().should('exist');
        cart.tableHeaders().each(($th, index) => {
            cy.wrap($th).should('contain.text', tableHeaders[index]);
          });
    })

    it(`Verify item ${cart_product_name} in Shopping Cart at index ${cart_index} and its other contents`, () => {
        cart.pageVisit()
        cart.productImage(cart_index).should('contain.attr', 'src').and('not.be.empty');
        cart.producName(cart_index).invoke('text').should('contain',cart_product_name);
        cart.productModel(cart_index).invoke('text').should('contain',cart_product_model);
        cart.productQuantity(cart_index).should('have.value', add_setup_product_quantity);
        cart.productUnitPrice(cart_index).invoke('text').should('contain',cart_product_unitPrice);
        let total_product_price = cart_product_unitPrice * add_setup_product_quantity;
        cart.productTotalPrice(cart_index).invoke('text').should('contain',total_product_price);
    })

    it(`Update order item quantity for ${cart_product_name} to ${update_product_quantity} in Shopping Cart at index ${cart_index}`,{ tags: ['smoke','new_feature'] }, () => {
        cart.pageVisit();
        cart.productQuantity(cart_index).should('have.value', add_setup_product_quantity);
        cart.productUnitPrice(cart_index).invoke('text').should('contain',cart_product_unitPrice);
        cart.changeProductQuantity(cart_index).type(update_product_quantity);
        cart.updateProductQuantity(cart_index).click();
        cart.pageVisit();
        let total_product_price = cart_product_unitPrice * update_product_quantity;
        cart.productTotalPrice(cart_index).invoke('text').should('contain',total_product_price);
    })

    afterEach(()=> {
        cy.visit(cart_url);
        cy.clearCart();
    })
   
})


