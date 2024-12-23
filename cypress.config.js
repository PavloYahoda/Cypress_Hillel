const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
      // on('after:run', (results) => {
      //   console.log('Tests completed:', results);
      // });
    },
    baseUrl: 'https://guest:welcome2qauto@qauto.forstudy.space',
    chromeWebSecurity: false,
    // retries: {
    //   runMode: 2,
    //   openMode: 3
    // },
    viewportWidth: 1920,
    viewportHeight: 1080,
    video: true,
    screenshotOnRunFailure: true,

    env: {
      MAIN_USER_EMAIL: "jack.black@gmail.com",
      MAIN_USER_PASSWORD: "Admin123!",
    }
  },
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportDir: 'cypress/reports',
    overwrite: true,
    html: true,
    json: true,
  },
});
