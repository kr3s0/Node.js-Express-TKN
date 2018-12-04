const sqlite3 = require('sqlite3').verbose();

exports.checkDatabase = function (req) {
    return new Promise((resolve, reject) => {
        var db = new sqlite3.Database('D:\\Coding\\sqlite\\sqlite-tools-win32-x86-3250300\\nodeToDo.db',sqlite3.OPEN_READWRITE, (err) => {
            if(err){
                console.error(err.message);
                reject('Greska pri spajanju na bazu');
            }
            console.log('Uspjesno spojen na Bazu!Check');
        });
        //Ovo mozda ne valja, izbacit cemo iz upita dio 'AND Password=?' i pretrazivat cemo samo po FirstName
        //zbog toga što bcrypt svaki put vraca drugi has, pa da se ne mucimo sa bcrypt.compare dok testiramo
        db.get('SELECT UserID id FROM User WHERE FirstName=?',[req.body.fname],(err,row)=>{
            if (err) {
                console.error(err.message);
                reject(err.message);
            }
            else if(row === undefined){
                reject('Korisnik nije pronadjen');
            }
            else{
                resolve({ime: req.body.fname, broj: row.id});
            }
        });
        db.close((err) => {
            if(err){
                console.error(err.message);
                reject('Greska pri zatvaranja baze');
            }
            console.log('Baza uspjesno zatvorena!Check');
        });
    });
};

exports.registerNewUser = function (req){
    return new Promise ( (resolve,reject) => {
        var db = new sqlite3.Database('D:\\Coding\\sqlite\\sqlite-tools-win32-x86-3250300\\nodeToDo.db',sqlite3.OPEN_READWRITE, (err) => {
            if(err){
                console.error(err.message);
                reject(err.message);
            }
            console.log('Uspjesno spojen na Bazu!RegisterNew');
        });
        db.get('SELECT UserID id FROM User WHERE FirstName=? AND Password=?',[req.body.fname,req.body.pw],(err,row)=>{
            if (err) {
                console.error(err.message);
                reject(err.message);
            }
            else if(row === undefined) {
                db.run('INSERT INTO User VALUES(?,?,?,?)', [null,req.body.fname,req.body.lname,req.body.pw],(err)=>{
                    if(err){
                        console.error(err.message);
                        reject(err.message);
                    }
                    else{
                        console.log('Uspjesno sam ubacio podatke za ' + this.lastID);
                        resolve();
                    }
                });
            }
            else{
                console.log('Korisnik je vec u mojoj Bazi ' + req.body.fname);
                resolve();
            }
        });
        db.close((err) => {
            if(err){
                console.error(err.message);
                reject(err.message);
            }
            console.log('Baza uspjesno zatvorena!RegisterNewUser');
        });
    });
};

exports.tasksForUser = function (broj) {
    return new Promise ( (resolve, reject) => {
        var db = new sqlite3.Database('D:\\Coding\\sqlite\\sqlite-tools-win32-x86-3250300\\nodeToDo.db',sqlite3.OPEN_READWRITE, (err) => {
            if(err){
                console.error(err.message);
                reject(err.message);
            }
            console.log('Uspjesno spojen na Bazu na TasksForUser!');
        });
        db.all('SELECT Task t FROM Tasks WHERE UserID=?',[broj],(err,rows) =>{
            if(err){
                console.error(err.message);
                reject(err.message);
            }
            let niz = [];
            rows.forEach(function(row) {
                niz.push(row.t);
            });
            resolve(niz);
        });
        db.close((err) => {
            if(err){
                console.error(err.message);
                reject(err.message);
            }
            console.log('Baza uspjesno zatvorena!TasksForUser');
        });
    });
};

exports.addTask = function (broj,newtask) {
    return new Promise((resolve,reject) => {
        var db = new sqlite3.Database('D:\\Coding\\sqlite\\sqlite-tools-win32-x86-3250300\\nodeToDo.db',sqlite3.OPEN_READWRITE, (err) => {
            if(err){
                console.error(err.message);
                reject(err.message);
            }
            console.log('Uspjesno spojen na Bazu!AddTask');
        });
        db.run('INSERT INTO Tasks VALUES(?,?)',[broj,newtask], function(err) {
            if(err){
                console.error(err.message);
                reject(err.message);
            }
            console.log('Uspjesno sam dodao zadatak za ' + this.lastID);
            resolve();
        });
        db.close((err) => {
            if(err){
                console.error(err.message);
                reject(err.message);
            }
            console.log('Baza uspjesno zatvorena!addTask');
        });
    });
};
