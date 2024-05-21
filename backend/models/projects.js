var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ProjectSchema = new Schema({
    nome: {type: String, required: false},
    acronimo: {type: String, required: false},
    data_inicio: {type: String, required: false},
    data_fim: {type: String, required: false},
    tasks: [{
        type: String
      }],
});




// Export model.
module.exports = mongoose.model('Project', ProjectSchema);
