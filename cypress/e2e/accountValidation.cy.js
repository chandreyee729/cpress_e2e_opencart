import registeredUserData from '../fixtures/registeredUserData.json'
import { LoginPage } from '../pages/loginPage';
const login = new LoginPage();
import {command} from '../support/commands' 

const registeredEmail = registeredUserData.email;
const password = registeredUserData.password;
const unRegEmail = `cypress.snow${Date.now()}@abc.com`;;
const unRegPass = registeredUserData.unRegisteredPassword;

describe('Login to account', ( ) => {

    /*beforeEach(() => {
        cy.visit(Cypress.env('URL_LOGIN'));
    })*/

    it('Login successfully to account', () => {
        cy.visit(Cypress.env('URL_LOGIN'));
        login.enterEmail(registeredEmail);
        login.enterPassword(password);
        login.clickSubmit();
        cy.get('#content').contains('My Account');
        cy.get('#content').contains('My Orders');
    });
    
    it('Login to account with unregistered user', () => {
        cy.visit(Cypress.env('URL_LOGIN'));
        login.enterEmail(unRegEmail);
        login.enterPassword(unRegPass);
        login.clickSubmit();
    // write code for vaidation failure
        login.getWarningText().should('contain', ' Warning: No match for E-Mail Address and/or Password.');
    });
})