const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//wykonanie modelu uzytkowanika UserSchema jest tylko jego czescia
// String to nie jest specjalna zmienna caly node ma niej dostęp
// W wykladzie 7 dodajemy nowa wlasciwosc  postCount
// W wykladzie 7 aby zrobic validacje zamieniamy typ string na obiekt (validacja zajmuje sie mongoose
// Dodajemy validacje na ilosc liter w imieniu. Dokladamy wlasciwosc valideate i w niej funkcje validator
// w niej musimy zwrocic true lub false gdzie true to valid

const UserSchema = new Schema({
    name: {
        type: String,
        validate: {
            validator: (name)=>{
                return (name.length >2);
            },
            message: 'Name must be longer than 2 characters.'
        },
        required: [true, 'Name is required.']
    },
    postCount: Number
});

//deklaracja calego modelu i dodanie do niego schematu
//deklaracja kolekcji i przypisanie jej schematu UserSchema
//to jest cala koleckja bazy nie tylko obiekt user.
//Mongoogse zaklada sam ta kolekcje.
const User = mongoose.model('user', UserSchema);

module.exports = User;