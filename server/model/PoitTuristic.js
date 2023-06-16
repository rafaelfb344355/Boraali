const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let PoitTuristic = new Schema({
  Nome: {
    type: String
  },
  descriçao: {
    type: String
  },
 horario: {
    type: String
  },
valoringresso: {
    type: String
  },
  picture: {
    type: String
  }
},{
    collection: 'PoitTuristic'
});

module.exports = mongoose.model('PoitTuristic', PoitTuristic);