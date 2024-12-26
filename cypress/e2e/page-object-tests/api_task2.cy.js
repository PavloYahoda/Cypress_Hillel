/// <reference types="cypress" />

import HomePage from "../../page-object/pages/HomePage";
import SignInForm from "../../page-object/forms/SignInForm";
import GaragePage from "../../page-object/pages/GaragePage";
import SideBar from "../../page-object/components/SideBar";
import ProfilePage from "../../page-object/pages/ProfilePage";

describe('Actions with car: add car, add fuel expenses, edit data, remove car', () => {
       
    beforeEach(() => {
        HomePage.open();
        HomePage.clickSignInButton();
        SignInForm.fillEmail(Cypress.env('MAIN_USER_EMAIL'));
        SignInForm.fillPassword(Cypress.env('MAIN_USER_PASSWORD'));
        SignInForm.clickLoginButton();
        GaragePage.verifySuccessLoginByAlert();
        GaragePage.verifyPageNameByText('Garage');
    });

    it('Check user name in profile', () => {
        const profileData = {
            "status": "ok",
            "data": {
                "userId": 165822,
                "photoFilename": "default-user.png",
                "name": "Polar",
                "lastName": "Bear"
            }
        };
        
        cy.intercept('GET', '/api/users/profile', profileData);
        
        SideBar.clickProfileTab();
        ProfilePage.verifyUserNameByText('Polar Bear');
    });
});