var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ReunionSchema = new Schema({
    nome: {type: String, required: true},
    membros: [{type: Schema.Types.ObjectId, ref: 'User'}],
    data_inicio: {type: String, required: true},
    data_fim: {type: String, required: false},
    team: {
        type: Schema.Types.ObjectId, 
        ref: 'Team', 
        },
});



module.exports = mongoose.model('Reunion', ReunionSchema );