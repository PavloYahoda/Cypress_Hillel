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
    get errorMessageWrongMileage(){
        return cy.contains('.alert-danger', 'New mileage must not be less or equal to previous expense value. Previous expense value is 1236');
    }




    isModalTitleVisible(isVisible) {
        this.modalTitle.should(isVisible ? 'have.text' : 'not.be.visible', 'Add an expense');
    }
    fillMileage(value){
        this.fieldMileage.clear();
        this.fieldMileage.type(value);
        this.fieldMileage.blur();
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
    verifyFieldErrorByText(text){
        cy.contains('.invalid-feedback > p', text).should('be.visible');
    }
    verifyErrorMessageIsDisplayed(){
        this.errorMessageWrongMileage.should('be.visible');
    }
    triggerEmptyErrorMessageByField(fieldName){
        const element = fieldName === 'Number of liters' ? this.fieldNumberOfLiters : this.fieldTotalCost;
        element.focus();
        element.blur();
    }
}

export default new AddFuelExpenseForm();