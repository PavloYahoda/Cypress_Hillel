/// <reference types="cypress" />

import Helper from "../../support/Helper";

import HomePage from "../../page-object/pages/HomePage";
import SignInForm from "../../page-object/forms/SignInForm";
import GaragePage from "../../page-object/pages/GaragePage";
import AddCarForm from "../../page-object/forms/AddCarForm";
import EditCarForm from "../../page-object/forms/EditCarForm";
import RemoveCarConfirmationForm from "../../page-object/forms/RemoveCarConfirmationForm";
import AddFuelExpenseForm from "../../page-object/forms/AddFuelExpenseForm";
import FuelExpensePage from "../../page-object/pages/FuelExpensePage";
import SideBar from "../../page-object/components/SideBar";



describe('Actions with car: add car, add fuel expenses, edit data, remove car', () => {
    
    //Preconditions: 
    // No car with brand and model spesified in variables is present in Garage.
    // For actions on forms Audi TT should be present in Garage (mileage = 1236).
    let brand = "Ford";
    let model = "Fusion";
    let mileage = "17000";
    
    beforeEach(() => {
        HomePage.open();
        HomePage.clickSignInButton();
        SignInForm.fillEmail(Cypress.env('MAIN_USER_EMAIL'));
        SignInForm.fillPassword(Cypress.env('MAIN_USER_PASSWORD'));
        SignInForm.clickLoginButton();
        GaragePage.verifySuccessLoginByAlert();
        GaragePage.verifyPageNameByText('Garage');
    });

    describe('Main scenario: Add car > Add fuel expense > Remove car', () => {
        it('Add a car', () => {
            GaragePage.clickAddCarButton();
            AddCarForm.isModalTitleVisible(true);
            AddCarForm.selectBrandByName(brand);
            AddCarForm.selectModelByName(brand, model);
            AddCarForm.fillMileage(mileage);
            AddCarForm.clickAddButton();
            GaragePage.verifyCarIsAddedByAlert();
            GaragePage.verifyCarIsDisplayed(brand, model);
        });
        it('Add fuel expense from Garage page', () => {

            const newMileage = '17600';

            GaragePage.clickAddFuelExpenseButton(brand, model);
            AddFuelExpenseForm.isModalTitleVisible(true);
            AddFuelExpenseForm.fillMileage(newMileage);
            AddFuelExpenseForm.fillNumberOfLiters('40');
            AddFuelExpenseForm.fillTotalCost('78.5');
            AddFuelExpenseForm.clickAddButton();
            AddFuelExpenseForm.isModalTitleVisible(false);
            FuelExpensePage.verifyFuelExpenseIsAddedByAlert();
            FuelExpensePage.verifyPageNameByText('Fuel expenses');
            FuelExpensePage.verifyFuelExtenseIsAdded(newMileage);
        });
        it('Add fuel expense from Fuel Expenses page', () => {
            
            const newMileage = '18000';

            SideBar.clickFuelExpensesTab();
            FuelExpensePage.verifyPageNameByText('Fuel expenses');
            FuelExpensePage.selectCarByNameAndIndex(brand, model);
            FuelExpensePage.clickAddAnExpenseButton();
            AddFuelExpenseForm.isModalTitleVisible(true);
            AddFuelExpenseForm.fillMileage(newMileage);
            AddFuelExpenseForm.fillNumberOfLiters('335');
            AddFuelExpenseForm.fillTotalCost('63');
            AddFuelExpenseForm.clickAddButton();
            AddFuelExpenseForm.isModalTitleVisible(false);
            FuelExpensePage.verifyFuelExpenseIsAddedByAlert();
            FuelExpensePage.verifyPageNameByText('Fuel expenses');
            FuelExpensePage.verifyFuelExtenseIsAdded(newMileage);
        });
        it('Remove a car', () => {
            GaragePage.verifyCarIsDisplayed(brand, model);
            GaragePage.clickEditCarButton(brand, model);
            EditCarForm.isModalTitleVisible(true);
            EditCarForm.clickRemoveCarButton();
            RemoveCarConfirmationForm.isModalTitleVisible(true);
            RemoveCarConfirmationForm.clickRemoveButton();
            EditCarForm.isModalTitleVisible(false);
            GaragePage.verifyCarIsRemoved(brand, model);
        });
    });
    
    describe('Actions on "Add a car" form', () => {
        it('Adding a car with negative mileage', () => {
            GaragePage.clickAddCarButton();
            AddCarForm.isModalTitleVisible(true);
            AddCarForm.selectBrandByName('Audi');
            AddCarForm.selectModelByName('Audi', 'TT');
            AddCarForm.fillMileage('-56');
            AddCarForm.verifyFieldErrorIsDisplayed();
            AddCarForm.verifyAddButtonIsDisabled();
        });
        it('Check Cancel button on "Add a car" form', () => {
            GaragePage.clickAddCarButton();
            AddCarForm.isModalTitleVisible(true);
            AddCarForm.selectBrandByName('Audi');
            AddCarForm.selectModelByName('Audi', 'TT');
            AddCarForm.fillMileage(mileage);
            AddCarForm.clickCancelButton();
            AddCarForm.isModalTitleVisible(false);
        });
    });
    describe('Actions on "Edit car" form', () => {
        it('Check Cancel button on "Edit car" form', () => {
            GaragePage.verifyCarIsDisplayed('Audi', 'TT');
            GaragePage.clickEditCarButton('Audi', 'TT');
            EditCarForm.isModalTitleVisible(true);
            EditCarForm.clickCancelButton();
            EditCarForm.isModalTitleVisible(false);
        });
        it('Edit car form: fill with negative value', () => {
            GaragePage.verifyCarIsDisplayed('Audi', 'TT');
            GaragePage.clickEditCarButton('Audi', 'TT');
            EditCarForm.isModalTitleVisible(true);
            EditCarForm.fillMileage('-40');
            EditCarForm.verifyFieldErrorByText('Mileage has to be from 0 to 999999');
            EditCarForm.verifySaveButtonIsDisabled();
        });
        it('Edit car form: save with less value', () => {
            GaragePage.verifyCarIsDisplayed('Audi', 'TT');
            GaragePage.clickEditCarButton('Audi', 'TT');
            EditCarForm.isModalTitleVisible(true);
            EditCarForm.fillMileage('1230');
            EditCarForm.clickSaveButton();
            EditCarForm.verifyErrorMessageLessMileage();
        });
        it('Edit car form: save with empty value', () => {
            GaragePage.verifyCarIsDisplayed('Audi', 'TT');
            GaragePage.clickEditCarButton('Audi', 'TT');
            EditCarForm.isModalTitleVisible(true);
            EditCarForm.clearMileageField();
            EditCarForm.verifyFieldErrorByText('Mileage cost required');
            EditCarForm.verifySaveButtonIsDisabled();
        });

        //Fill with 0 has different result on second version of site
        // it('Edit car form: save with 0', () => {
        //     GaragePage.verifyCarIsDisplayed('Audi', 'TT');
        //     GaragePage.clickEditCarButton('Audi', 'TT');
        //     EditCarForm.isModalTitleVisible(true);
        //     EditCarForm.fillMileage('0');
        //     EditCarForm.clickSaveButton();
        //     EditCarForm.isModalTitleVisible(false);
        //     GaragePage.verifyCarIsUpdatedByAlert();
        //     GaragePage.verifyMileageIsNotChanged('Audi', 'TT');
        // });
    });
    describe('Actions on "Add an expense" form', () => {
        it('Check Cancel button on "Add an expense" form', () => {
            SideBar.clickFuelExpensesTab();
            FuelExpensePage.verifyPageNameByText('Fuel expenses');
            FuelExpensePage.selectCarByNameAndIndex('Audi', 'TT');
            FuelExpensePage.clickAddAnExpenseButton();
            AddFuelExpenseForm.isModalTitleVisible(true);
            AddFuelExpenseForm.clickCancelButton();
            AddFuelExpenseForm.isModalTitleVisible(false);
        });
        it('Add fuel expense with the same mileage', () => {
            SideBar.clickFuelExpensesTab();
            FuelExpensePage.verifyPageNameByText('Fuel expenses');
            FuelExpensePage.selectCarByNameAndIndex('Audi', 'TT');
            FuelExpensePage.clickAddAnExpenseButton();
            AddFuelExpenseForm.isModalTitleVisible(true);
            AddFuelExpenseForm.fillNumberOfLiters('40');
            AddFuelExpenseForm.fillTotalCost('8.3');
            AddFuelExpenseForm.clickAddButton();
            AddFuelExpenseForm.verifyErrorMessageIsDisplayed();
        });
        it('Add fuel expense with empty "Number of liters" field', () => {
            SideBar.clickFuelExpensesTab();
            FuelExpensePage.verifyPageNameByText('Fuel expenses');
            FuelExpensePage.selectCarByNameAndIndex('Audi', 'TT');
            FuelExpensePage.clickAddAnExpenseButton();
            AddFuelExpenseForm.isModalTitleVisible(true);
            AddFuelExpenseForm.fillMileage('98700');
            AddFuelExpenseForm.triggerEmptyErrorMessageByField('Number of liters');
            AddFuelExpenseForm.fillTotalCost('8.3');
            AddFuelExpenseForm.verifyFieldErrorByText('Liters required');
            AddFuelExpenseForm.verifyAddButtonIsDisabled();
        });
        it('Add fuel expense with empty "Total cost" field', () => {
            SideBar.clickFuelExpensesTab();
            FuelExpensePage.verifyPageNameByText('Fuel expenses');
            FuelExpensePage.selectCarByNameAndIndex('Audi', 'TT');
            FuelExpensePage.clickAddAnExpenseButton();
            AddFuelExpenseForm.isModalTitleVisible(true);
            AddFuelExpenseForm.fillMileage('98700');
            AddFuelExpenseForm.fillNumberOfLiters('40');
            AddFuelExpenseForm.triggerEmptyErrorMessageByField('Total cost');
            AddFuelExpenseForm.verifyFieldErrorByText('Total cost required');
            AddFuelExpenseForm.verifyAddButtonIsDisabled();
        });
        it('Add fuel expense with negative liters', () => {
            SideBar.clickFuelExpensesTab();
            FuelExpensePage.verifyPageNameByText('Fuel expenses');
            FuelExpensePage.selectCarByNameAndIndex('Audi', 'TT');
            FuelExpensePage.clickAddAnExpenseButton();
            AddFuelExpenseForm.isModalTitleVisible(true);
            AddFuelExpenseForm.fillMileage('98700');
            AddFuelExpenseForm.fillNumberOfLiters('-40');
            AddFuelExpenseForm.fillTotalCost('8.3');
            AddFuelExpenseForm.verifyFieldErrorByText('Liters has to be from 0.01 to 9999');
            AddFuelExpenseForm.verifyAddButtonIsDisabled();
        });
        it('Add fuel expense with negative cost', () => {
            SideBar.clickFuelExpensesTab();
            FuelExpensePage.verifyPageNameByText('Fuel expenses');
            FuelExpensePage.selectCarByNameAndIndex('Audi', 'TT');
            FuelExpensePage.clickAddAnExpenseButton();
            AddFuelExpenseForm.isModalTitleVisible(true);
            AddFuelExpenseForm.fillMileage('98700');
            AddFuelExpenseForm.fillTotalCost('-10');
            AddFuelExpenseForm.fillNumberOfLiters('40');
            AddFuelExpenseForm.verifyFieldErrorByText('Total cost has to be from 0.01 to 1000000');
            AddFuelExpenseForm.verifyAddButtonIsDisabled();
        });
        it('Add fuel expense with 0 liters', () => {
            SideBar.clickFuelExpensesTab();
            FuelExpensePage.verifyPageNameByText('Fuel expenses');
            FuelExpensePage.selectCarByNameAndIndex('Audi', 'TT');
            FuelExpensePage.clickAddAnExpenseButton();
            AddFuelExpenseForm.isModalTitleVisible(true);
            AddFuelExpenseForm.fillMileage('98700');
            AddFuelExpenseForm.fillNumberOfLiters('0');
            AddFuelExpenseForm.fillTotalCost('8.2');
            AddFuelExpenseForm.verifyFieldErrorByText('Liters has to be from 0.01 to 9999');
            AddFuelExpenseForm.verifyAddButtonIsDisabled();
        });
        it('Add fuel expense with 0 cost', () => {
            SideBar.clickFuelExpensesTab();
            FuelExpensePage.verifyPageNameByText('Fuel expenses');
            FuelExpensePage.selectCarByNameAndIndex('Audi', 'TT');
            FuelExpensePage.clickAddAnExpenseButton();
            AddFuelExpenseForm.isModalTitleVisible(true);
            AddFuelExpenseForm.fillMileage('98700');
            AddFuelExpenseForm.fillTotalCost('0');
            AddFuelExpenseForm.fillNumberOfLiters('40');
            AddFuelExpenseForm.verifyFieldErrorByText('Total cost has to be from 0.01 to 1000000');
            AddFuelExpenseForm.verifyAddButtonIsDisabled();
        });
    });   
})