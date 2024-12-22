class SignInForm{

    get fieldEmail(){
        return cy.get('#signinEmail');
    }
    get fieldPassword(){
        return cy.get('#signinPassword');
    }
    get btnLogin(){
        return cy.get('.modal-footer .btn-primary');
    }
    get errorMessageWrongCredentials(){
        return cy.contains('.alert-danger', 'Wrong email or password');
    }


    fillEmail(email){
        this.fieldEmail.type(email);
    }

    fillPassword(password){
        this.fieldPassword.type(password);
    }

    clickLoginButton(){
        this.btnLogin.click();
    }

    verifyLoginButtonIsDisabled(){
        this.btnLogin.should('be.disabled');
    }

    verifyFieldErrorByText(text){
        cy.contains('.invalid-feedback p', text).should('be.visible');
    }

    verifyErrorMessageIsDisplayed(){
        this.errorMessageWrongCredentials.should('be.visible');
    }

    triggerEmptyErrorMessageByField(fieldName){
        const element = fieldName === 'email' ? this.fieldEmail : this.fieldPassword;
        element.focus();
        element.blur();
    }
}

export default new SignInForm();
