var express = require('express');
var router = express.Router();
var Database = require('../biblioteka/BazaPodataka.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('ToDoWelcome', { title: 'Express' });
});

router.post('/', function(req,res,next) {
    req = Database.checkDatabase(req);
    res.redirect('/showList');
});

module.exports = router;
