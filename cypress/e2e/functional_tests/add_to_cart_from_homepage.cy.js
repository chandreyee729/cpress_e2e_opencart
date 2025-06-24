import routes from '../../pages/routes'
import { ProductPage } from '../../pages/productPage';
const productPage = new ProductPage();
import { AccountPage } from '../../pages/accountPage';
const myaccountPage = new AccountPage();
import { CommonPage } from '../../pages/commonPage';
const commonLocators = new CommonPage();
import userData from '../../fixtures/userData.json';
import cartData from '../../fixtures/cartData.json';

const {cart_url, cart_info} = routes;
const registeredEmail = userData.registeredUser.email;
const password = userData.registeredUser.password;
const featuredItem = cartData.FeaturedProducts.firstItem.itemNo;
const featuredItemName = cartData.FeaturedProducts.firstItem.itemName;
const featuredItemPrice = cartData.FeaturedProducts.firstItem.itemPrice;
const macbook = cartData.Products.searchByMacbook

describe('Add to Cart successfully', () => {

    beforeEach(() => {
        cy.intercept('GET', cart_info).as('cartInfo');
        cy.login(registeredEmail, password);
        cy.clearCart();
        myaccountPage.homePage().click();
    })

    it('Should add a featured item to cart successfully from Homepage product layouts', () => {
        productPage.pageVisit();  //injects dynamic attributes for each product layout
        commonLocators.goToCart().invoke('text').then((cartText) => {
            expect(cartText).to.include('0 item(s) - $0.00', 'Cart is not emptied');
            cy.log(`Cart has: "${cartText}"`);
        })
        productPage.getProductPrice(featuredItem).should('contain', featuredItemPrice);
        productPage.getProductName(featuredItem).should('contain', featuredItemName);
        productPage.addToCart(featuredItem).click();
        cy.wait('@cartInfo').its('response.statusCode').should('eq', 200); 
        commonLocators.goToCart().invoke('text').should('contain', '1 item(s)').then((cartText) => {
            cy.log(`Cart has: "${cartText}"`);
            expect(cartText).to.include(featuredItemPrice, 'Cart does not show expected item price');
        })
        productPage.cartSuccessAlert().should('be.visible');
        productPage.cartSuccessAlert().should('contain', ` Success: You have added ${featuredItemName} to your shopping cart!`)
        cy.log(`The featured ${featuredItemName} of price ${featuredItemPrice} has been successfully added to cart`);
    });

    it(`Should search for ${macbook}s and add first item to cart successfully from Homepage`,{ tags: ['smoke'] }, () => {
        const firstItemIndex = 1;
        const noOfAddedItems = 1;
        commonLocators.enterSearchText(macbook);
        commonLocators.clickSearch();
        productPage.pageVisit(); //injects dynamic attributes for each product layout
        productPage.pageContent().should('contain.text', "Products meeting the search criteria");
        productPage.getProducts().each(($product) => {
            cy.wrap($product).invoke('text').should('contain', macbook)
        });
        productPage.addToCart(firstItemIndex).click();
        productPage.cartSuccessAlert().should('be.visible');
        productPage.cartSuccessAlert().should('contain', ` Success: You have added ${macbook} to your shopping cart!`)
        cy.wait('@cartInfo').its('response.statusCode').should('eq', 200); 
        commonLocators.goToCart().invoke('text').should('contain', '1 item(s)').then((cartText) => {
            cy.log(`Cart has: "${cartText}"`);
        })
        commonLocators.goToCart().click();
        // validate the table for cart intem content is not "Your shopping cart is empty!"
        commonLocators.getCartItemName(noOfAddedItems).should('contain',macbook);
        commonLocators.getCartItemAmount(noOfAddedItems).should('contain','$602.00');
    })
    it('Should add a specific searched item to cart successfully from Homepage', () => {
        commonLocators.enterSearchText(cartData.Products.laptop);
        commonLocators.clickSearch();
        productPage.pageVisit(); //injects dynamic attributes for each product layout
        productPage.pageContent().should('contain.text', "Products meeting the search criteria");
        productPage.getProducts().each(($product) => {
            cy.wrap($product).invoke('text').should('contain', cartData.Products.laptop)
        });
        productPage.addToCart(1).click();
        productPage.cartSuccessAlert().should('be.visible');
        productPage.cartSuccessAlert().should('contain', ` Success: You have added ${cartData.Products.laptop} to your shopping cart!`)
        console.log(` Success: You have added ${cartData.Products.laptop} to your shopping cart!`);
    })

    after(() => {
        cy.captureConsoleLogs();
    })
})