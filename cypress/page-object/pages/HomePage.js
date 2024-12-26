class HomePage{

    get btnSignIn(){
        return cy.get('.header_signin');
    }

    open(){

        cy.visit('/');
        // cy.visit('https://qauto.forstudy.space', {

        //     auth: {

        //         username: 'guest',

        //         password: 'welcome2qauto',

        //     },
        // });
    }

    clickSignInButton(){
        this.btnSignIn.click();
    }



}

export default new HomePage();