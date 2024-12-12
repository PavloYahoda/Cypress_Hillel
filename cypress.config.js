const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    chromeWebSecurity: false,
    //baseUrl: '',
    retries: {
      runMode: 2,
      openMode: 3
    },
    viewportWidth: 1920,
    viewportHeight: 1080,
    video: true,
  },
});
