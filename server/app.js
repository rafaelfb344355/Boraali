var express = require('express'),
bodyParser = require('body-parser'),
cors = require('cors'),
mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://127.0.0.1:27017/BoraAli', { useNewUrlParser: true , useUnifiedTopology: true }).then(
  () => {console.log('Database is connected') },
  err => { console.log('Can not connect to the database'+ err)});

const PoitTuristicRoute = require('./routes/poitTuristic.route');
const Ponto = require('./model/PoitTuristic');

const UserRoute = require('./routes/user.route');
const User= require('./model/User');


var app = express();
app.use(bodyParser.json());
app.use(cors());



app.use('/poitTuristic', PoitTuristicRoute);
app.use('/user', UserRoute);



app.get('/', PoitTuristicRoute);
app.get("/poitTuristic/:id",PoitTuristicRoute);
app.get("/poitTuristic/:name",PoitTuristicRoute);

app.get('/', UserRoute);
app.get("/user/:id",UserRoute);



app.listen(3000,function(){
    console.log('Listening on port 3000!');
});