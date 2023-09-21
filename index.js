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

app.listen(port, ()=>{console.log(`Szerver fut a ${port} porton`)});

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
app.get('/fagyasztok/:selected_freezer_y_c', function (req, res, next) {
    var adr = req.params.selected_freezer_y_c;
    var sql = 'SELECT * FROM fagyasztok WHERE Fogyasztasev < ?';
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

app.get('/fozolapok/:selected_hot_plate_c', function (req, res, next) {
    var adr = req.params.selected_hot_plate_c;
    var sql = 'SELECT * FROM fozolapok WHERE Fogyasztas < ?';
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

app.get('/hutok/:selected_refrigerator_y_c', function (req, res, next) {
    var adr = req.params.selected_refrigerator_y_c;
    var sql = 'SELECT * FROM hutok WHERE Fogyasztasev < ?';
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

app.get('/mosogatogepek/:selected_dishwasher_ep_c', function (req, res, next) {
    var adr = req.params.selected_dishwasher_ep_c;
    var sql = 'SELECT * FROM mosogatogepek WHERE Fogyasztas_kWh_eco_program < ?';
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

app.get('/sutok/:selected_oven_c', function (req, res, next) {
    var adr = req.params.selected_oven_c;
    var sql = 'SELECT * FROM sutok WHERE Fogyasztas < ?';
    db.query(sql, [adr], function (error, results) {
        if (error) {
            console.log(error);
            res.status(500).json({status: 'error'});
        } else {
            res.status(200).json(results);
        }
    });
});

app.get('/mosogepek', function (req, res, next) {
    db.query(
        'SELECT * FROM mosogepek',
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

app.get('/mosogepek/:selected_washing_m_ep40_60_c', function (req, res, next) {
    var adr = req.params.selected_washing_m_ep40_60_c;
    var sql = 'SELECT * FROM mosogepek WHERE Fogyasztas_eco_40_60_program < ?';
    db.query(sql, [adr], function (error, results) {
        if (error) {
            console.log(error);
            res.status(500).json({status: 'error'});
        } else {
            res.status(200).json(results);
        }
    });
});

app.get('/szaritogepek', function (req, res, next) {
    db.query(
        'SELECT * FROM szaritogepek',
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


app.get('/szaritogepek/:selected_dryer_y_c', function (req, res, next) {
    var adr = req.params.selected_dryer_y_c;
    var sql = 'SELECT * FROM szaritogepek WHERE Fogyasztasev < ?';
    db.query(sql, [adr], function (error, results) {
        if (error) {
            console.log(error);
            res.status(500).json({status: 'error'});
        } else {
            res.status(200).json(results);
        }
    });

});

app.get('/users', function (req, res, next) {
    db.query(
        'SELECT * FROM users',
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

app.post('/users', (req, res) => {
    const { username, email, password } = req.body;

    // SQL lekérdezés az adatbázisban lévő felhasználónév ellenőrzéséhez
    const checkUsernameQuery = 'SELECT * FROM users WHERE username = ?';
    db.query(checkUsernameQuery, [username], (usernameError, usernameResults) => {
        if (usernameError) {
            console.error('Felhasználónév ellenőrzés hiba: ', usernameError);
            res.status(500).json({ message: 'Hiba történt a regisztráció során' });
        } else {
            // Ellenőrizzük, hogy a felhasználónév már létezik-e az eredményekben
            if (usernameResults.length > 0) {
                console.log('Felhasználónév már létezik');
                res.status(409).json({ message: 'Ez a felhasználónév már foglalt' });
            } else {
                // Ellenőrizzük az e-mail címet is
                const checkEmailQuery = 'SELECT * FROM users WHERE email = ?';
                db.query(checkEmailQuery, [email], (emailError, emailResults) => {
                    if (emailError) {
                        console.error('E-mail ellenőrzés hiba: ', emailError);
                        res.status(500).json({ message: 'Hiba történt a regisztráció során' });
                    } else {
                        // Ellenőrizzük, hogy az e-mail cím már létezik-e az eredményekben
                        if (emailResults.length > 0) {
                            console.log('E-mail cím már létezik');
                            res.status(409).json({ message: 'Ez az e-mail cím már foglalt' });
                        } else {
                            // Ha minden ellenőrzés sikeres, akkor elvégezzük a beszúrást
                            const insertQuery = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
                            db.query(insertQuery, [username, email, password], (insertError, insertResult) => {
                                if (insertError) {
                                    console.error('Hiba az adatbázisba való beszúrás során: ', insertError);
                                    res.status(500).json({ message: 'Hiba történt a regisztráció során' });
                                } else {
                                    console.log('Sikeres regisztráció');
                                    res.status(200).json({ message: 'Sikeres regisztráció' });
                                }
                            });
                        }
                    }
                });
            }
        }
    });
});





