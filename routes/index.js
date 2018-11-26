var express = require('express');
var router = express.Router();
var Database = require('../biblioteka/BazaPodataka.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('ToDoWelcome', { title: 'Express' });
});

router.post('/', function(req,res,next) {
    Database.checkDatabase(req,function(err,ime,id) {
        if(err){
            console.log('Nesto nije uredu');
            res.render('error2',{informacija: 'Negdje je doslo do greske.'});
        }
        else {
            req.session.user = {username: ime, broj: id};
            res.redirect('/showList')
        }
    });
});

module.exports = router;
