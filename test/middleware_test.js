const mongoose = require('mongoose');
const assert = require('assert');
const User = require('../src/user');
const BlogPost = require('../src/blogPost');



describe('Middleware before remove function',()=>{
    let joe, blogPost;

/*Kod skopiowany z pliku associations_test.js*/
    beforeEach((done) =>{
        joe = new User ({name: 'Joe'});
        blogPost = new BlogPost({title:'JS is Great', content:"Pawel he's great"});

        joe.blogPosts.push(blogPost);

        Promise.all([joe.save(),blogPost.save()])
            .then(()=>{
                done();
            });

    });

    //Przyjmiemy technike przy kasowaniu bedziemy liczyc ile jeszcze pozostalo do skasowania
    //Tu nalezy pamietac ze przed remove zostanie wykonany middleware ktory jest w user.js
    //Spowoduje on wyczyszczenie Wszystkich blogPostow przez uzytkownika
    it('users clean up dangling blogposts on remove', (done) =>{
        joe.remove()
            .then(()=> BlogPost.count())
            .then((count)=>{ //w tym przypadku cout okresla ilosc blogPostow
                assert(count === 0);
                done();
            });

    });

});