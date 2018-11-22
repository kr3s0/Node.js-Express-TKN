var express = require('express');
var router = express.Router();
var Database = require('../biblioteka/BazaPodataka.js');

router.get('/', function(req,res,next) {
   res.render('register');
});

router.post('/', function(req,res,next) {
    if(!Database.registerNewUser(req)){
        res.render('error2', {informacija: "ste vec registrovani, pokusajte se logirati."})
    }
    else{
        res.render('error2', {informacija: "niste bili registrovani, pokusajte se sada logirati."});
    }
});


module.exports = router;