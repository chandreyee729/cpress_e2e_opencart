export class AccountPage  {

    locators = {
        homePage: '.img-responsive',
        breadcrumb: '#account-account',
        accountContainer: '#account-account'
    }

    homePage(){
    cy.addTestAttr(this.locators.homePage, 'cy-test', 'homePage');
        return cy.get('[cy-test=homePage]');
    }

    myAccountContainer(){
        return cy.get(this.locators.accountContainer);
    }

    
}