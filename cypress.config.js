const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  e2e: {
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
      // on('after:run', (results) => {
      //   console.log('Tests completed:', results);
      // });
    },

    supportFile: 'cypress/support/e2e.js',
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
      BASEURL: "https://guest:welcome2qauto@qauto.forstudy.space",
      MAIN_USER_EMAIL: "jack.black@gmail.com",
      MAIN_USER_PASSWORD: "Admin123!",
    }
  },
  reporterOptions: {
    reportDir: 'cypress/reports',
    overwrite: true,
    html: true,
    json: true,
  },
});
