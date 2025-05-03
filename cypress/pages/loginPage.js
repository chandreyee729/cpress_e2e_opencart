export class LoginPage {

    locators = {
        email: '#input-email',
        password: '#input-password',
        alert: '.alert.alert-danger.alert-dismissible',
        submit: '.btn.btn-primary',
    }

   enterEmail(email){
    cy.get(this.locators.email).type(email)
   } 

   enterPassword(password){
    cy.get(this.locators.password).type(password)
   }

   clickSubmit(){
    cy.addTestAttrByText(this.locators.submit, 'Login', 'cy-test', 'login');
        cy.get('[cy-test = login]').click()
   }

   getWarningText(){
    cy.addTestAttr(this.locators.alert, 'cy-test', 'warning-alert');
    return cy.get('[cy-test=warning-alert]').invoke('text')
   }

   clickForgottenPassword(){
    cy.addTestAttr('a', 'cy-test', 'forgot-password');
    cy.get('[cy-test=forgot-password]').click()
   }
}