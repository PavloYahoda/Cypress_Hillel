class ProfilePage{

    get userName(){
        return cy.get('.profile > p');
    }

    verifyUserNameByText(text){
        this.userName.should('have.text', text);
    }
}

export default new ProfilePage();