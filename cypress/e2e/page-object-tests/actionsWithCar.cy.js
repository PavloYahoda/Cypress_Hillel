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
    // For actions on forms Audi TT should be present in Garage.
    let brand = "Ford";
    let model = "Fusion";
    let mileage = "17000";
    
    beforeEach(() => {
        HomePage.open();
        HomePage.clickSignInButton();
        SignInForm.fillEmail(Helper.testUserEmail);
        SignInForm.fillPassword(Helper.testUserPassword);
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
        })
    });   
})