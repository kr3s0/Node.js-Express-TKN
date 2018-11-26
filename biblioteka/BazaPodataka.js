const sqlite3 = require('sqlite3').verbose();

exports.checkDatabase = function (req,Dodjeli) {
    var db = new sqlite3.Database('D:\\Coding\\sqlite\\sqlite-tools-win32-x86-3250300\\nodeToDo.db',sqlite3.OPEN_READWRITE, (err) => {
        if(err){
            console.error(err.message);
        }
        console.log('Uspjesno spojen na Bazu!Check');
    });
    db.get('SELECT UserID id FROM User WHERE FirstName=? AND Password=?',[req.body.fname,req.body.pw],(err,row)=>{
        if (err) {
            console.error(err.message);
        }
        else if(row === undefined){
            Dodjeli(true,null,null);
        }
        else{
            Dodjeli(false,req.body.fname,row.id);
        }
    });
    db.close((err) => {
        if(err){
            console.error(err.message);
        }
        console.log('Baza uspjesno zatvorena!Check');
    });
};

exports.registerNewUser = function (req,Provjeri){
    var db = new sqlite3.Database('D:\\Coding\\sqlite\\sqlite-tools-win32-x86-3250300\\nodeToDo.db',sqlite3.OPEN_READWRITE, (err) => {
        if(err){
            console.error(err.message);
        }
        console.log('Uspjesno spojen na Bazu!RegisterNew');
    });
    db.get('SELECT UserID id FROM User WHERE FirstName=? AND Password=?',[req.body.fname,req.body.pw],(err,row)=>{
        if (err) {
            console.error(err.message);
            Provjeri('Doslo je do greske:' + err);
        }
        else if(row === undefined) {
            db.run('INSERT INTO User VALUES(?,?,?,?)', [null,req.body.fname,req.body.lname,req.body.pw],(err)=>{
               if(err){
                   console.error(err.message);
                   Provjeri('Doslo je do greske:'+ err);
               }
               else{
                   console.log('Uspjesno sam ubacio podatke za ' + this.lastID);
                   Provjeri('Uspjesno sam ubacio podatke za' + req.body.fname);
               }
            });
        }
        else{
            console.log('Korisnik je vec u mojoj Bazi ' + req.body.fname);
            Provjeri('Korisnik je vec u mojoj bazi:' + req.body.fname);
        }
    });
    db.close((err) => {
        if(err){
            console.error(err.message);
        }
        console.log('Baza uspjesno zatvorena!RegisterNewUser');
    });
};

exports.tasksForUser = function (broj,Daj) {
    var db = new sqlite3.Database('D:\\Coding\\sqlite\\sqlite-tools-win32-x86-3250300\\nodeToDo.db',sqlite3.OPEN_READWRITE, (err) => {
        if(err){
            console.error(err.message);
        }
        console.log('Uspjesno spojen na Bazu na TasksForUser!');
    });
    db.all('SELECT Task t FROM Tasks WHERE UserID=?',[broj],(err,rows) =>{
        if(err){
            console.error(err.message);
            Daj(err,null);
        }
        let niz = [];
        rows.forEach(function(row) {
            niz.push(row.t);
        });
        Daj(null,niz);
    });
    db.close((err) => {
        if(err){
            console.error(err.message);
        }
        console.log('Baza uspjesno zatvorena!TasksForUser');
    });
};

exports.addTask = function (broj,newtask,Uslov) {
    var db = new sqlite3.Database('D:\\Coding\\sqlite\\sqlite-tools-win32-x86-3250300\\nodeToDo.db',sqlite3.OPEN_READWRITE, (err) => {
        if(err){
            console.error(err.message);
        }
        console.log('Uspjesno spojen na Bazu!AddTask');
    });
    db.run('INSERT INTO Tasks VALUES(?,?)',[broj,newtask], function(err) {
        if(err){
            console.error(err.message);
            Uslov(false);
        }
        console.log('Uspjesno sam dodao zadatak za ' + this.lastID);
        Uslov(true);
    });
    db.close((err) => {
        if(err){
            console.error(err.message);
        }
        console.log('Baza uspjesno zatvorena!addTask');
    });
};
