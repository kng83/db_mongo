const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/*Robimy prosty subdokument zawierajacy posty
* nie robimy z tego modelu poniewaz nie bedzie to osobna kolekcja
* ale bedzie to sie zawieralo w modelu user*/
const PostSchema = new Schema({
    title: String
});


module.exports = PostSchema;