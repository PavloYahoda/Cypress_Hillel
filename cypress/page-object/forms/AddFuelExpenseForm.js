class AddFuelExpenseForm{

    get modalTitle(){
        return cy.get('.modal-title');
    }
    get fieldMileage(){
        return cy.get('input[name="mileage"]');
    }
    get fieldNumberOfLiters(){
        return cy.get('input[name="liters"]');
    }
    get fieldTotalCost(){
        return cy.get('input[name="totalCost"]');
    }
    get btnCancel(){
        return cy.contains('.btn-secondary', 'Cancel');
    }
    get btnAdd(){
        return cy.contains('.modal-footer > .btn-primary', 'Add');
    }




    isModalTitleVisible(isVisible) {
        this.modalTitle.should(isVisible ? 'have.text' : 'not.be.visible', 'Add an expense');
    }
    fillMileage(value){
        this.fieldMileage.clear();
        this.fieldMileage.type(value);
    }
    fillNumberOfLiters(value){
        this.fieldNumberOfLiters.type(value);
    }
    fillTotalCost(value){
        this.fieldTotalCost.type(value);
    }
    clickCancelButton(){
        this.btnCancel.click();
    }
    clickAddButton(){
        this.btnAdd.click();
    }
    verifyAddButtonIsDisabled(){
        this.btnAdd.should('be.disabled');
    }




}

export default new AddFuelExpenseForm();