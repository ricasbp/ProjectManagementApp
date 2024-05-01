var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UtilizadorSchema = new Schema({
    nome: {type: String, required: true},
    senha: {type: String, required: true},
});


// Export model.
module.exports = mongoose.model('Utiizador', UtilizadorSchema);
