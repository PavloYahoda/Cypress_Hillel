class RequestData {
    // Endpoints:
    endpointSignIn = '/api/auth/signin';
    endpointAddCar = '/api/cars';
    endpointGetCar = '/api/cars/';
    endpointAddExpense = '/api/expenses';
    endpointGetExpense = '/api/expenses/';

    getToken(body) {
        return {
            method: 'POST',
            url: Cypress.env('BASEURL') + this.endpointSignIn,
            body: body,
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json'
            }
        };
    }
    addCar(body, token) {
        return {
            method: 'POST',
            url: this.endpointAddCar,
            body: body,
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json',
                'Cookie': `sid = ${token}`
            }
        }
    }
    getCarById(id, token) {
        return {
            method: 'GET',
            url: this.endpointGetCar + id,
            failOnStatusCode: false,
            headers: {
                'accept': 'application/json',
                'Cookie': `sid = ${token}`
            }
        }
    }
    addExpense(body, token) {
        return {
            method: 'POST',
            url: this.endpointAddExpense,
            body: body,
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json',
                'Cookie': `sid = ${token}`
            }
        }
    }
    getExpenseById(expenseId, token) {
        return {
            method: 'GET',
            url: this.endpointGetExpense + expenseId,
            failOnStatusCode: false,
            headers: {
                'accept': 'application/json',
                'Cookie': `sid = ${token}`
            }
        }
    }
    getAllExpenses(carId, page, token) {
        return {
            method: 'GET',
            url: this.endpointAddExpense,
            qs: {
                carId: carId,
                page: page,
            },
            headers: {
                'accept': 'application/json',
                'Cookie': `sid = ${token}`
            }
        }
    }
    editExpenseById(expenseId, body, token) {
        return {
            method: 'PUT',
            url: this.endpointGetExpense + expenseId,
            body: body,
            failOnStatusCode: false,
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json',
                'Cookie': `sid = ${token}`
            }
        }
    }
    removeExpense(id, token) {
        return {
            method: 'DELETE',
            url: this.endpointGetExpense + id,
            headers: {
                'accept': 'application/json',
                'Cookie': `sid = ${token}`
            }
        }
    }


    removeCar(id, token) {
        return {
            method: 'DELETE',
            url: this.endpointGetCar + id,
            headers: {
                'accept': 'application/json',
                'Cookie': `sid = ${token}`
            }
        }
    }

}

export default new RequestData();