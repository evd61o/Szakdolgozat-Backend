const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql')

const app = express();

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'database',
    port:3306
});
const port = process.env.PORT || 3000;

app.listen(port, ()=>{
    console.log(`Szerver fut a ${port} porton`)
});

db.connect(err => {
    if(err){console.log('err')}
    console.log('Adatbázis sikeresen csatlakoztatva')
});


app.get('/fagyasztok', function (req, res, next) {
    db.query(
        'SELECT * FROM fagyasztok',
        (error, results) => {
            if (error) {
                console.log(error);
                res.status(500).json({status: 'error'});
            } else {
                res.status(200).json(results);
            }
        }
    );
});
app.get('/fagyasztok/:searchValueFreezer', function (req, res, next) {
    var adr = req.params.searchValueFreezer;
    var sql = 'SELECT * FROM fagyasztok WHERE Modell = ?';
    db.query(sql, [adr], function (error, results) {
        if (error) {
            console.log(error);
            res.status(500).json({status: 'error'});
        } else {
            res.status(200).json(results);
        }
    });
});

app.get('/fozolapok', function (req, res, next) {
    db.query(
        'SELECT * FROM fozolapok',
        (error, results) => {
            if (error) {
                console.log(error);
                res.status(500).json({status: 'error'});
            } else {
                res.status(200).json(results);
            }
        }
    );
});
app.get('/fozolapok/:searchValueHot_plates', function (req, res, next) {
    var adr = req.params.searchValueHot_plates;
    var sql = 'SELECT * FROM fozolapok WHERE Modell = ?';
    db.query(sql, [adr], function (error, results) {
        if (error) {
            console.log(error);
            res.status(500).json({status: 'error'});
        } else {
            res.status(200).json(results);
        }
    });
});

app.get('/hutok', function (req, res, next) {
    db.query(
        'SELECT * FROM hutok',
        (error, results) => {
            if (error) {
                console.log(error);
                res.status(500).json({status: 'error'});
            } else {
                res.status(200).json(results);
            }
        }
    );
});

app.get('/hutok/:searchValueRefrigerator', function (req, res, next) {
    var adr = req.params.searchValueRefrigerator;
    var sql = 'SELECT * FROM hutok WHERE Modell = ?';
    db.query(sql, [adr], function (error, results) {
        if (error) {
            console.log(error);
            res.status(500).json({status: 'error'});
        } else {
            res.status(200).json(results);
        }
    });
});
app.get('/mikrohullamu_sutok', function (req, res, next) {
    db.query(
        'SELECT * FROM mikrohullamu_sutok',
        (error, results) => {
            if (error) {
                console.log(error);
                res.status(500).json({status: 'error'});
            } else {
                res.status(200).json(results);
            }
        }
    );
});
app.get('/mikrohullamu_sutok/:searchValueMicrowave', function (req, res, next) {
    var adr = req.params.searchValueMicrowave;
    var sql = 'SELECT * FROM mikrohullamu_sutok WHERE Modell = ?';
    db.query(sql, [adr], function (error, results) {
        if (error) {
            console.log(error);
            res.status(500).json({status: 'error'});
        } else {
            res.status(200).json(results);
        }
    });
});

app.get('/mosogatogepek', function (req, res, next) {
    db.query(
        'SELECT * FROM mosogatogepek',
        (error, results) => {
            if (error) {
                console.log(error);
                res.status(500).json({status: 'error'});
            } else {
                res.status(200).json(results);
            }
        }
    );
});
app.get('/mosogatogepek/:searchValueDishwasher', function (req, res, next) {
    var adr = req.params.searchValueDishwasher;
    var sql = 'SELECT * FROM mosogatogepek WHERE Modell = ?';
    db.query(sql, [adr], function (error, results) {
        if (error) {
            console.log(error);
            res.status(500).json({status: 'error'});
        } else {
            res.status(200).json(results);
        }
    });
});
app.get('/paraelszivok', function (req, res, next) {
    db.query(
        'SELECT * FROM paraelszivok',
        (error, results) => {
            if (error) {
                console.log(error);
                res.status(500).json({status: 'error'});
            } else {
                res.status(200).json(results);
            }
        }
    );
});
app.get('/paraelszivok/:searchValueDehumidifier', function (req, res, next) {
    var adr = req.params.searchValueDehumidifier;
    var sql = 'SELECT * FROM paraelszivok WHERE Tipus = ?';
    db.query(sql, [adr], function (error, results) {
        if (error) {
            console.log(error);
            res.status(500).json({status: 'error'});
        } else {
            res.status(200).json(results);
        }
    });
});

app.get('/sutok', function (req, res, next) {
    db.query(
        'SELECT * FROM sutok',
        (error, results) => {
            if (error) {
                console.log(error);
                res.status(500).json({status: 'error'});
            } else {
                res.status(200).json(results);
            }
        }
    );
});
app.get('/sutok/:searchValueOven', function (req, res, next) {
    var adr = req.params.searchValueOven;
    var sql = 'SELECT * FROM sutok WHERE Tipus = ?';
    db.query(sql, [adr], function (error, results) {
        if (error) {
            console.log(error);
            res.status(500).json({status: 'error'});
        } else {
            res.status(200).json(results);
        }
    });
});
