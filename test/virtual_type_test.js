const assert = require('assert');
const User = require('../src/user');

describe('Virtual types', ()=>{
    it('postCount return number of posts',(done) =>{
        const joe = new User({
            name: 'Joe',
            posts: [{title: 'PostTitle'}]
        });

        joe.save()
            .then(() => User.findOne({name: 'Joe'}))
            .then((user)=>{
                //tutaj jest nasz getter
                assert(joe.postCount ===1);
                done();
            })
    });
});