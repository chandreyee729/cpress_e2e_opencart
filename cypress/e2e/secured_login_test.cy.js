import { LoginPage } from '../pages/loginPage';
const login = new LoginPage();
import userData from '../fixtures/userData.json';
import {command} from '../support/commands' 
import routes from '../pages/routes'

const {login_url} = routes;
const registeredEmail = Cypress.env('email');
const password = Cypress.env('user_password');

describe('Login to a secured account from Github Actions Secrets Workflow', ( ) => {

    beforeEach(() => {
        cy.visit(login_url);
        cy.log(`email is ${registeredEmail}`)
    })

    it(`Github Actions Secrets overrides user password over Cypresss Env for ${registeredEmail}`, { tags: ['secured'] },() => {
        login.enterEmail(registeredEmail);
        cy.log(`${registeredEmail} entered succesfully`)
        login.enterPassword(password);
        cy.log("password from CI entered succesfully");
        login.submit().should('contain','Login');
        login.submit().click();
        cy.get('#content').contains('My Account');
        cy.get('#content').contains('My Orders');
    });

})