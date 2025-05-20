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
const registeredEmail = userData.registeredUser_3.email;
const password = userData.registeredUser_3.password;
const macbook = cartData.Products.searchByMacbook

describe('Add to WishList successfully', () => {

    beforeEach(() => {
        cy.intercept('GET', cart_info).as('cartInfo');
        cy.login(registeredEmail, password);  
        cy.clearWishlist();   
        myaccountPage.homePage().click();
    })

    it(`Search for ${macbook}s and add all items to Wishlist successfully from Homepage`,{ tags: ['smoke'] }, () => {
        commonLocators.enterSearchText(macbook);
        commonLocators.clickSearch();
        productPage.pageVisit(); //injects dynamic attributes for each product layout
        productPage.pageContent().should('contain.text', "Products meeting the search criteria");
        let searchResultCount = productPage.getProducts().its('length').then((count) => {
            searchResultCount = count
        });
        cy.log(`No. of products found: ${searchResultCount}`);
        productPage.getProducts().each(($product, productIndex) => {
            cy.wrap($product).invoke('text').should('contain', macbook);
            productPage.addToWishlist(productIndex + 1).click({force:true});
            productPage.getProductName(productIndex + 1).then((name => {
                cy.log(`This product name is. ${name}`);
                expect(name).to.include(macbook);
                productPage.cartSuccessAlert().should('contain',  `Success: You have added ${name} to your wish list!`)
            }))
        });
        commonLocators.goToWishList().invoke('text').then((wishedItems) => {
            expect(wishedItems).to.include(searchResultCount, `Wishlist item count is not ${searchResultCount}`)
        })

    })

    after(() => {
        cy.captureConsoleLogs();
    })
})