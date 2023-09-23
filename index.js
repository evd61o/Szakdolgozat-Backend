const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql')
const bcrypt = require('bcrypt');

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

app.post('/users', async (req, res) => {
    const { username, email, password, action } = req.body;

    if (action === 'login') {
        // Ellenőrizd az email címet az adatbázisban
        const loginQuery = 'SELECT * FROM users WHERE email = ?';
        db.query(loginQuery, [email], (err, results) => {
            if (err) {
                console.error('Hiba az adatbázis lekérdezésekor: ' + err.stack);
                res.status(500).json({ error: 'Hiba történt a bejelentkezés során' });
                return;
            }

            if (results.length === 1) {
                const storedHashedPassword = results[0].password;
                const saltRounds = 10; // A titkosítási erősség (10-12 ajánlott)
                const plainPassword = 'password'; // Felhasználó által megadott jelszó
                bcrypt.hash(plainPassword, saltRounds, (err, hashedPassword) => {});


                // Itt használhatod a bcrypt.compare-t a jelszó ellenőrzésére
                bcrypt.compare(plainPassword, storedHashedPassword, (compareErr, compareResult) =>{
                    if (compareErr) {
                        console.error('Hiba a jelszó ellenőrzésekor: ' + compareErr.stack);
                        res.status(500).json({ error: 'Hiba történt a bejelentkezés során' });
                        return;
                    }

                    if (compareResult) {
                        // Sikeres bejelentkezés
                        res.json({ message: 'Sikeres bejelentkezés' });
                    } else {
                        // Sikertelen bejelentkezés, küldj vissza egy hibaüzenetet
                        res.status(401).json({ error: 'Sikertelen bejelentkezés' });
                    }
                });
            } else {
                // A megadott email címhez nem tartozik felhasználó
                res.status(401).json({ error: 'Sikertelen bejelentkezés' });
            }
            });

    } else if (action === 'register') {
        const saltRounds = 10; // A titkosítási erősség (10-12 ajánlott)
        const plainPassword = 'password'; // Felhasználó által megadott jelszó
        bcrypt.hash(plainPassword, saltRounds, (err, hashedPassword) => {
            if (err) {
                // Kezeld a hibát
            } else {
                // SQL lekérdezés az adatbázisban lévő felhasználónév ellenőrzéséhez
                const checkUsernameQuery = 'SELECT * FROM users WHERE username = ?';
                db.query(checkUsernameQuery, [username], (usernameError, usernameResults) => {
                    if (usernameError) {
                        console.error('Felhasználónév ellenőrzés hiba: ', usernameError);
                        res.status(500).json({message: 'Hiba történt a regisztráció során'});
                    } else {
                        // Ellenőrizzük, hogy a felhasználónév már létezik-e az eredményekben
                        if (usernameResults.length > 0) {
                            console.log('Felhasználónév már létezik');
                            res.status(409).json({message: 'Ez a felhasználónév már foglalt'});
                        } else {
                            // Ellenőrizzük az e-mail címet is
                            const checkEmailQuery = 'SELECT * FROM users WHERE email = ?';
                            db.query(checkEmailQuery, [email], (emailError, emailResults) => {
                                if (emailError) {
                                    console.error('E-mail ellenőrzés hiba: ', emailError);
                                    res.status(500).json({message: 'Hiba történt a regisztráció során'});
                                } else {
                                    // Ellenőrizzük, hogy az e-mail cím már létezik-e az eredményekben
                                    if (emailResults.length > 0) {
                                        console.log('E-mail cím már létezik');
                                        res.status(410).json({message: 'Ez az e-mail cím már foglalt'});
                                    } else {
                                        // Ha minden ellenőrzés sikeres, akkor elvégezzük a beszúrást
                                        const insertQuery = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
                                        db.query(insertQuery, [username, email, hashedPassword], (insertError, insertResult) => {
                                            if (insertError) {
                                                console.error('Hiba az adatbázisba való beszúrás során: ', insertError);
                                                res.status(500).json({message: 'Hiba történt a regisztráció során'});
                                            } else {
                                                console.log('Sikeres regisztráció');
                                                res.status(200).json({message: 'Sikeres regisztráció'});
                                            }
                                        });
                                    }
                                }
                            });
                        }
                    }
                });
            }
        });
    } else {
        // Ismeretlen művelet, küldj vissza hibaüzenetet
        res.status(400).json({ message: 'Érvénytelen művelet' });
    }
});


app.post('/profiles', (req, res) => {
    const { searchValueRefrigerator, searchValueFreezer, searchValueHot_plate, searchValueMicrowave, searchValueDishwasher,
        searchValueDehumidifier, searchValueOven, searchValueWashing_machine, searchValueDryer, email} = req.body;

    const checkEmailQuery = 'SELECT * FROM profiles WHERE email = ?';
    db.query(checkEmailQuery, [email], (emailError, emailResults) => {
        if (emailError) {
            console.error('E-mail cím ellenőrzés hiba: ', emailError);
            res.status(500).json({ message: 'Hiba történt a mentés során' });
        } else {
            if (emailResults.length > 0) {
                console.log('Ezzel az E-mail címmel már van profil létrehozva!');
                res.status(409).json({message: 'Ezzel az E-mail címmel már van profil létrehozva!'});
            } else {
                const insertQuery = 'INSERT INTO profiles (searchValueRefrigerator, searchValueFreezer, searchValueHot_plate, searchValueMicrowave, searchValueDishwasher, searchValueDehumidifier, searchValueOven, searchValueWashing_machine, searchValueDryer, email) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
                db.query(insertQuery, [searchValueRefrigerator, searchValueFreezer, searchValueHot_plate, searchValueMicrowave, searchValueDishwasher, searchValueDehumidifier, searchValueOven, searchValueWashing_machine, searchValueDryer, email], (error, result) => {
                    if (error) {
                        console.error('Hiba az adatbázisba való beszúrás során: ', error);
                        res.status(500).json({message: 'Hiba történt a mentés során!'});
                    } else {
                        console.log('Sikeres mentés');
                        res.status(200).json({message: 'Sikeres mentés!'});
                    }
                });

            }
        }
    });
});

app.get('/profiles/:userEmail', function (req, res, next) {
    var adr = req.params.userEmail;
    var sql = 'SELECT * FROM profiles WHERE email = ?';
    db.query(sql, [adr], function (error, results) {
        if (error) {
            console.log(error);
            res.status(500).json({status: 'error'});
        } else {
            res.status(200).json(results);
        }
    });
});

app.delete('/profiles/:userEmail', async (req, res) => {
    const adr = req.params.userEmail;

    // Töröld az adatbázisban az adott felhasználóhoz tartozó rekordokat
    const deleteQuery = 'DELETE FROM * profiles WHERE email = ?';

    db.query(deleteQuery, [adr], (err, results) => {
        if (err) {
            console.error('Hiba történt a törlés során: ' + err.stack);
            res.status(500).json({ error: 'Hiba történt a törlés során' });
            return;
        }
        res.status(200).json({ message: 'Sikeres törlés' });
    });
});





