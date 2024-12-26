class SideBar{

    get tabGarage(){
        return cy.get('.sidebar [routerlink="garage"]');
    }
    get tabFuelExtenses(){
        return cy.get('.sidebar [routerlink="expenses"]');
    }
    get tabProfile(){
        return cy.get('.sidebar [routerlink="profile"]');
    }



    clickGarageTab(){
        this.tabGarage.click();
    }
    clickFuelExpensesTab(){
        this.tabFuelExtenses.click();
    }
    clickProfileTab(){
        this.tabProfile.click();
    }


}

export default new SideBar();