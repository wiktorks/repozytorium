var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'repozytorium',
  dateStrings: 'date'
})

/* GET users listing. */
router.get('/:userId', function(req, res, next) {
  var userId = req.params.userId;
  var dataQuery = 'SELECT idfiles, filename, filetype, added, filesize FROM files WHERE fk_userid = ' + userId + ' AND trash = FALSE ORDER BY added DESC';
  var spacetaken = 'SELECT spacetaken FROM users WHERE iduser = ' + userId;
  //console.log(sql);
  db.query(dataQuery, function(error, data) {
    console.log(data);
    if(data.length > 0){
        res.render('user', { title: 'Repozytorium', dane: data, partial: 'part_tableData'});
    }else{
        res.render('user', { title: 'Repozytorium', dane: '', partial: 'part_missingData'});
    }

  });
});

router.get('/:userId/favourites', function(req, res, next) {
    
});

module.exports = router;
