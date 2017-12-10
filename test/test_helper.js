const mongoose = require('mongoose');

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

