const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    watchForFileChanges: false,
    defaultCommandTimeout: 3000,
    "baseUrl": "http://pushing-front.vercel.app"
  },
});
