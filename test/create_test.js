// test mocha sklada sie z funkcji descrbie i blokow it
// w bloku it sprawdzamy czy ta wartosc jest ta wartoscia ktora oczekiwalismy
const assert = require('assert');
const User = require('../src/user');

describe('Creating records', ()=>{
    it('save a user', ()=>{
        // assert sprawdza czy twierdznie jest prawdziwe (assertion- twierdzenie assert-zapewniac dowiedziec sie czegos)
        //dodanie nowego uzytkownika
        const joe = new User({name: 'Joe'});
        joe.save();
    });
});