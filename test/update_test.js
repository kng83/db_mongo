const assert = require('assert');
const User = require('../src/user');

/*Nastepujace mozliwosci updatu danych  tu terminologia :
a)model class np. User
* -update //
* -findOneAndUpdate
* -findByIdAndUpdate
b)model instance np Joe
* -update //
* 'set' and 'save'
*/

describe ('Updating records', () => {
    let joe;

    beforeEach((done) =>{
        // dopiero jak tu dodalismy postCount to updatowala sie nasza baza danych
        joe = new User({name: 'Joe', postCount: 0});
        joe.save()
            .then(()=> done());

    });

    function assertName(operation, done){
        operation
            .then(() => User.find({}))
            .then((users) => {
                assert(users.length === 1);
                assert(users[0].name === 'Alex');
                done();
            });
    }
    //*te dwie to zapisywanie instancji updateowanie*/

    it('instance type using set n save', (done) => {
        //set uzywamy gdy chcemy zmienic jedna z wlasciwosci obiektu/instancji
        //to zmienia sie u nas w programie ale nie ma odzwierciedlenia w bazie danych
        //jezeli chcemy zapisac zmiane musimy dac sava'a
        // console.log(joe);
        // joe.set('name', 'Alex');
        // console.log(joe);

        //wersja stara bez funkcji assert name;
        //joe.set('name','Alex');
        // joe.save()
        // //szukamy tu calej listy uzytkownikow i sprawdzimy
        // //czy jest alex i czy jest joe// {} pusty obiekt to sa wszyscy uzytkownicy
        // //zwracana jest tu tablica uzytkownikow
        //     .then(() => User.find({}))
        //     .then((users) => {
        //       assert(users.length === 1);
        //       assert(users[0].name === 'Alex');
        //       done();
        // });
        joe.set('name','Alex');
        //wersja z dolozna funkcja realizujaca promise
        assertName(joe.save(), done);
    });

    // to jest ekwiwalent jezeli bys dali operator $set przyklad z inkrementem
    it('A model instance can update', (done)=>{
         assertName(joe.update({name: 'Alex'}), done);
    })

    //Operacje na modelu klasy User

    it('A model class can update', (done) =>{
        // po selektorze imienia musimy  dodac tylko drugi obiekt okreslajacy co chcemy zmienic
        assertName(User.update({name: 'Joe'}, {name: 'Alex'}),done);

    });

    it('A model class can update one record', (done) =>{
        assertName(User.findOneAndUpdate({name: 'Joe'}, {name: 'Alex'}),done);


    });

    it('A model class can find a record wit an Id and update ', (done) =>{
        assertName(User.findByIdAndUpdate({_id: joe._id}, {name: 'Alex'}),done);

    });

    // Zaawansowana klasa update z nowym argumentem postCount
    // Bedzie nastepujaca metoda find users i update postCount by 1
    // Lepiej operowac na bazie danych niz pobierac z niej dane i operowac na nich
    // to sie nazywa mongo modifiers (mongo update operators/modifiers)
    it('A user can have their postcount incremented by 1', (done) => {
        // szukamy Joe dodajemy operator inkrementu i inkrementujemy pole postCount o 1 (-1 to decrement)
        User.update({name: 'Joe'}, {$inc:{postCount: 1}})
            .then(() => User.findOne({name: 'Joe'}))
            .then((user) =>{
                assert(user.postCount === 1);
                done();
            });

    });
});