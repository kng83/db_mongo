const mongoose = require('mongoose');
/*Dodanie globalnych obietnic do mongoosa poniewaz uzywa on starych ze wzgledu na kompatybilnosc
* jest do wyboru bluebird q i es6. Wybieramy kompatybilnosc z es6*/
 mongoose.Promise = global.Promise;

// connect to data base user_test (user_test to baza danych)
// mongo i mongoose stworza ta baze jezeli jej nie ma
// before((done)=>{
//     mongoose.connect('mongodb://localhost/user_test');
// //ponizej sa dwa eventy od mongoose open i on
//     mongoose.connection
//         .once('open', () => {done();})
//         .on('error', (error) => {
//             console.warn('!!!Warning: ', error);
//             console.log('Color 0A')
//         });
// })

/*Wersja alternatywana z Promises funkcja before sprawia ze polaczenie z baza jest jako pierwsze
* i jest ono wykonywane tylko raz*/

before((done)=>{
    const mongo = mongoose.connect('mongodb://localhost/user_test', {useMongoClient:true});
    mongo.then((resolve)=>{
        if (resolve) {done();};
    }).catch((err) =>{
        console.log('!!!!ERRROR: ',err)
    });
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
