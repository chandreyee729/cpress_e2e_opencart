import { ProductPage } from '../pages/productPage';
const productPage = new ProductPage();
import { AccountPage } from '../pages/accountPage';
const myaccountPage = new AccountPage();
import userData from '../fixtures/userData.json';
import cartData from '../fixtures/cartData.json';

const registeredEmail = userData.registeredUser.email;
const password = userData.registeredUser.password;
const featuredItem = cartData.FeaturedProducts.firstItem.itemNo;
const featuredItemName = cartData.FeaturedProducts.firstItem.itemName;
const featuredItemPrice = cartData.FeaturedProducts.firstItem.itemPrice;
const macbook = cartData.Products.searchByMacbook

describe('Add to Cart successfully', () => {

    beforeEach(() => {
        cy.login(registeredEmail, password);
        cy.clearCart();
    })

    it('Add a featured item to cart successfully from Homepage product layouts', () => {
        myaccountPage.homePage().click();
        productPage.pageVisit();  //injects dynamic attributes for each product layout
        productPage.getProductPrice(featuredItem).should('contain', featuredItemPrice);
        productPage.getProductName(featuredItem).should('contain', featuredItemName);
        productPage.addToCart(featuredItem).click();
        productPage.cartSuccessAlert().should('contain', ` Success: You have added ${featuredItemName} to your shopping cart!`)
        productPage.goToCart().should('not.contain.text', '0 item(s) - $0.00');
        productPage.goToCart().should('contain.text', '1 item(s)');
        productPage.goToCart().should('contain.text', featuredItemPrice);
        cy.log(`The featured ${featuredItemName} of price ${featuredItemPrice} has been successfully added to cart`)
    })

    it(`Search for ${macbook}s and add first item to cart successfully from Homepage`,{ tags: ['smoke'] }, () => {
        const firstSearchedItem = 1;
        myaccountPage.homePage().click();
        productPage.enterSearchText(macbook);
        productPage.clickSearch();
        productPage.pageVisit(); //injects dynamic attributes for each product layout
        productPage.pageContent().should('contain.text', "Products meeting the search criteria");
        productPage.getProducts().each(($product) => {
            cy.wrap($product).invoke('text').should('contain', macbook)
        });
        productPage.addToCart(firstSearchedItem).click();
        productPage.cartSuccessAlert().should('contain', ` Success: You have added ${macbook} to your shopping cart!`)

    })
    it('Add a specific searched item to cart successfully from Homepage', () => {
        myaccountPage.homePage().click();
        productPage.enterSearchText(cartData.Products.laptop);
        productPage.clickSearch();
        productPage.pageVisit(); //injects dynamic attributes for each product layout
        productPage.pageContent().should('contain.text', "Products meeting the search criteria");
        productPage.getProducts().each(($product) => {
            cy.wrap($product).invoke('text').should('contain', cartData.Products.laptop)
        });
        productPage.addToCart(1).click();
        productPage.cartSuccessAlert().should('contain', ` Success: You have added ${cartData.Products.laptop} to your shopping cart!`)
    })

    after(() => {
        cy.captureConsoleLogs();
    })
})