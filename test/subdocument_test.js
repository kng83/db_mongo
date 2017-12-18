const assert = require('assert');
const User = require('../src/user');

describe('Subdocuments', () =>{
    it('can create a subdocument' ,(done) =>{
        const joe = new User({
            name: 'Joe',
            posts: [{title: 'PostTitle'}]
        });

        joe.save()
            .then(() => User.findOne({name: 'Joe'}))
            .then((user)=>{
                assert(user.posts[0].title ==='PostTitle');
                done();
            });
    });
    /*nastepujaca hierarhia:
    * create Joe
    * save Joe
    * fetch Joe
    * add a Post to Joe
    * save Joe
    * fetch Joe
    * Make assertion
    * to metoda nie mozemy zapisac tylko jednego
    * post musimy zawsze zapisac uzytkownika
    * */

    it('Can add subdocuments to an existing record',(done)=>{
        //create joe
        const joe = new User({
            name: 'Joe',
            post: []
        });
        //save joe
        joe.save()
            //fetch joe
            .then(() => User.findOne({name: 'Joe'}))
            .then((user) =>{
                //add post to joe
                user.posts.push({title:'New post'});
                user.posts.push({title:'Second Post'})
                //save Joe
                return user.save(); //by zworcic promis
            })
            .then(() => User.findOne({name: 'Joe'}))
            .then((user) =>{
                //assertion
                assert(user.posts[0].title === 'New post');
                done();
            });
    });
    it('can remove an existing subdocument',(done) =>{
        const joe = new User ({
            name: 'Joe',
            posts: [{title: 'New Title'}]
        });
        joe.save()
            .then(() => User.findOne({name: 'Joe'}))
            .then((user) => {
                // to jest api od mongooose
                // usuniecie konkretnego postu
                //nalezy pamietac ze nie jest to operacja na
                //bazie danych tylko na schemacie i trzeba zapisac
                //saveem
                user.posts[0].remove();
                return user.save();
            })
            .then(() => User.findOne({name: 'Joe'}))
            .then((user) =>{
                assert(user.posts.length === 0);
                done();
            })
    });
});
