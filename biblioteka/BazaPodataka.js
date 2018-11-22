const sqlite3 = require('sqlite3').verbose();

exports.checkDatabase = function (req) {
    var db = new sqlite3.Database('D:\\Coding\\sqlite\\sqlite-tools-win32-x86-3250300\\nodeToDo.db',sqlite3.OPEN_READWRITE, (err) => {
        if(err){
            console.error(err.message);
        }
        console.log('Uspjesno spojen na Bazu!Check');
    });
    var ime;
    var trenutniID;
    db.get("SELECT UserID id FROM User WHERE FirstName='?';",[req.body.fname],(err,row)=>{
        if (err) {
            console.error(err.message);
        }
        else if(row === undefined){
            console.log('Nisam nista pronasao za ' + req.body.fname);
        }
        else{
            //req.session.user = {username: req.body.fname, broj: row.id};
            console.log(row.id);
            console.log('sada sam ovdje');
            ime = req.body.fname;
            trenutniID = row.id;
            console.log(row);
        }
    });
    db.close((err) => {
        if(err){
            console.error(err.message);
        }
        console.log('Baza uspjesno zatvorena!Check');
    });
    console.log(trenutniID+'OvdjesamYUHUUU');
    req.session.user = {username: ime , broj: trenutniID};
    return req;
};

exports.registerNewUser = function (req){
    var db = new sqlite3.Database('D:\\Coding\\sqlite\\sqlite-tools-win32-x86-3250300\\nodeToDo.db',sqlite3.OPEN_READWRITE, (err) => {
        if(err){
            console.error(err.message);
        }
        console.log('Uspjesno spojen na Bazu!RegisterNew');
    });
    var uslov;
    db.get("SELECT UserID id FROM User WHERE FirstName='?' AND Password='?';",[req.body.fname,req.body.pw],(err,row)=>{
        if (err) {
            console.error(err.message);
            uslov = false;
        }
        else if(row === undefined) {
            db.run("INSERT INTO User VALUES(?,'?','?','?');", [null,req.body.fname,req.body.lname,req.body.pw],(err)=>{
               if(err){
                   console.error(err.message);
               }
               console.log('Uspjesno sam ubacio podatke za ' + this.lastID);
            });
            uslov = true;
        }
        else{
            console.log('Korisnik je vec u mojoj Bazi ' + req.body.fname);
            uslov = false;
        }
    });
    db.close((err) => {
        if(err){
            console.error(err.message);
        }
        console.log('Baza uspjesno zatvorena!RegisterNewUser');
    });
    return uslov;
};

exports.tasksForUser = function (broj) {
    let niz = [];
    var db = new sqlite3.Database('D:\\Coding\\sqlite\\sqlite-tools-win32-x86-3250300\\nodeToDo.db',sqlite3.OPEN_READWRITE, (err) => {
        if(err){
            console.error(err.message);
        }
        console.log('Uspjesno spojen na Bazu na TasksForUser!');
    });
    db.each("SELECT Task t FROM Tasks WHERE UserID='?';",[broj],(err,row) =>{
        if(err){
            console.error(err.message);
        }
        niz.push(row.t);
        console.log(row.t);
        console.log(row);
    });
    db.close((err) => {
        if(err){
            console.error(err.message);
        }
        console.log('Baza uspjesno zatvorena!TasksForUser');
    });
    return niz;
};

exports.addTask = function (broj,newtask) {
    var db = new sqlite3.Database('D:\\Coding\\sqlite\\sqlite-tools-win32-x86-3250300\\nodeToDo.db',sqlite3.OPEN_READWRITE, (err) => {
        if(err){
            console.error(err.message);
        }
        console.log('Uspjesno spojen na Bazu!AddTask');
    });
    db.run("INSERT INTO Tasks VALUES(?,'?');",[broj,newtask], function(err) {
        if(err){
            console.error(err.message);
        }
        console.log('Uspjesno sam dodao zadatak za ' + this.lastID);
    });
    db.close((err) => {
        if(err){
            console.error(err.message);
        }
        console.log('Baza uspjesno zatvorena!addTask');
    });
};
