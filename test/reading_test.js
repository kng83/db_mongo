//
const assert = require('assert');
const User = require('../src/user');


/*Test szukajacy uzytkownika w tym celu dajemy beforecha poniewaz baza danych jest najpierw czyszczona
* w funkcji test_helper
* do testu pagination dodajemy uzytkownikow. Musimy zapisac ich rownolegle i dopiero wtedy dac callback done*/

describe('Reading users out of the database',() =>{
    let joe; //ze wzgledu na scope
    let maria, alex, zach;

    beforeEach((done)=>{
        alex = new User({name: 'Alex'});
        joe = new User ({name: 'Joe'});
        maria = new User({name: 'Maria'});
        zach = new User({name: 'Zach'});

        //Zapisanie wiele rekordow na raz aby dostac odpowiedz jedna o stanie zapisu
        //Wczesnie bylo   //joe.save()
        //Nie mamy tu pewnosc czy wszycy zostana zapisanie w tej samej kolejnosci
        Promise.all([joe.save(),alex.save() , maria.save(), zach.save()])
            .then(() => done());
    });

    it('finds all users with a name of joe', (done) =>{
        // instancja uzytkownika wyszukiwanie zwraca tablice uzytkownikow
        // funkcja zwraca obietnice i wszystkich uzytkownikow o imieniu Joe
        User.find({name: 'Joe'})
            .then((users) =>{
                /*//uwaga _id ma inny typ Object('_id') i dlatego dajemy to string
                // wersja alternatywana sprawdzanie id
                console.log(users[0].id);
                console.log(joe._id);
                console.log(joe.id);
                assert(users[0].id === joe.id);
                */
                assert(users[0]._id.toString() === joe._id.toString());

                done();
            })

    });
    it('find a user with particular id ', (done) =>{
        //Funckja zwarca pierwszego napotkanego uzytkownika spelniajacego kryteria
        //nie musimy tutaj dawac porownania bo poradzi sobie z ty mongoose
        User.findOne({_id: joe._id})
            // tu mamay pojedynczy rekord dlatego user
            .then((user) =>{
                assert(user.name ==='Joe');
                console.log('findOne Ok');
                done();
            });
    });

    //Testujemy skip and reading. Mozna to uzyc np do pagination
    //skip - pomija pewna liczbe rekordow
    //limit - wyswietla pewna liczbe rekordow

    it('can skip and limit the result set', (done) =>{
        //-Alex Joe Maria -Zach (tak bedzie to wygladac (opuszczmy 1 i wyswietlamy 2)
        //Poniewaz nie mamy pewnosci co zostanie zapisane w odpowiedniej kolejnosci musimy
        //uzyc modyfikatora sort przez imie 1-znaczy ze kolejnosc A B C (-1) to wtedy Z Y X ..
        User.find({})
            .sort({name:1})
            .skip(1)
            .limit(2)
            .then((users)=>{
                assert(users.length === 2);
                assert(users[0].name === 'Joe');
                assert(users[1].name === 'Maria');
                done(); // //
            });
    });
});