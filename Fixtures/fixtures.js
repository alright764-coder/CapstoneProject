const { test: base,expect } = require('@playwright/test');
const POMManager = require('../PageObjectModel/pom');

const test = base.extend({pomanager: async ({ page }, use) => {
        const pomanager = new POMManager(page);
        await use(pomanager);
    }
});

module.exports = { test,expect };