export class registerPage {
    locators ={
    pageHeader: '#content',
    firstName : '#input-firstname',
    lastName: '#input-lastname',
    eMail: '#input-email',
    telephone: '#input-telephone',
    password: '#input-password',
    confirmPassword: '#input-confirm',
    policyCheck: 'input[type=checkbox]',
    continueButton:'.btn.btn-primary'
    }
    
    confirmPageHeader(){
        cy.get(this.locators.pageHeader).contains('Register Account')
    }

    inputFirstName(firstName){
        cy.get(this.locators.firstName).type(firstName)
    }
    inputLastName(lastName){
        cy.get(this.locators.lastName).type(lastName)
    }
    inputEmail(email){
        cy.get(this.locators.eMail).type(email)
    }
    inputTelephone(telephone){
        cy.get(this.locators.telephone).type(telephone)
    }
    inputPassword(password){
        cy.get(this.locators.password).type(password)
        cy.get(this.locators.confirmPassword).type(password)
    }
    checkPolicy(){  
        cy.get(this.locators.policyCheck).check()
    }
    clickContinue(){
        cy.addTestAttrByText(this.locators.continueButton, 'Continue', 'cy-test', 'continue-registration');
        cy.get('[cy-test = continue-registration]').click()
    }
}