var mongoose = require('mongoose');

var Schema = mongoose.Schema;

const ItemSchema = new Schema({
  name: {
    type: String,
  },
  completed: {
    type: Boolean,
  },
});

const TaskSchema = new Schema({
    name: {
      type: String, 
      required: true,
    },

    priority: {
      type: String, 
      enum: ['Urgente', 'Alta', 'Média', 'Baixa'], 
      default:  'Alta',
      required: true
    },

    progress: {
      type: Number, 
      default: 0,
      max: 100, 
      min: 0, 
      validate : {
        validator : Number.isInteger,
        message   : '{VALUE} is not an integer value'
      }
    },

    users: [{
      type: Schema.Types.ObjectId, 
      ref: 'User',
      unique: true
    }],

    project: {
      type: Schema.Types.ObjectId, 
      ref: 'Project', 
      default: null,
    },
    
    items : [ItemSchema],

    data_inicio: {type: Date, required: false, default: null},
    
    data_fim: {type: Date, required: false, default: null},
  });




// Export model.
module.exports = mongoose.model('Task', TaskSchema);

