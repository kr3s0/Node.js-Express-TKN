var express = require('express');
var router = express.Router();
var Database = require('../biblioteka/BazaPodataka.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('ToDoWelcome2', { title: 'Express' });
});

//Deklarisemo async callback funckiju koja ce se pozvati pri dospjecu post rekvesta;
router.post('/', async function(req,res,next) {
    try {
        //Mogli bi sada ovdje pozvati drugu funkciju koja bi nam vratila hashirani pw, pa provesti bcrypt.compare(req.body.pw,'i taj hashirani')
        //ako se podudaraju, onda bi provjerili da li se i Username podudara, pa tek tada pustili korisnika dalje
        //try and catch rade kao error handling rutine sa async/await;
        req.session.user = await Database.checkDatabase(req);
        //await da se izvrsi Database.checkDatabase koji vraca object, to dodjeljujemo user-u;
        res.redirect('/showList');
        //usmjerimo usera (jer je logiran) na njegovu listu;
    }
    catch (e) {
        console.log('Nesto nije uredu' + e);
        // u slucaju neke greske, catch ce uhvatit error i handlat prikladno;
        res.render('error2', {informacija: 'Negdje je doslo do greske.'});
    }
});

module.exports = router;
