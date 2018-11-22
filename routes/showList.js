var express = require('express');
var router = express.Router();
var Database = require('../biblioteka/BazaPodataka.js');

router.get('/', function(req,res,next) {
    res.render('showList' , {korisnik: req.session.user.username , taskovi: Database.tasksForUser(req.session.user.broj)})
});

router.post('/', function(req,res,next) {
    Database.addTask(req.session.user.broj,req.body.newtask);
    res.redirect('/showList');
});

router.get('/logout', function(req,res,next) {
   req.session.destroy();
   res.redirect('/');
});

module.exports = router;