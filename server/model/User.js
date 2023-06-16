const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let User = new Schema({
  Nome: {
    type: String
  },
  Email: {
    type: String
  },
 Senha: {
    type: String
  },
 Score: {
    type: String
  },
  picture: {
    type: String
  }
},{
    collection: 'User'
});

module.exports = mongoose.model('User', User);