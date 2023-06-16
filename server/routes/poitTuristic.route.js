const express = require('express');
const app = express();
const poitTuristicRoutes = express.Router();
const PoitTuristic = require('../model/PoitTuristic');

// api to add poitTuristic
poitTuristicRoutes.route('/add').post(function (req, res) {
  let poitTuristic = new PoitTuristic(req.body);
  poitTuristic.save()
  .then(poitTuristic => {
    res.status(200).json({'status': 'success','mssg': 'poitTuristic added successfully'});
  })
  .catch(err => {
    res.status(409).send({'status': 'failure','mssg': 'unable to save to database'});
  });
});

// api to get cars
poitTuristicRoutes.route('/').get(function (req, res) {
  PoitTuristic.find(function (err, cars){
    if(err){
      res.status(400).send({'status': 'failure','mssg': 'Something went wrong'});
    }
    else {
      res.status(200).json({'status': 'success','cars': cars});
    }
  });
});

poitTuristicRoutes.route('/poitTuristic/:fabricante').get(function (req, res) {
  let fabricante = req.params.fabricante;
  
  PoitTuristic.find({ fabricante: fabricante }, function(err, cars) {
    if (err) {
      // Tratar erros de busca no banco de dados
      res.status(500).send('Erro interno do servidor');
    } else if (cars.length === 0) {
      // Lidar com o caso em que nenhum carro é encontrado com o fabricante fornecido
      res.status(404).send('Nenhum carro encontrado');
    } else {
      // Caso carros sejam encontrados, você pode retorná-los como resposta
      res.status(200).json(cars);
    }
  });
});


// api to get poitTuristic
poitTuristicRoutes.route('/poitTuristic/:id').get(function (req, res) {
  let ID = req.params.id;
  PoitTuristic.findById(ID, function (err, poitTuristic){
    if(err){
      res.status(400).send({'status': 'failure','mssg': 'Something went wrong'});
    }
    else {
      res.status(200).json({'status': 'success','poitTuristic': poitTuristic});
    }
  });
});

// api to update route
poitTuristicRoutes.route('/update/:id').put(function (req, res) {
    PoitTuristic.findById(req.params.id, function(err, poitTuristic) {
    if (!poitTuristic){
      res.status(400).send({'status': 'failure','mssg': 'Unable to find data'});
    } else {
        poitTuristic.fabricante = req.body.fabricante;
        poitTuristic.email = req.body.email;
        poitTuristic.phone_number = req.body.phone_number;

        poitTuristic.save().then(business => {
          res.status(200).json({'status': 'success','mssg': 'Update complete'});
      })
    }
  });
});

// api for delete
poitTuristicRoutes.route('/delete/:id').delete(function (req, res) {
  PoitTuristic.findByIdAndRemove({_id: req.params.id}, function(err,){
    if(err){
      res.status(400).send({'status': 'failure','mssg': 'Something went wrong'});
    }
    else {
      res.status(200).json({'status': 'success','mssg': 'Delete successfully'});
    }
  });
});

module.exports = poitTuristicRoutes;