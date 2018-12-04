var express = require('express');
var router = express.Router();
var Database = require('../biblioteka/BazaPodataka.js');

router.get('/', async function(req,res,next) {
    try {
        let niz = await Database.tasksForUser(req.session.user.broj);
        res.render('showList' , {korisnik:req.session.user.ime , taskovi: niz});
    }
    catch (e) {
        console.log(e);
        res.render('error2', {informacija: 'Doslo je do neke greske pri ucitavanju taskova'});
    }
});

router.post('/', async function(req,res,next) {
    try {
        await Database.addTask(req.session.user.broj, req.body.newtask);
        res.redirect('/showList');
    }
    catch (e) {
        console.log(e);
        res.render('error2', {informacija: 'Nesto nije uredu pri dodavanju novog taska'});
    }
});

router.get('/logout', function(req,res,next) {
   req.session.destroy();
   res.redirect('/');
});

module.exports = router;