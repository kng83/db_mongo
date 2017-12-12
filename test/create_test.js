// test mocha sklada sie z funkcji descrbie i blokow it
// w bloku it sprawdzamy czy ta wartosc jest ta wartoscia ktora oczekiwalismy
const assert = require('assert');
const User = require('../src/user');

describe('Creating records', ()=>{
    it('save a user', (done)=>{
        // assert sprawdza czy twierdznie jest prawdziwe (assertion- twierdzenie assert-zapewniac dowiedziec sie czegos)
        // dodanie nowego uzytkownika
        const joe = new User({name: 'Joe'});

        //zapisz nowy rekord do bazy danych zwraca to promisa bo save jest asynchroniczny
        joe.save()
            .then(() =>{
                //sprawdzamy czy obiekt joe zostal zapisany z sukcesem
                //mongoose daje nam flage isNew (jest true gdy jest tylko w mocha a false gdy jest bazie i moche)
                //musimy tu dodac done bo odpowiedz jest asynchroniczna
                assert(!joe.isNew);
                done();
            });
    });
});