class EditCarForm{

    get modalTitle(){
        return cy.get('.modal-title');
    }
    get btnRemoveCar(){
        return cy.get('.modal-footer .btn-outline-danger');
    }
    get btnCancel(){
        return cy.contains('.btn-secondary', 'Cancel');
    }



    isModalTitleVisible(isVisible) {
        this.modalTitle.should(isVisible ? 'have.text' : 'not.be.visible', 'Edit a car');
    }
    clickRemoveCarButton(){
        this.btnRemoveCar.click();
    }
    clickCancelButton(){
        this.btnCancel.click();
    }

}
export default new EditCarForm();