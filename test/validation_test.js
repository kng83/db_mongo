const assert = require('assert');
const User = require('../src/user');

describe('Validation records', () => {

    it('requires a user name', ()=>{
        //sprawdzenie test dla uzytkownika z opcja undefined
        // (tak by sprawdzic ze schematu requierd)
        //validation Result bedzie mial wynki porowanania calego modelu uzytkownika
        //validateSync jest podobna do validate ale wynik otrzymamy od razu w tej samej lini dlatego nie
        //trzeba dona i promisa
        const user = new User({name: undefined});
        const validationResult = user.validateSync();
        // dostep do erroru validacji
        //const message = validationResult.errors.name.message;
        // dla ES6 mozemy zrobic taki trick jezeli dostep do zmiennej konczy sie nazwa naszej zmiennej
        // console.log(message);
        // tekst message znajduje sie w obiekcie user
        const {message} = validationResult.errors.name;
        assert(message === 'Name is required.')

    })

})