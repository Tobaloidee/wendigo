"use strict";

const Wendigo = require('../../lib/wendigo');
const utils = require('../test_utils');
const configUrls = require('../config.json').urls;


describe("Assert Value", function() {
    this.timeout(5000);
    let browser;

    before(async () => {
        browser = await Wendigo.createBrowser();
    });

    beforeEach(async () => {
        await browser.open(configUrls.index);
    });

    after(async () => {
        await browser.close();
    });

    it("Assert Value", async () => {
        await browser.open(configUrls.forms);
        await browser.assert.value("input.input1", "");
        await browser.assert.value("input.input2", "default value");
    });

    it("Assert Value With Node", async () => {
        await browser.open(configUrls.forms);
        const node = await browser.query("input.input2");
        await browser.assert.value(node, "default value");
    });

    it("Assert Null Value", async () => {
        await browser.open(configUrls.forms);
        await browser.assert.value("h1", null);
        await browser.assert.value("input.not-exists", null);
    });

    it("Assert Value Throws", async () => {
        await browser.open(configUrls.forms);
        await utils.assertThrowsAssertionAsync (async () => {
            await browser.assert.value("input.input1", "False Text");
        }, `Expected element "input.input1" to have value "False Text", "" found`, "", "False Text");

        await utils.assertThrowsAssertionAsync (async () => {
            await browser.assert.value("input.input2", "False Text");
        }, `Expected element "input.input2" to have value "False Text", "default value" found`, "default value", "False Text");

        await utils.assertThrowsAssertionAsync (async () => {
            await browser.assert.value("input.not-exists", "False Text");
        }, `Expected element "input.not-exists" to have value "False Text", no value found`, null, "False Text");
    });

    it("Assert Value Throws Custom Message", async () => {
        await browser.open(configUrls.forms);
        await utils.assertThrowsAssertionAsync (async () => {
            await browser.assert.value("input.input1", "False Text", "value failed");
        }, `value failed`, "", "False Text");
    });

    it("Assert Not Value", async () => {
        await browser.open(configUrls.forms);
        await browser.assert.not.value("input.input1", "a value");
        await browser.assert.not.value("input.input1", "default value 2");
        await browser.assert.not.value("h1", "");
    });

    it("Assert Not Value From Node", async () => {
        await browser.open(configUrls.forms);
        const node = await browser.query("input.input1");
        await browser.assert.not.value(node, "a value");
    });

    it("Assert Not Value Throws", async () => {
        await browser.open(configUrls.forms);
        await utils.assertThrowsAssertionAsync (async () => {
            await browser.assert.not.value("input.input1", "");
        }, `Expected element "input.input1" not to have value ""`);

        await utils.assertThrowsAssertionAsync (async () => {
            await browser.assert.not.value("input.input2", "default value");
        }, `Expected element "input.input2" not to have value "default value"`);

        await utils.assertThrowsAssertionAsync (async () => {
            await browser.assert.not.value("h1", null);
        }, `Expected element "h1" not to have value "null"`);
    });

    it("Assert Not Value Throws", async () => {
        await browser.open(configUrls.forms);
        await utils.assertThrowsAssertionAsync (async () => {
            await browser.assert.not.value("input.input1", "", "not value failed");
        }, `not value failed`);
    });

});
