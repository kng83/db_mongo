const mongoose = require('mongoose');
const PostSchema = require('./post');
const Schema = mongoose.Schema;

//wykonanie modelu uzytkowanika UserSchema jest tylko jego czescia
// String to nie jest specjalna zmienna caly node ma niej dostęp
// W wykladzie 7 dodajemy nowa wlasciwosc  postCount
// W wykladzie 7 aby zrobic validacje zamieniamy typ string na obiekt (validacja zajmuje sie mongoose
// Dodajemy validacje na ilosc liter w imieniu. Dokladamy wlasciwosc valideate i w niej funkcje validator
// w niej musimy zwrocic true lub false gdzie true to valid
// W rozdziale 8 do naszego schematu tutaj dodajemy schemat post
// Dodajemy go jako tablice do wlasciwosci posts

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
    //to bylo stare
    // postCount: Number,
    //w nowej wersji mongo by uniknac bledu pusha w subdocument.js nalezy dodac
    //opcje usePushEach do opcji schematu
    posts: [PostSchema],
    likes: Number,
    blogPosts: [{
        type: Schema.Types.ObjectId,
        ref:'blogPost'
    }]

},{usePushEach:true});

//tu tworzymy virtualny typ i co uzytkownik ma
//z tym zrobic. Nie moze byc fat arrow.
//virtual typ uzywa getterow i setterow
//zwracajac this odnosi sie do instancji naszego modelu
//dostajemy nawet id
UserSchema.virtual('postCount').get(function () {
    return this.posts.length;
});

//Middleware wystepuja przed i po event. W mongoose nazywamy je pre i post .
//Np z usuwaniem uzytkownika czyscimy jego posty by pozniej go usunac
//Patrz na event remove i zanim on wystapi to uruchom ta funkcje
//Jest tu problem ze require moze byc w blogPoscie do usera i tu do blogposta i to moze sie chrznic dlatego
//pobieramy  tu model dla blogPosta (cyclic loading issue mozemy trafic)
//Problem jest bo mamy tablice id w blogPost i  chcemy usunac ja cala w relacji do kasowanego uzytkownika
//Bedziemy tu uzywac query operator "in", cos jak uzywalismy "$inc"
//in operator mowi przejedz sie po blogPoscie i znajdz wszystkie jego _id
//sekcja 10 wyklad 65
//musi byc next bo to jest asynchroniczne i zeby kontynuowac
UserSchema.pre('remove', function(next){
    //this  === joe
    const BlogPost = mongoose.model('blogPost');
    BlogPost.remove({_id: {$in: this.blogPosts}})
        .then(() => next());
});

//deklaracja calego modelu i dodanie do niego schematu
//deklaracja kolekcji i przypisanie jej schematu UserSchema
//to jest cala koleckja bazy nie tylko obiekt user.
//Mongoogse zaklada sam ta kolekcje.
const User = mongoose.model('user', UserSchema);

module.exports = User;