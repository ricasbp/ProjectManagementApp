var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const PeriodSchema = new Schema({
    begin_date: {
      type: String,
    },
    end_date: {
      type: String,
    },
  });

  module.exports = mongoose.model('Period', PeriodSchema);
