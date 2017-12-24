const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//Musimy miec to referencje do user by wiedziec ktory comment nalezy do niego
const CommentSchema = new Schema({
    content: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    }

});

const Comment = mongoose.model('comment', CommentSchema);

module.exports = Comment;