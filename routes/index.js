var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'repozytorium'
})

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log("GET");
  res.render('index', { title: 'Repozytorium', partial: 'part_logger' });
});

router.post('/', function(req, res, next) {
  var login = req.body.login;
  var haslo = req.body.passwd;

  var sql = 'SELECT iduser FROM user WHERE name = "' + login + '" AND password = "' + haslo + '"';
  console.log(sql);

  db.query(sql, function(error, data) {
    if(data.length > 0){
      var url = '/users/' + data[0].iduser;
      console.log(url);
      res.status(200).send({url: url});
    } else {
      res.status(402).send('Zly login lub haslo!');
    }
  });
});

router.get('/register', function(req, res, next) {
  res.render('index', { title: 'Repozytorium', partial: 'part_register' });
});

router.post('/register', function(req, res, next) {
  var login = req.body.login;
  var haslo = req.body.passwd;
  var sqlCheck = 'SELECT iduser FROM user WHERE name = "' + login + '"';

  db.query(sqlCheck, function(error, data) {
    if(data.length === 0) {
      values = [[login, haslo]];
      var sqlInsert = 'INSERT INTO user (name, password) VALUES ?';
      db.query(sqlInsert, [values], function(err, data) {
        if(err) throw err;
        console.log("Number of records inserted: " + data.affectedRows);
        res.status(200).send({url: '/', resp: 'Konto utworzone pomyslnie. Zaloguj sie.'});
      });
    } else {
      res.status(402).send('Podany login juz istnieje');
    }
  });
});

module.exports = router;
