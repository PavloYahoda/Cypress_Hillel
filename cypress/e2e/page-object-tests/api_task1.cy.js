/// <reference types="cypress" />

import RequestData from "../../support/RequestData";
import dayjs from 'dayjs';

let token;
let carId;
let expenseId;

describe('Login', () => {

    before('Get token', () => {
        const body = {
            "email": Cypress.env('MAIN_USER_EMAIL'),
            "password": Cypress.env('MAIN_USER_PASSWORD'),
            "remember": false
        };

        cy.request(RequestData.getToken(body)).then((response) => {
            const tokenMatch = JSON.stringify(response.headers).match(/sid=(.*?);/);
            token = tokenMatch[1];
            cy.log(token);
        });
    });

    it('Add car', () => {
        const carBody = {
            "carBrandId": 1,
            "carModelId": 2,
            "mileage": 12200
        }
        cy.request(RequestData.addCar(carBody, token))
            .then((response) => {
                expect(response.status).to.eq(201);
                carId = response.body.data.id;
                cy.log(`Car ID: ${carId}`);
            })
    });
    it('Get car by Id: exist', () => {
        cy.request(RequestData.getCarById(carId, token))
            .then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body.data.brand).to.eq('Audi');
                expect(response.body.data.model).to.eq('R8');
                expect(response.body.data.mileage).to.eq(12200);
            })
    });
    it('Add expense by carId', () => {
        const expenseBody = {
            "carId": carId,
            "reportedAt": dayjs().format('YYYY-MM-DD'),
            "mileage": 13300,
            "liters": 60,
            "totalCost": 250,
            "forceMileage": false
        }
        cy.request(RequestData.addExpense(expenseBody, token))
            .then((response) => {
                expect(response.status).to.eq(200);
                expenseId = response.body.data.id;
                cy.log(`Extense ID: ${expenseId}`);
            })
    });
    it('Get extense by Id', () => {
        cy.request(RequestData.getExpenseById(expenseId, token))
            .then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body.data.carId).to.eq(carId);
                expect(response.body.data.mileage).to.eq(13300);
                expect(response.body.data.liters).to.eq(60);
                expect(response.body.data.totalCost).to.eq(250);
            })
    });
    it('Edit expense by Id', () => {
        const expenseBody = {
            "carId": carId,
            "reportedAt": dayjs().format('YYYY-MM-DD'),
            "mileage": 15500,
            "liters": 80,
            "totalCost": 330,
            "forceMileage": false
        }
        cy.request(RequestData.editExpenseById(expenseId, expenseBody, token))
            .then((response) => {
                expect(response.status).to.eq(200);
            })
    });
    it('Get extense by Id after changes', () => {
        cy.request(RequestData.getExpenseById(expenseId, token))
            .then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body.data.carId).to.eq(carId);
                expect(response.body.data.mileage).to.eq(15500);
                expect(response.body.data.liters).to.eq(80);
                expect(response.body.data.totalCost).to.eq(330);
            })
    });
    it('Add second expense by carId', () => {
        const expenseBody = {
            "carId": carId,
            "reportedAt": dayjs().format('YYYY-MM-DD'),
            "mileage": 17000,
            "liters": 80,
            "totalCost": 420,
            "forceMileage": false
        }
        cy.request(RequestData.addExpense(expenseBody, token))
            .then((response) => {
                expect(response.status).to.eq(200);
            })
    });
    it('Get all extenses by carId and page number', () => {
        cy.request(RequestData.getAllExpenses(carId, 1, token))
            .then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body.totalItems).to.eq(2);
            })
    });
    it('Remove expense by Id', () => {
        cy.request(RequestData.removeExpense(expenseId, token)).then((response) => {
            expect(response.status).to.eq(200);
        })
    });
    it('Get all extenses after removing', () => {
        cy.request(RequestData.getAllExpenses(carId, 1, token))
            .then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body.totalItems).to.eq(1);
            })
    });
    it('Remove car', () => {
        cy.request(RequestData.removeCar(carId, token)).then((response) => {
            expect(response.status).to.eq(200);
        })
    });
    it('Get car by Id: deleted', () => {
        cy.request(RequestData.getCarById(carId, token)).then((response) => {
            expect(response.status).to.eq(404);
            expect(response.body.message).to.include('Car not found');
            cy.log('Car is successfully deleted');
        });
    });
})