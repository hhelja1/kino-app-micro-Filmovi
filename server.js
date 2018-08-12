var express = require('express');
var mongoose = require('mongoose');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');

app.use(cors());
var routerAPI = express.Router();
mongoose.connect('mongodb+srv://kamilica:9rc2iokhpPAPzYNG@filmovicluster-lygx2.mongodb.net/film?retryWrites=true')
var db = mongoose.connection;
var Schema = mongoose.Schema;

var filmSchema =new Schema({
    naziv: String,
    reziseri: [
        {ime: String,
        prezime: String}
    ],
    glumci: [
        {ime: String,
        prezime: String}
    ],
    sinopsis: String,
    datumRelease: Date,
    posterURL: String,
    trajanje: String
})
var film = mongoose.model('film',filmSchema,'film');
app.use(bodyParser.json());

routerAPI.get('/vratiListuFilmova', function (req, res) {

    film.find({}, function (err, data) {
        if (err) return handleError(err);
        res.send(data);
      });
})

routerAPI.get('/vratiSinopsisFilma/:naziv', function (req, res) {
    var naziv = req.params.naziv;
    console.log(naziv);
    film.findOne({naziv: naziv}, function (err, data) {
        if (err) return handleError(err);
        res.send(data.sinopsis);
      });
})

app.use('/api', routerAPI);

var server = app.listen(8085, function () {
   var host = server.address().address
   var port = server.address().port
   
})
