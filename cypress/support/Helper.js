const { faker } = require('@faker-js/faker');

class Helper {
  
  static testUserEmail = "jack.black@gmail.com";
  static testUserPassword = "Admin123!";
  
  
  
  static generateRandomUser() {
    const fName = faker.person.firstName();
    const lName = faker.person.lastName();
    const email = `${fName}.${lName}@mail.co`.toLowerCase();
    return {
      firstName: fName,
      lastName: lName,
      email: email,
    };
  }


}

// static generateRandomUser() {
//   return {
//     firstName: faker.person.firstName(), // Замість faker.name.firstName()
//     lastName: faker.person.lastName(),   // Замість faker.name.lastName()
//     email: faker.internet.email(),
//     address: faker.location.streetAddress(), // Замість faker.address.streetAddress()
//     city: faker.location.city(),            // Замість faker.address.city()
//     phone: faker.phone.number(),
//   };
// }

module.exports = Helper;