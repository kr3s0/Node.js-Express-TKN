var express = require('express');
var router = express.Router();
var Database = require('../biblioteka/BazaPodataka.js');

router.get('/', function(req,res,next) {
    Database.tasksForUser(req.session.user.broj,function(err,rez) {
        if(err){
            console.log('Neka greska:' + err);
            res.render('error2',{informacija: 'Doslo je do neke greske pri ucitavanju taskova'});
        }
        else{
            res.render('showList' , {korisnik: req.session.user.username , taskovi: rez});
        }
    })
});

router.post('/', function(req,res,next) {
    Database.addTask(req.session.user.broj,req.body.newtask,function(nesto) {
        if(nesto){
            res.redirect('/showList');
        }
        else{
            res.render('error2',{informacija: 'Nesto nije uredu pri dodavanju novog taska'});
        }
    });
});

router.get('/logout', function(req,res,next) {
   req.session.destroy();
   res.redirect('/');
});

module.exports = router;