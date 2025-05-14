import { LoginPage } from '../../pages/loginPage';
const login = new LoginPage();
import userData from '../../fixtures/userData.json';
import {command} from '../../support/commands' 
import routes from '../../pages/routes'

const {login_url} = routes;
const registeredEmail = userData.registeredUser.email;
const password = userData.registeredUser.password;
const unRegEmail = `cypress.snow${Date.now()}@abc.com`;;
const unRegPass = userData.unregisteredUser.unRegisteredPassword;
const recoverUserEmail = userData.recoverAccount.registeredEmail;

describe('Login to account', ( ) => {

    beforeEach(() => {
        cy.visit(login_url);
    })

    it(`Registered user ${registeredEmail} logs in successfully to account`, { tags: ['smoke'] },() => {
        login.enterEmail(registeredEmail);
        login.enterPassword(password);
        login.submit().should('contain','Login');
        login.submit().click();
        cy.get('#content').contains('My Account');
        cy.get('#content').contains('My Orders');
    });
    
    it(`Unregistered user ${unRegEmail} fails to login and encounters error`, () => {
        login.enterEmail(unRegEmail);
        login.enterPassword(unRegPass);
        login.submit().click();
        login.warningAlert().invoke('text').should('contain', 'Warning: No match for E-Mail Address and/or Password.');
    });

    it(`Registered user ${registeredEmail} fails to login and encounters error for entering incorrect password`, () => {
        login.enterEmail(registeredEmail);
        login.enterPassword(unRegPass);
        login.submit().click();
        login.warningAlert().invoke('text').should('contain', 'Warning: No match for E-Mail Address and/or Password.');
    });

    it(`Registered user ${recoverUserEmail} can trigger mail to recover forgotten password`,() => {
        login.forgottenPassword().click();
        login.pageContent().should('contain.text','Forgot Your Password?');
        login.enterEmail(recoverUserEmail);
        login.continue().click();
            cy.url().should('include', login_url).then(()=>
        login.successAlert().invoke('text').should('contain', 'An email with a confirmation link has been sent your email address.'));
        cy.log("App is not setup to reset password for test mails generators");    
        
    })

    it('Unregistered user cannot recover forgotten password',() => {
        login.forgottenPassword().click();
        login.pageContent().should('contain.text','Forgot Your Password?');
        login.enterEmail(unRegEmail);
        login.continue().click()
            login.warningAlert().invoke('text').should('contain', 'Warning: The E-Mail Address was not found in our records, please try again!');
    })

    it.skip('Fail this test on purpose to show failure status and records', () => {
        login.enterEmail(registeredEmail);
        login.enterPassword(unRegPass);
        login.submit().should('contain','Login');
        login.submit().click();
        cy.get('#content').contains('My Account');
        cy.get('#content').contains('My Orders');
    });

    after(() => {
        cy.captureConsoleLogs();
    })

})