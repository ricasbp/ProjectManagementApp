var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    name: {type: String, required: true},
    senha: {type: String, required: true},
    admin: {type: Boolean, required: true},
    periods: [{type: Schema.Types.ObjectId, ref: 'Period'}],
});


module.exports = mongoose.model('User', UserSchema );
