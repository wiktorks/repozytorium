var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'repozytorium',
  dateStrings: 'date'
});

/* GET users listing. */
router.get('/:userId', function(req, res, next) {
  var userId = req.params.userId;
  var fileTypes = 'SELECT DISTINCT filetype FROM files WHERE fk_userid = ' + userId + ' AND trash = FALSE ORDER BY CHAR_LENGTH(filename)';
  var dataQuery = 'SELECT idfiles, filename, filetype, added, filesize FROM files WHERE fk_userid = ' + userId + ' AND trash = FALSE ORDER BY added DESC';
  var spacetaken = 'SELECT spacetaken FROM user WHERE iduser = ' + userId;

  db.query(spacetaken, function(error, data) {
    spacetaken = data[0].spacetaken;
    if(spacetaken > 0){
      db.query(dataQuery, function(error, data) {
        var mainData = data;
        db.query(fileTypes, function(error, data) {
          res.render('user', {
            title: 'Repozytorium',
            userId: userId,
            dane: {mainData: mainData, fileData: data},
            partial: 'part_tableData',
            spacetaken: spacetaken
          });
        });
      });
    } else {
        res.render('user', {
          title: 'Repozytorium',
          userId: userId,
          dane: { mainData: {
            url: 'https://image.freepik.com/free-vector/empty-cardboard-box-opened_34950-8.jpg',
            upperSub: 'Twoje repozytorium jest puste',
            lowerSub: 'Dodaj nowe pliki'
            },
            fileData: ''
          },
          partial: 'part_missingData',
          spacetaken: spacetaken
        });
    }

  });
});

router.get('/:userId/favourites', function(req, res, next) {
  var userId = req.params.userId;
  var dataQuery = 'SELECT idfiles, filename, filetype, added, filesize FROM favourites WHERE fk_userid = ' + userId;
  var spacetaken = 'SELECT spacetaken FROM users WHERE iduser = ' + userId;

});

module.exports = router;
