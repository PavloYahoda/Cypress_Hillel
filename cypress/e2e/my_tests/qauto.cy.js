/// <reference types="cypress" />

describe('example to-do app', () => {
    beforeEach(() => {
        cy.visit('https://qauto.forstudy.space', {

            auth: {

                username: 'guest',

                password: 'welcome2qauto',

            },
        });
    });

    it('Buttons in the header', () => {
        //Logo:
        cy.get('.header_logo').should('be.visible');
        //About button:
        cy.get('.btn.header-link').contains('About').click();
        //Contacts button:
        cy.get('.btn.header-link').contains('Contacts').click();
        //Home button:
        cy.get('.btn.header-link.-active').should('be.visible').click();
        //Guest Log In button:
        const btnGuestLogIN = '.header_right.d-flex.align-items-center > .header-link.-guest';
        cy.get(btnGuestLogIN).click();
        //Check that new page is opened and go back:
        cy.get('h1').contains('Garage').should('be.visible'); 
        cy.get('.btn.btn-link.text-danger.btn-sidebar.sidebar_btn').click();
        //Sing In button:
        cy.get(btnGuestLogIN).siblings().should('exist');
    });
    it('Buttons in the footer', () => {
        //Socials all:
        cy.get('.contacts_socials.socials').children().should('have.length', 5);
        //facebook:
        cy.get('a.socials_link').eq(0).should('have.attr', 'href').and('include', 'facebook');
        //telegram:
        cy.get('a.socials_link').eq(1).should('have.attr', 'href').and('include', 't.me');
        //youtube:
        cy.get('a.socials_link').eq(2).should('have.attr', 'href').and('include', 'youtube');
        //instagram:
        cy.get('a.socials_link').eq(3).should('have.attr', 'href').and('include', 'instagram');
        //linkedin:
        cy.get('a.socials_link').eq(4).should('have.attr', 'href').and('include', 'linkedin');
        //contacts links:
        cy.get('.contacts_link.display-4').invoke('text').should('include', 'ithillel.ua');
        cy.get('.contacts_link.h4').invoke('text').should('include', 'support@ithillel.ua');
    });
});