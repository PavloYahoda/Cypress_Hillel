class EditCarForm{

    get modalTitle(){
        return cy.get('.modal-title'); 
    }
    get btnSaveCar(){
        return cy.contains('.modal-footer .btn-primary', 'Save');
    }
    get btnRemoveCar(){
        return cy.contains('.modal-footer .btn-outline-danger', 'Remove car');
    }
    get btnCancel(){
        return cy.contains('.btn-secondary', 'Cancel');
    }
    get fieldMileage(){
        return cy.get('input[name="mileage"]');
    }
    get errorMessageWrongMileage(){
        return cy.contains('.alert-danger', 'First expense mileage must not be less or equal to car initial mileage. Car initial mileage is 1236');
    }
    get errorMessageLessMileage(){
        return cy.contains('.alert-danger', 'New mileage is less then previous entry');
    }



    isModalTitleVisible(isVisible) {
        this.modalTitle.should(isVisible ? 'have.text' : 'not.be.visible', 'Edit a car');
    }
    clickSaveButton(){
        this.btnSaveCar.click();
    }
    clickRemoveCarButton(){
        this.btnRemoveCar.click();
    }
    clickCancelButton(){
        this.btnCancel.click();
    }
    fillMileage(value){
        this.fieldMileage.clear();
        this.fieldMileage.type(value);
        this.fieldMileage.blur();
    }
    clearMileageField(){
        this.fieldMileage.clear();
        this.fieldMileage.blur();
    }
    verifySaveButtonIsDisabled(){
        this.btnSaveCar.should('be.disabled');
    }
    verifyFieldErrorByText(text){
        cy.contains('.invalid-feedback p', text).should('be.visible');
    }
    verifyErrorMessageIsDisplayed(){
        this.errorMessageWrongMileage.should('be.visible');
    }
    verifyErrorMessageLessMileage(){
        this.errorMessageLessMileage.should('be.visible');
    }
}
export default new EditCarForm();