class SideBar{

    get tabGarage(){
        return cy.get('.sidebar [routerlink="garage"]');
    }
    get tabFuelExtenses(){
        return cy.get('.sidebar [routerlink="expenses"]');
    }



    clickGarageTab(){
        this.tabGarage.click();
    }
    clickFuelExpensesTab(){
        this.tabFuelExtenses.click();
    }


}

export default new SideBar();