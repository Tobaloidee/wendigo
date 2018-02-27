"use strict";

const Wendigo = require('../../lib/wendigo');
const utils = require('../utils');
const configUrls = require('../config.json').urls;

describe("Assert Attribute", function() {
    this.timeout(5000);
    let browser;

    before(async () => {
        browser = await Wendigo.createBrowser();
    });

    after(async() => {
        await browser.close();
    });

    it("Attribute", async() => {
        await browser.open(configUrls.index);
        await browser.assert.attribute(".hidden-text", "class", "hidden-text");
        await browser.assert.attribute(".hidden-text", "hidden", "");
    });

    it("Attribute Without Expected", async() => {
        await browser.open(configUrls.index);
        await browser.assert.attribute(".hidden-text", "class");
        await browser.assert.attribute(".hidden-text", "hidden");
    });

    it("Attribute From Node", async() => {
        await browser.open(configUrls.index);
        const element = await browser.query(".hidden-text");
        await browser.assert.attribute(element, "class", "hidden-text");
        await browser.assert.attribute(element, "hidden", "");
    });

    it("Attribute Throws", async() => {
        await browser.open(configUrls.index);
        await utils.assertThrowsAssertionAsync(async () => {
            await browser.assert.attribute(".hidden-text", "class", "hidden");
        }, `Expected element ".hidden-text" to have attribute "class" with value "hidden", "hidden-text" found.`);

        await utils.assertThrowsAssertionAsync(async () => {
            await browser.assert.attribute(".second-element", "hidden");
        }, `Expected element ".second-element" to have attribute "hidden".`);
    });

    it("Attribute Throws With No Element Found", async() => {
        await browser.open(configUrls.index);

        await utils.assertThrowsAssertionAsync(async () => {
            await browser.assert.attribute(".not-an-element", "class", "hidden");
        }, `Expected element ".not-an-element" to have attribute "class" with value "hidden", no element found.`);
    });

    it("Attribute Throws With Custom Message", async() => {
        await browser.open(configUrls.index);

        await utils.assertThrowsAssertionAsync(async () => {
            await browser.assert.attribute(".hidden-text", "class", "hidden", "attribute error");
        }, `attribute error`);
        await utils.assertThrowsAssertionAsync(async () => {
            await browser.assert.attribute(".hidden-text", "href", undefined, "attribute error 2");
        }, `attribute error 2`);
    });

    it("Attribute Equals Null", async() => {
        await browser.open(configUrls.index);
        await browser.assert.attribute(".hidden-text", "href", null);
    });

    it("Not Attribute", async() => {
        await browser.open(configUrls.index);
        await browser.assert.not.attribute(".hidden-text", "class", "not-hidden-text");
    });

    it("Not Attribute Without Value", async() => {
        await browser.open(configUrls.index);
        await browser.assert.not.attribute(".hidden-text", "href");
    });

    it("Not Attribute Throws", async() => {
        await browser.open(configUrls.index);
        await utils.assertThrowsAssertionAsync(async () => {
            await browser.assert.not.attribute(".hidden-text", "class", "hidden-text");
        }, `Expected element ".hidden-text" not to have attribute "class" with value "hidden-text".`);
    });

    it("Not Attribute Without Value Throws", async() => {
        await browser.open(configUrls.index);
        await utils.assertThrowsAssertionAsync(async () => {
            await browser.assert.not.attribute(".hidden-text", "hidden");
        }, `Expected element ".hidden-text" not to have attribute "hidden".`);
        await utils.assertThrowsAssertionAsync(async () => {
            await browser.assert.not.attribute(".hidden-text", "class");
        }, `Expected element ".hidden-text" not to have attribute "class".`);
    });

    it("Not Attribute With No Element Found Throws", async() => {
        await browser.open(configUrls.index);
        await utils.assertThrowsAssertionAsync(async () => {
            await browser.assert.not.attribute(".not-element", "hidden");
        }, `Expected element ".not-element" not to have attribute "hidden", no element found.`);
    });

    it("Not Attribute From Node", async() => {
        await browser.open(configUrls.index);
        const node = await browser.query(".hidden-text");
        await browser.assert.not.attribute(node, "class", "not-hidden-text");
    });

    it("Not Attribute Throws Custom Message", async () => {
        await browser.open(configUrls.index);
        await utils.assertThrowsAssertionAsync(async () => {
            await browser.assert.not.attribute(".hidden-text", "class", "hidden-text", "custom msg");
        }, `custom msg`);
        await utils.assertThrowsAssertionAsync(async () => {
            await browser.assert.not.attribute(".hidden-text", "hidden", null, "custom msg 2");
        }, `custom msg 2`);
    });
});
