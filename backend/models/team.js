var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TeamSchema = new Schema({
    name: {type: String, required: true},
    members: [{type: Schema.Types.ObjectId, ref: 'User'}],
    project: {type: Schema.Types.ObjectId, ref: 'Project', required: false}

});

TeamSchema
.virtual('url')
.get(function () {
  return '/team/' + this._id;
});

module.exports = mongoose.model('Team', TeamSchema );