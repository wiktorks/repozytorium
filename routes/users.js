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
  var dataQuery = 'SELECT idfiles, filename, filetype, added, filesize, favourite FROM files WHERE fk_userid = ' + userId + ' AND trash = FALSE ORDER BY added DESC';
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

router.get('/:userId/favourites', function (req, res, next) {
  var userId = req.params.userId;
  var fileTypes = 'SELECT DISTINCT filetype FROM files WHERE fk_userid = ' + userId + ' AND trash = FALSE ORDER BY CHAR_LENGTH(filename)';
  var dataQuery = 'SELECT idfiles, filename, filetype, added, filesize, favourite FROM favourites WHERE fk_userid = ' + userId + ' ORDER BY added DESC';
  var spacetaken = 'SELECT spacetaken FROM user WHERE iduser = ' + userId;

  db.query(spacetaken, function (error, data) {
    spacetaken = data[0].spacetaken;
    db.query(dataQuery, function (error, data) {
      var mainData = data;
      if (mainData.length > 0) {
        db.query(fileTypes, function (error, data) {
          res.render('user', {
            title: 'Ulubione',
            userId: userId,
            dane: {mainData: mainData, fileData: data},
            partial: 'part_tableData',
            spacetaken: spacetaken
          });
        });
      } else {
        res.render('user', {
          title: 'Ulubione',
          userId: userId,
          dane: {
            mainData: {
              url: 'https://ih0.redbubble.net/image.439563915.3616/ap,550x550,16x12,1,transparent,t.png',
              upperSub: 'Aktualnie nie masz żadnych ulubionych',
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
});

router.post('/:userId/favourites', function (req, res, next) {
  var sql = '';
  console.log('Ulubione: ' + req.body.fav);
  if(req.body.fav === 1){
    sql = 'UPDATE files SET favourite = 0 WHERE idfiles = ' + req.body.idfiles;
  }
  else {
    sql = 'UPDATE files SET favourite = 1 WHERE idfiles = ' + req.body.idfiles;
  }
  db.query(sql, function(error, data) {
    res.status(200).send({url: '/users/' + req.body.userId + '/' + req.body.title});
  });
});

router.get('/:userId/trash', function (req, res, next) {
  var userId = req.params.userId;
  var fileTypes = 'SELECT DISTINCT filetype FROM files WHERE fk_userid = ' + userId + ' AND trash = FALSE ORDER BY CHAR_LENGTH(filename)';
  var dataQuery = 'SELECT idfiles, filename, filetype, added, filesize FROM trash WHERE fk_userid = ' + userId + ' ORDER BY added DESC';
  var spacetaken = 'SELECT spacetaken FROM user WHERE iduser = ' + userId;

  db.query(spacetaken, function (error, data) {
    spacetaken = data[0].spacetaken;
    db.query(dataQuery, function (error, data) {
      var mainData = data;
      if (mainData.length > 0) {
        db.query(fileTypes, function (error, data) {
          res.render('user', {
            title: 'Kosz',
            userId: userId,
            dane: {mainData: mainData, fileData: data},
            partial: 'part_tableData',
            spacetaken: spacetaken
          });
        });
      } else {
        res.render('user', {
          title: 'Kosz',
          userId: userId,
          dane: {
            mainData: {
              url: 'http://icons.iconarchive.com/icons/yellowicon/flat/256/Empty-Trash-icon.png',
              upperSub: 'Kosz jest pusty',
              lowerSub: ''
            },
            fileData: ''
          },
          partial: 'part_missingData',
          spacetaken: spacetaken
        });
      }
    });
  });
});

router.post('/:userId/trash', function (req, res, next) {
  var sql = 'UPDATE files SET trash = 1 WHERE idfiles = ' + req.body.idfiles;

  db.query(sql, function(error, data) {
    res.status(200).send({url: '/users/' + req.body.userId + '/' + req.body.title});
  });
});

router.post('/:userId/trash/recover', function(req, res, next) {
  var sql = 'UPDATE files SET trash = 0 WHERE idfiles = ' + req.body.idfiles;

  db.query(sql, function(error, data) {
    res.status(200).send({url: '/users/' + req.body.userId + '/trash'});
  });
});

router.post('/:userId/trash/delete', function(req, res, next) {
  var sql = 'DELETE FROM files WHERE idfiles = ' + req.body.idfiles;

  db.query(sql, function(error, data) {
    res.status(200).send({url: '/users/' + req.body.userId + '/trash'});
  });
});

router.post('/:userId/add', function(req, res, next) {
  userId = req.params.userId;
  var sql = 'INSERT INTO files (filename, filetype, added, filesize, fk_userid) VALUES ?';
  var date;
  date = new Date();
  date = date.getUTCFullYear() + '-' +
      ('00' + (date.getUTCMonth()+1)).slice(-2) + '-' +
      ('00' + date.getUTCDate()).slice(-2)
  console.log(sql + ', date: ' + date);
  var values = [[req.body.filename, req.body.filetype, date, req.body.filesize, userId]];
  db.query(sql, [values], function(error, data) {
    res.redirect('/users/'+userId);
  });
});

module.exports = router;
