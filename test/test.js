'use strict';
var expect = require('chai').expect;
var Storage = require('../built/index.js').Storage;

var json = {
    value: 'some nasty value',
    value2: 'some other nasty value'
};

var jsonString = '{\"value\":\"some nasty value\",\"value2\":\"some other nasty value\"}';

var randomKey = Math.random().toString(36).substring(7);

describe('test Storage class methods', () => {
    it('set json in localStorage and sessionStorage', () => {
        // set storage in localStorage
        Storage.set(randomKey, json, true);
        expect(localStorage.getItem(randomKey)).to.equal(jsonString);
        // set storage in sessionStorage
        Storage.set(randomKey, json);
        expect(sessionStorage.getItem(randomKey)).to.equal(jsonString);
    });
    it('get json from localStorage and sessionStorage', () => {
        // get value from localStorage
        var result = Storage.get(randomKey, true);
        expect(result.value).to.equal(json.value);
        expect(result.value2).to.equal(json.value2);
        // get value from sessionStorage
        result = Storage.get(randomKey);
        expect(result.value).to.equal(json.value);
        expect(result.value2).to.equal(json.value2);
    });
    it('remove a localStorage and sessionStorage', () => {
        // remove from localStorage
        Storage.remove(randomKey, true);
        expect(localStorage.getItem(randomKey)).to.be.null;
        // remove from sessionStorage
        Storage.remove(randomKey);
        expect(sessionStorage.getItem(randomKey)).to.be.null;
    });
    it('remove total storages in a enviroment', () => {
        // set some local storages
        localStorage.setItem(`${randomKey}1`, jsonString);
        localStorage.setItem(`${randomKey}2`, jsonString);
        localStorage.setItem(`${randomKey}3`, jsonString);
        // set some session storages
        sessionStorage.setItem(`${randomKey}1`, jsonString);
        sessionStorage.setItem(`${randomKey}2`, jsonString);
        sessionStorage.setItem(`${randomKey}3`, jsonString);

        // remove total local storages
        Storage.clear(true);
        expect(localStorage.getItem(`${randomKey}1`)).to.be.null;
        expect(localStorage.getItem(`${randomKey}2`)).to.be.null;
        expect(localStorage.getItem(`${randomKey}3`)).to.be.null;
        expect(sessionStorage.getItem(`${randomKey}1`)).to.be.not.null;
        expect(sessionStorage.getItem(`${randomKey}2`)).to.be.not.null;
        expect(sessionStorage.getItem(`${randomKey}3`)).to.be.not.null;

        // remove total session storages
        Storage.clear();
        expect(sessionStorage.getItem(`${randomKey}1`)).to.be.null;
        expect(sessionStorage.getItem(`${randomKey}2`)).to.be.null;
        expect(sessionStorage.getItem(`${randomKey}3`)).to.be.null;
    });
    it('remove all storages', () => {
        // set some local storages
        localStorage.setItem(`${randomKey}1`, jsonString);
        localStorage.setItem(`${randomKey}2`, jsonString);
        localStorage.setItem(`${randomKey}3`, jsonString);
        // set some session storages
        sessionStorage.setItem(`${randomKey}1`, jsonString);
        sessionStorage.setItem(`${randomKey}2`, jsonString);
        sessionStorage.setItem(`${randomKey}3`, jsonString);

        // remove total storages
        Storage.clearAll();
        expect(localStorage.getItem(`${randomKey}1`)).to.be.null;
        expect(localStorage.getItem(`${randomKey}2`)).to.be.null;
        expect(localStorage.getItem(`${randomKey}3`)).to.be.null;
        expect(sessionStorage.getItem(`${randomKey}1`)).to.be.null;
        expect(sessionStorage.getItem(`${randomKey}2`)).to.be.null;
        expect(sessionStorage.getItem(`${randomKey}3`)).to.be.null;
    });
})