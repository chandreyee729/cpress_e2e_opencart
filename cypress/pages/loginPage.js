export class LoginPage {

    locators = {
        email: '#input-email',
        password: '#input-password',
        warningAlert: '.alert.alert-danger.alert-dismissible',
        successAlert: '.alert.alert-success.alert-dismissible',
        submit: '.btn.btn-primary',
        forgotten_password:'a[href$="account/forgotten"]',
        page_content:'#content'
    }

   enterEmail(email){
    cy.get(this.locators.email).type(email)
   } 

   enterPassword(password){
    cy.get(this.locators.password).type(password)
   }

   submit(){
    cy.addTestAttrByText(this.locators.submit, 'Login','cy-test', 'login');
       return cy.get('[cy-test = login]')
   }

   continue(){
    cy.addTestAttrByText(this.locators.submit, 'Continue','cy-test', 'continue');
       return cy.get('[cy-test = continue]')
   }

   warningAlert(){
    cy.addTestAttr(this.locators.warningAlert, 'cy-test', 'warning-alert');
    return cy.get('[cy-test=warning-alert]')
   }

   successAlert(){
    cy.addTestAttr(this.locators.successAlert, 'cy-test', 'success-alert');
    return cy.get('[cy-test=success-alert]', {timeout :5000})
   }

   forgottenPassword(){
    cy.addTestAttr(this.locators.forgotten_password, 'cy-test', 'forgot-password_link');
    return cy.get('[cy-test=forgot-password_link]').first()
   }

   pageContent(){
    cy.addTestAttr(this.locators.page_content, 'cy-test', 'page_content');
    return cy.get('[cy-test=page_content]')
   }
}