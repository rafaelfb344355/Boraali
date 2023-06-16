const express = require('express');
const app = express();
const userRoutes = express.Router();
const User = require('../model/User');
const bcrypt = require('bcryptjs');

// API to add a user
userRoutes.route('/add').post(function(req, res) {
  let user = new User(req.body);
  user.save()
    .then(user => {
      res.status(200).json({ 'status': 'success', 'message': 'User added successfully' });
    })
    .catch(err => {
      res.status(500).send({ 'status': 'failure', 'message': 'Unable to save to the database' });
    });
});

// API to get all users
userRoutes.route('/').get(function(req, res) {
  User.find(function(err, users) {
    if (err) {
      res.status(500).send({ 'status': 'failure', 'message': 'Something went wrong' });
    } else {
      res.status(200).json({ 'status': 'success', 'users': users });
    }
  });
});

// API to get a user by ID
userRoutes.route('/:id').get(function(req, res) {
  let id = req.params.id;
  User.findById(id, function(err, user) {
    if (err) {
      res.status(400).send({ 'status': 'failure', 'message': 'Something went wrong' });
    } else {
      res.status(200).json({ 'status': 'success', 'user': user });
    }
  });
});

// API to update a user by ID
userRoutes.route('/update/:id').put(function(req, res) {
  User.findById(req.params.id, function(err, user) {
    if (!user) {
      res.status(400).send({ 'status': 'failure', 'message': 'Unable to find user' });
    } else {
      user.Nome = req.body.Nome;
      user.Email = req.body.Email;
      user.Senha = req.body.Senha;
      user.Score = req.body.Score;
      user.picture = req.body.picture;

      user.save()
        .then(() => {
          res.status(200).json({ 'status': 'success', 'message': 'Update complete' });
        })
        .catch(err => {
          res.status(500).send({ 'status': 'failure', 'message': 'Unable to update user' });
        });
    }
  });
});

// API to delete a user by ID
userRoutes.route('/delete/:id').delete(function(req, res) {
  User.findByIdAndRemove(req.params.id, function(err) {
    if (err) {
      res.status(400).send({ 'status': 'failure', 'message': 'Something went wrong' });
    } else {
      res.status(200).json({ 'status': 'success', 'message': 'Delete successfully' });
    }
  });
});

userRoutes.route('/login').post(async function(req, res) {
  const { email, password } = req.body;

  try {
    // Verificar se o usuário existe no banco de dados
    const user = await User.findOne({ Email: email });

    if (!user) {
      return res.status(400).json({ message: 'Usuário não encontrado' });
    }

    // Verificar a senha
    if (user.Senha !== password) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    // Autenticação bem-sucedida
    console.log( user._id );
    res.status(200).json({ message: 'Login bem-sucedido', userId: user._id });
  } catch (error) {
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});
module.exports = userRoutes;
