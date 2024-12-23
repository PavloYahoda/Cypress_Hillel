const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    
    baseUrl: 'https://guest:welcome2qauto@qauto2.forstudy.space',
    chromeWebSecurity: false,
    // retries: {
    //   runMode: 2,
    //   openMode: 3
    // },
    viewportWidth: 1920,
    viewportHeight: 1080,

    video: true,
    screenshotOnRunFailure: true,

    reporter: 'cypress-mochawesome-reporter',
    setupNodeEvents(on, config){
      require('cypress/node-modules/cypress-mochawesome-reporter/plugin')(on);
    },

    env: {
      MAIN_USER_EMAIL: "jack.black+test1@gmail.com",
      MAIN_USER_PASSWORD: "Admin123!",
    }
  },
});
