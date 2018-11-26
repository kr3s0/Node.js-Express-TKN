var express = require('express');
var router = express.Router();
var Database = require('../biblioteka/BazaPodataka.js');

router.get('/', function(req,res,next) {
   res.render('register');
});

router.post('/', function(req,res,next) {
    Database.registerNewUser(req,function(poruka) {
        res.render('error2',{informacija: poruka});
    })
});


module.exports = router;