const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//wykonanie modelu uzytkowanika UserSchema jest tylko jego czescia
// String to nie jest specjalna zmienna caly node ma niej dostęp
const UserSchema = new Schema({
    name: String
});

//deklaracja calego modelu i dodanie do niego schematu
//deklaracja kolekcji i przypisanie jej schematu UserSchema
//to jest cala koleckja bazy nie tylko obiekt user.
//Mongoogse zaklada sam ta kolekcje.
const User = mongoose.model('user', UserSchema);

model.exports = User;