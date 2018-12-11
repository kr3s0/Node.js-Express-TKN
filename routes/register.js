var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
var Database = require('../biblioteka/BazaPodataka.js');

router.get('/', function(req,res,next) {
   res.render('register2');
});

router.post('/', async function(req,res,next) {
    try {
        //cim dobijemo password, odmah ga hashujemo, i nastavljamo dalje raditi sa takvim pw-om (zapisujemo i u bazu);
        req.body.pw = await bcrypt.hash(req.body.pw,10);
        //registerNewuser ne vraca nista, tako da je bitno samo sacekati da se ona zavrsi
        await Database.registerNewUser(req);
        res.render('error2', {informacija: ' ste vec registrirani, pokusajte se logirati!'});
    }
    catch (e) {
        console.log(e);
        res.render('error2', {informacija: ' je doslo do neke greske.'});
    }
});


module.exports = router;