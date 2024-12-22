class RemoveCarConfirmationForm{

    get modalTitle(){
        return cy.get('.modal-title');
    }
    get btnRemove(){
        return cy.get('.modal-footer .btn-danger');
    }

    isModalTitleVisible(isVisible) {
        this.modalTitle.should(isVisible ? 'have.text' : 'not.be.visible', 'Remove car');
    }

    clickRemoveButton(){
        this.btnRemove.click();
    }


}

export default new RemoveCarConfirmationForm();