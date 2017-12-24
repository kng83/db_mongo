//nasze modele ktore robimy sa odpowiednikiem kolekcji w
//mongo db
//tworzymy nowy schmat od blog posta
//Blog post bedzie zawieral posty czyli tresc (content) oraz id Komentarzy(CommentsId)
//User bedzie zawieral postId ktory bedzie odniesiony do Contentu w Blogposie
//Comment bedzie zawieral Content i user_id odniesiony do post_Id
//rysunek znajduje sie w sekcji 9 lekcja 57

const monogoose = require('mongoose');
const Schema = monogoose.Schema;

//musimy miec tutaj referencje do innej kolekcji dokladnie do user by znac jego user_id
//Ta referencja odnosi sie do kolekcji z ktorej potrzebujemy ObjectId
const BlogPostSchema = new Schema({
    title: String,
    content: String,
    comments: [{
        type:Schema.Types.ObjectId, //dajemy tu referencje do innego modulu/kolekcji
        ref: 'comment' //referencja do kolekcji
    }]
});

const BlogPost = monogoose.model('blogPost',BlogPostSchema);
module.exports = BlogPost;



