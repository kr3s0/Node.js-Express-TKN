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
        //Umjesto res.redirect, koristit cemo AJAX poziv, tako da se stranice ne refresuje svaki put
        //napisali bi posebno AJAX stranicu koja bi imala JS scriptu preko koje bi zapravo pozivali to sto nam treba
        //takodjer, trebalo bi nam neka funkcija koja hendla ajax poziv, i vraca odgovarajuci JSON object (ako izaberemo da radimo sa JSON)
        //za sami AJAX cemo koristiti JQuery;
        //https://www.webucator.com/tutorial/learn-ajax/ajax-basics.cfm
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