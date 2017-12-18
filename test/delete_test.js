const assert = require('assert');
const User = require('../src/user');

/*Nastepujace mozliwosci usuwania danych delete tu terminologia remove :
a)model class np. User
* -remove //tu usuwamy wedlug kryteriow np po imieniu
* -findOneAndRemove
* -findByIdAndRemove
b)model instance np Joe
remove //mamy zmienna Joe i ja usuwamy
*/
describe('Deleting a user', () => {
    let joe;

    beforeEach((done) => {
        joe = new User({name: 'Joe'});
        joe.save()
            .then(() => done());
    });

    it('model instance remove',(done) =>{
        // jest tutaj podwojny promise poniewaz
        // po usunieciu sprawdzamy czy jeszcze jest uzytkownik
        // to jest chain promise bo najpierw kasujemy (operacja asynchroniczna)
        // a pozniej szukamy tego co skasowalismy  (tez operacja asynchroniczna)
        // skladnia w komentarzu to jest to samo tylko dluzej i tu widac zagniezdzony promise
        // joe.remove()
        //     .then(() => {
        //         User.findOne({name: 'Joe'})
        //              .then((user) => {
        //                  assert(user === null);
        //                  done();
        //     });
        // });
    joe.remove()
        .then(() => User.findOne({name: 'Joe'}))
        .then((user) => {
            assert(user === null);
            done();
        });
    });

    it('class method remove', (done) => {
        //Remove a bunch of records with some given criteria
        User.remove({name: 'Joe'})
            .then(() => User.findOne({name: 'Joe'}))
            .then((user) => {
                assert(user === null);
                done();
            });
    });

    it('class method findOneAndRemove', (done) => {
        // tu tez mozemy szukac po id jak przykladzie nastepnym User.findByIdAndRemove({_id: joe._id})
        User.findOneAndRemove({name: 'Joe'})
            .then(() => User.findOne({name: 'Joe'}))
            .then((user) => {
                assert(user === null);
                done();
            });
    });

    it('clas method findByIdAndRemove888', (done) => {
        // lub same joe._id  User.findByIdAndRemove({_id: joe.id}) User.findByIdAndRemove(joe._id)
        User.findByIdAndRemove(joe._id)
            .then(() => User.findOne({name: 'Joe'}))
            .then((user) => {
                assert(user === null);
                done();
            });

    });
});