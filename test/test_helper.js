const mongoose = require('mongoose')

// connect to data base user_test (user_test to baza danych)
// mongo i mongoose stworza ta baze jezeli jej nie ma
mongoose.connect('mongodb://localhost/user_test');

//ponizej sa dwa eventy od mongoose open i on
mongoose.connection
    .once('open', () => console.log('Good to go !'))
    .on('error', (error) => {
        console.warn('!!!Warning: ', error);
        console.log('Color 0A')
    });

// dodajemy tak zwany hook (hak)-jest to funkcja wykonywana przed kazdym naszym testem
// wykonujemy ja poniewaz kazde uruchomienie testu powiela nam ten sam rekord i mamy wiele jou-ow
// beforeEach jest tak zwanym hookiem

beforeEach((done) => {
    // funcja usuwania kolekcji naszej jest promise poniewaz mongoose potrzebuje czasu na laczenie z mongo
    // dodajemy done callback aby opoznic uruchominie reszty kodu
    mongoose.connection.collections.users.drop(()=>{
        //gotowy do uruchomienia nastepnego testu
        done();
    });
});
