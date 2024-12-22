import AddCarForm from "../forms/AddCarForm";

class GaragePage{

    get alertSuccessLogin(){
        return cy.contains('.alert', 'You have been successfully logged in')
    }
    get alertCarAdded(){
        return cy.contains('.alert', 'Car added')
    }
    get alertCarRemoved(){
        return cy.contains('.alert', 'Car removed')
    }
    get btnAddCar(){
        return cy.get('.btn-primary');
    }
    get pageName(){
        return cy.get('h1');
    }



    clickAddCarButton(){
        this.btnAddCar.click();
    }
    clickEditCarButton (brand, model, index = 0){
        const fullName = `${brand} ${model}`;
        return cy
        .get('.car-heading')
        .filter(`:contains(${fullName})`)
        .eq(index)
        .find('.car_edit')
        .click();
    }
    clickAddFuelExpenseButton (brand, model, index = 0){
        const fullName = `${brand} ${model}`;
        return cy
        .get('.car-heading')
        .filter(`:contains(${fullName})`)
        .eq(index)
        .find('.car_add-expense')
        .click();
    }
    verifySuccessLoginByAlert(){
        this.alertSuccessLogin.should('be.visible');
    }
    verifyCarIsAddedByAlert(){
        this.alertCarAdded.should('be.visible');
    }
    verifyCarIsRemovedByAlert(){
        this.alertCarRemoved.should('be.visible');
    }
    verifyPageNameByText(text){
        this.pageName.should('have.text', text)
    }
    verifyCarIsDisplayed(brand, model, index = 0) {
        const fullName = `${brand} ${model}`;
        return cy.get('.car-list .car-item')
            .eq(index)
            .find('.car_name')
            .should('contain', fullName)
            .should('be.visible');
    }
    verifyCarIsRemoved(brand, model) {
        const fullName = `${brand} ${model}`;
    
        cy.get('.car-list .car-item')
            .filter(`:contains("${fullName}")`)
            .should('not.exist');
    }


}

export default new GaragePage();