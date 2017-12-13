//
const assert = require('assert');
const User = require('../src/user');


/*Test szukajacy uzytkownika w tym celu dajemy beforecha poniewaz baza danych jest najpierw czyszczona
* w funkcji test_helper*/

describe('Reading users out of the database',() =>{
    let joe; //ze wzgledu na scope

    beforeEach((done)=>{
        joe = new User ({name: 'Joe'});
        joe.save()
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
                done();
            });
    });
});