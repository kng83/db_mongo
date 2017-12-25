const mongoose = require('mongoose');
const User = require('../src/user');
const Comment =require('../src/comment');
const BlogPost = require('../src/blogPost');
const assert = require('assert');

describe('Associations',()=>{
    let joe, blogPost, comment;
    beforeEach((done) =>{
        joe = new User ({name: 'Joe'});
        blogPost = new BlogPost({title:'JS is Great', content:"Pawel he's great"});
        comment = new Comment({content: 'Congrats on great post'});

        //robimy teraz assocjacje ze blogPost nalezy do joe
        //joe ma kolekcje blogPosts ktore sa tablica blogpostow
        //w schemacie joe w typie powiedziane jest ze dajemy obiekt_id
        //mongoose wystarczy ze damy tuta caly obiekt to mongoose sobie znajdzie
        joe.blogPosts.push(blogPost);

        //teraz robimy asocjacje miedzy blogPost a comment
        blogPost.comments.push(comment);

        //teraz robimy asocjacje joe z commentem
        //tu troche magia jest ale to dzieki mongoose
        comment.user = joe;

        //powyzej wszysko bylo w node teraz to zapiszemy
        //poniewaz sa trzy miejsca a trzeba dac gdzies done to
        //uzywamy promise.all to natywna funkcja
        //joe.save();
        // blogPost.save();
        //comment.save();

        Promise.all([joe.save(),blogPost.save(),comment.save()])
            .then(()=>{
                done();
            });

    });

    //jesli damy only to mocha uruchomi tylko ten jeden test ktory chcemy
    //nie mamy odpowiedzi ktora nas zadawala (bo mamy tylko id blogPostsa wiec musimy
    //zrobic uzyc innego query (wstawimy modifier midzy instrukcje a then
    //query w database jest wykonywane tylko wtedy gdy jest then
    //User.findOne({name:'Joe'}).modifier.then();
    //Nie mozemy w mongo miec wszystkiego jezeli robimy asocjacje z blogpostem to nie
    //mozemy rownoczesnie robic assocjacji z comment

    it('saves a relation between a user and a blogpost', (done)=>{
        User.findOne({name: 'Joe'})
            .populate('blogPosts') //modyfikator i odnosi sie do referncji
            .then((user) =>{
                assert(user.blogPosts[0].title ==='JS is Great')
               // console.log(user.blogPosts[0]);
                done();
            });
    });

    //Tutaj chcemy ladowac user'a blogposta i comments zeby miec dostep do
    //wszystkiego. Tutaj w populate przekazujemy object nie jak wyzej tylko referncje
    //do blogPosts
    //path dziala podobnie do teog co wyzyej czyli kojarzy z kluczem
    //populate dziala tak ze wchodzimy do blogposta idziemy level dalej zeby dostac
    //sie do jego relacji

    it.only('saves a full relation graph', (done)=>{
        User.findOne({name: 'Joe'})
            .populate({

                path:'blogPosts', //load the associations blogPost
                populate:{ //inside of the blogpost find associations with comments
                    path:'comments',
                    model:'comment', //musimy dodac tu model comment
                    populate:{
                        path:'user', //idziemy glebiej by dostac sie do uzytkownika
                        model:'user'
                    }
                }

            })
            .then((user)=>{
                // console.log(user.blogPosts[0].comments[0]);
                assert(user.name === 'Joe');
                assert(user.blogPosts[0].title ==='JS is Great');
                assert(user.blogPosts[0].comments[0].content === 'Congrats on great post');
                assert(user.blogPosts[0].comments[0].user.name === 'Joe');
                done();
            });
    });
});



