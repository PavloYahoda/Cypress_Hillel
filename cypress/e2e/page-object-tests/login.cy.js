/// <reference types="cypress" />

import Helper from "../../support/Helper";

import HomePage from "../../page-object/pages/HomePage";
import SignInForm from "../../page-object/forms/SignInForm";
import GaragePage from "../../page-object/pages/GaragePage";



describe('Login', () => {
    beforeEach(() => {
        HomePage.open();
        HomePage.clickSignInButton();
    });

    it('Login with correct credentials', () => {
        //SignInForm.fillEmail(Helper.testUserEmail);
        //SignInForm.fillPassword(Helper.testUserPassword);
        SignInForm.fillEmail(Cypress.env('MAIN_USER_EMAIL'));
        SignInForm.fillPassword(Cypress.env('MAIN_USER_PASSWORD'));
        SignInForm.clickLoginButton();
        GaragePage.verifySuccessLoginByAlert();
    })

    it('Login without email', () => {
        SignInForm.fillPassword(Helper.testUserPassword);
        SignInForm.triggerEmptyErrorMessageByField('email');
        SignInForm.verifyFieldErrorByText('Email required');
        SignInForm.verifyLoginButtonIsDisabled();   
    })

    it('Login without password', () => {
        SignInForm.fillEmail(Helper.testUserEmail);
        SignInForm.triggerEmptyErrorMessageByField('password');
        SignInForm.verifyFieldErrorByText('Password required');
        SignInForm.verifyLoginButtonIsDisabled();   
    })

    it('Login with wrong email', () => {
        SignInForm.fillEmail('wrong@email.net');
        SignInForm.fillPassword(Helper.testUserPassword);
        SignInForm.clickLoginButton();
        SignInForm.verifyErrorMessageIsDisplayed();     
    })

    it('Login with wrong password', () => {
        SignInForm.fillEmail(Helper.testUserEmail);
        SignInForm.fillPassword('WrongPass123');
        SignInForm.clickLoginButton();
        SignInForm.verifyErrorMessageIsDisplayed();     
    })
})