class AddCarForm{

    get modalTitle(){
        return cy.get('.modal-title');
    }
    get btnAdd(){
        return cy.contains('.modal-footer > .btn-primary', 'Add');
    }
    get btnCancel(){
        return cy.contains('.btn-secondary', 'Cancel');
    }
    get fieldMileage(){
        return cy.get('input[name="mileage"]');
    }
    get errorMessage(){
        return cy.get('.invalid-feedback p');
    }

    selectBrandByName(brand) {
        const availableBrands = ["Audi", "BMW", "Ford", "Porsche", "Fiat"];
        if (availableBrands.includes(brand)) {
            cy.get('select[name="carBrandId"]').select(brand);
        } else {
            cy.log(`Brand ${brand} is not available. Check test data.`);
        }
    }
    selectModelByName(brand, model) {
        const availableModels = {
            Audi: ["TT", "R8", "Q7", "A6", "A8"],
            BMW: ["3", "5", "X5", "X6", "Z3"],
            Ford: ["Fiesta", "Focus", "Fusion", "Mondeo", "Sierra"],
            Porsche: ["911", "Cayenne", "Panamera"],
            Fiat: ["Palio", "Ducato", "Panda", "Punto", "Scudo"]
        };
    
        if (availableModels[brand] && availableModels[brand].includes(model)) {
            cy.get('select[name="carModelId"]').select(model);
        } else {
            cy.log(`${brand} or model ${model} is not available. Check test data.`);
        }
    }

    fillMileage(value){
        this.fieldMileage.clear();
        this.fieldMileage.type(value);
        this.fieldMileage.blur(); //for negative scenario
    }

    clickAddButton(){
        this.btnAdd.click();
    }

    clickCancelButton(){
        this.btnCancel.click();
    }

    verifyFieldErrorIsDisplayed(){
        this.errorMessage.should('include.text', 'Mileage has to be from 0 to 999999');
    }
    verifyAddButtonIsDisabled(){
        this.btnAdd.should('be.disabled');
    }
    isModalTitleVisible(isVisible) {
        this.modalTitle.should(isVisible ? 'have.text' : 'not.be.visible', 'Add a car');
    }
}

export default new AddCarForm();