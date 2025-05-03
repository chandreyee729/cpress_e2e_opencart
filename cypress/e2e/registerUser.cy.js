import { registerPage } from "../pages/registerPage";
const register = new registerPage();
import newUserData from '../fixtures/newUserData.json';
const firstName = newUserData.firstName;
const lastName = newUserData.lastName;
const email = `cypress.snow${Date.now()}@mailinator.com`;
console.log(email);
const telephone = newUserData.telephone;
const password = newUserData.password

describe('Register User successfully', ()=> {

    it('Go to Registration Page', () => {
        cy.visit(Cypress.env('URL_LOGIN'));
        cy.get('.well').contains('New Customer').then(() =>{
            cy.get('.btn.btn-primary').contains('Continue').click();
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
        cy.get('#content').contains('Your Account Has Been Created!');
        cy.contains('a.btn.btn-primary', 'Continue').click();
        cy.url().should('include', 'https://naveenautomationlabs.com/opencart/index.php?route=account/account');
    });



})