import { LoginPage } from '../../pages/loginPage';
const login = new LoginPage();
import routes from '../../pages/routes'

const {login_url} = routes;
const registeredEmail = Cypress.env('email');
const password = Cypress.env('user_password');

describe('Login to a secured account from Github Actions Secrets Workflow', ( ) => {

    beforeEach(() => {
        cy.visit(login_url);
        cy.log(`email is ${registeredEmail}`)
        cy.log(JSON.stringify(Cypress.env()))
    })

    it(`Github Actions Secrets overrides user password over Cypresss Env for ${registeredEmail}`, { tags: ['github_secret'] },() => {
        login.enterEmail(registeredEmail);
        cy.log(`${registeredEmail} entered successfully`)
        login.enterPassword(password);
        cy.log("password from CI entered successfully");
        login.submit().should('contain','Login');
        login.submit().click();
        cy.get('#content').contains('My Account');
        cy.get('#content').contains('My Orders');
    });

})