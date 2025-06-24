import { registerPage } from "../../pages/registerPage";
const register = new registerPage();
import { AccountPage } from "../../pages/accountPage";
const myAccount = new AccountPage();
import userData from '../../fixtures/userData.json';
import routes from '../../pages/routes'

const {login_url,register_url, account_url, account_created_url} = routes;
const firstName = userData.newUser.firstName;
const lastName = userData.newUser.lastName;
const email = `cypress.snow${Date.now()}@mailinator.com`;
console.log(email);
const telephone = userData.newUser.telephone;
const password = userData.newUser.password

describe('Register User successfully', ()=> {

    it('Should navigate to Registration Page directly', () => {
        cy.visit(login_url);
        cy.get('.well').contains('New Customer').then(() =>{
            register.continue().click();
            cy.url().should('include', register_url);
            register.confirmPageHeader().contains('Register Account');
        });
    }) 

    it('Should be able to enter User details and complete Registration',{tags: ['smoke']} ,() => {
        cy.visit(register_url);
        cy.url().should('include', 'register');
        register.inputFirstName(firstName);
        register.inputLastName(lastName);
        register.inputEmail(email);
        register.inputTelephone(telephone);
        register.inputPassword(password);
        register.checkPolicy().check();
        register.continue().click(); 
        cy.wait(2000);
        cy.url().should('include', account_created_url);
        cy.get('#content').should('contain','Your Account Has Been Created!');
        register.continueToAccount().click();
        myAccount.myAccountContainer().should('contain','My Account');
        cy.url().should('include', account_url);
    });



})