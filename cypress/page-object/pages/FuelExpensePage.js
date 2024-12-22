class FuelExpensePage{

    get alertFuelExpenseAdded(){
        return cy.contains('.alert', 'Fuel expense added')
    }
    get pageName(){
        return cy.get('h1');
    }
    get btnAddAnExpense(){
        return cy.get('.btn-primary');
    }
    get lastAddedMileage(){
        return cy.get('tbody > :nth-child(1) > :nth-child(2)');
    }
  

    selectCarByNameAndIndex(brand, model, index = 0) {
        const fullName = `${brand} ${model}`;
    
        cy.get('#carSelectDropdown')
            .invoke('text')
            .then((selectedCarByDefault) => {
                if (selectedCarByDefault !== fullName) {
                    cy.get('#carSelectDropdown').click();
                    
                    cy.get('.car-select-dropdown_menu .dropdown-item')
                        .filter(`:contains("${fullName}")`)
                        .eq(index)
                        .click({ force: true });
                }
            });
    }
    clickAddAnExpenseButton(){
        this.btnAddAnExpense.click();
    }
    verifyFuelExpenseIsAddedByAlert(){
        this.alertFuelExpenseAdded.should('be.visible');
    }
    verifyPageNameByText(text){
        this.pageName.should('have.text', text)
    }
    verifyFuelExtenseIsAdded(value){
        this.lastAddedMileage.should('have.text', value);
    }

}

export default new FuelExpensePage();