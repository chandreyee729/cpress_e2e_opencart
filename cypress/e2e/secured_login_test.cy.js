import { LoginPage } from '../pages/loginPage';
const login = new LoginPage();
import userData from '../fixtures/userData.json';
import {command} from '../support/commands' 
import routes from '../pages/routes'

const {login_url} = routes;
const registeredEmail = Cypress.env('email');
const password = Cypress.env('user_password');

describe('Login to a secured account', ( ) => {

    beforeEach(() => {
        cy.visit(login_url);
    })

    it(`Registered user ${registeredEmail} logs in successfully to account`, { tags: ['secured'] },() => {
        login.enterEmail(registeredEmail);
        login.enterPassword(password);
        login.submit().should('contain','Login');
        login.submit().click();
        cy.get('#content').contains('My Account');
        cy.get('#content').contains('My Orders');
    });

})