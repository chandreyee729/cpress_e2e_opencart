import { registerPage } from "../pages/registerPage";
const register = new registerPage();
import { AccountPage } from "../pages/accountPage";
const myAccount = new AccountPage();
import userData from '../fixtures/userData.json';

const firstName = userData.newUser.firstName;
const lastName = userData.newUser.lastName;
const email = `cypress.snow${Date.now()}@mailinator.com`;
console.log(email);
const telephone = userData.newUser.telephone;
const password = userData.newUser.password

describe('Register User successfully', ()=> {

    it('Go to Registration Page', () => {
        cy.visit(Cypress.env('URL_LOGIN'));
        cy.get('.well').contains('New Customer').then(() =>{
            register.clickContinue();
            cy.url().should('include', 'https://naveenautomationlabs.com/opencart/index.php?route=account/register');
            register.confirmPageHeader;
        });
    }) 

    it('Enter Registration details and continue', () => {
        cy.visit(Cypress.env('URL_REGISTER'));
        cy.url().should('include', 'register');
        register.inputFirstName(firstName);
        register.inputLastName(lastName);
        register.inputEmail(email);
        register.inputTelephone(telephone);
        register.inputPassword(password);
        register.checkPolicy();
        register.clickContinue(); 
        cy.wait(2000);
        cy.url().should('include', 'https://naveenautomationlabs.com/opencart/index.php?route=account/success');
        cy.get('#content').should('contain','Your Account Has Been Created!');
        cy.contains('a.btn.btn-primary', 'Continue').click();
        myAccount.myAccountContainer().should('contain','My Account');
        cy.url().should('include', 'https://naveenautomationlabs.com/opencart/index.php?route=account/account');
    });



})