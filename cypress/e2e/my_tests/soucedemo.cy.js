/// <reference types="cypress" />

describe('example to-do app', () => {
    beforeEach(() => {
        cy.visit('https://www.saucedemo.com/')
    });

    const testData = [
        { username: 'standard_user', password: 'secret_sauce' },
        { username: 'problem_user', password: 'secret_sauce' },
        { username: 'performance_glitch_user', password: 'secret_sauce' },
        { username: 'error_user', password: 'secret_sauce' },
        { username: 'visual_user', password: 'secret_sauce' },
    ];

    testData.forEach((data) => {
        it(`Login with different users ${data.username}`, () => {
            cy.get('[data-test="username"]').type(data.username);
            cy.get('[data-test="password"]').type(data.password);
            cy.get('[data-test="login-button"]').click();
            cy.get('[data-test="title"]').should('be.visible');
        });
    });
    it('Login with locked users', () => {

        const lockedUser ='locked_out_user';
        const password = 'secret_sauce';

        cy.get('[data-test="username"]').type(lockedUser);
        cy.get('[data-test="password"]').type(password);
        cy.get('[data-test="login-button"]').click();
        cy.get('[data-test="title"]').should('not.exist');
    });
});
// describe('example to-do app', () => {
//     beforeEach(() => {
//         cy.visit('https://www.saucedemo.com/')
//     });

//     it(`Login`, () => {

//         let userName = "standard_user";
//         let password = "secret_sauce";

//         cy.get('[data-test="username"]').type(userName);
//         cy.get('[data-test="password"]').type(password);
//         cy.get('[data-test="login-button"]').click();
//         cy.get('[data-test="title"]').should('be.visible');
//     });
// });
