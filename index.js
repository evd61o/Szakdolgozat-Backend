const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql')
const bcrypt = require('bcrypt');

const app = express();

// const functions = require('firebase-functions');
//
// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', 'https://szakdolgozat-a8381.firebaseapp.com');
//     res.header('Access-Control-Allow-Origin', 'https://szakdolgozat-a8381.firebaseapp.com');
//     res.header('Access-Control-Allow-Methods', 'GET, POST');
//     res.header('Access-Control-Allow-Headers', 'Content-Type');
//     next();
// });

app.use(cors());
app.use(bodyParser.json());

// const db = mysql.createConnection({
//     host:'sql11.freemysqlhosting.net',
//     user:'sql11650761',
//     password:'qfCGEXbbN4',
//     database:'sql11650761',
//     port:3306
// });

const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'database',
    port:3306
});


const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Szerver fut a ${port} porton`);
});

db.connect(err => {
    if(err){console.log('err')} else{
        console.log('Adatbázis sikeresen csatlakoztatva')
    }
});


app.get('/fagyasztok', function (req, res) {
    db.query(
        'SELECT fagyasztok.*, markak.Marka, tipusok.Tipus FROM fagyasztok INNER JOIN markak ON fagyasztok.BrandID = markak.BrandID INNER JOIN tipusok ON fagyasztok.TypeID = tipusok.TypeID;',
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

app.get('/fagyasztok/min', function (req, res) {
    db.query(
        'SELECT fagyasztok.*, markak.Marka, tipusok.Tipus FROM fagyasztok INNER JOIN markak ON fagyasztok.BrandID = markak.BrandID INNER JOIN tipusok ON fagyasztok.TypeID = tipusok.TypeID WHERE fagyasztok.Fogyasztasev = (SELECT MIN(Fogyasztasev) FROM fagyasztok) LIMIT 1;',
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

app.get('/fagyasztok/:selected_freezer_y_c', function (req, res) {
    var adr = req.params.selected_freezer_y_c;
    var sql = 'SELECT fagyasztok.*, markak.Marka, tipusok.Tipus FROM fagyasztok INNER JOIN markak ON fagyasztok.BrandID = markak.BrandID INNER JOIN tipusok ON fagyasztok.TypeID = tipusok.TypeID WHERE fagyasztok.Fogyasztasev < ?';
    db.query(sql, [adr], function (error, results) {
        if (error) {
            console.log(error);
            res.status(500).json({status: 'error'});
        } else {
            res.status(200).json(results);
        }
    });
});

app.get('/fozolapok', function (req, res) {
    db.query(
        'SELECT fozolapok.*, markak.Marka, tipusok.Tipus FROM fozolapok INNER JOIN markak ON fozolapok.BrandID = markak.BrandID INNER JOIN tipusok ON fozolapok.TypeID = tipusok.TypeID;',
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

app.get('/fozolapok/min', function (req, res) {
    db.query(
        'SELECT fozolapok.*, markak.Marka, tipusok.Tipus FROM fozolapok INNER JOIN markak ON fozolapok.BrandID = markak.BrandID INNER JOIN tipusok ON fozolapok.TypeID = tipusok.TypeID WHERE fozolapok.Fogyasztas = (SELECT MIN(Fogyasztas) FROM fozolapok) LIMIT 1;',
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

app.get('/fozolapok/:selected_hot_plate_c', function (req, res) {
    var adr = req.params.selected_hot_plate_c;
    var sql = 'SELECT fozolapok.*, markak.Marka, tipusok.Tipus FROM fozolapok INNER JOIN markak ON fozolapok.BrandID = markak.BrandID INNER JOIN tipusok ON fozolapok.TypeID = tipusok.TypeID WHERE fozolapok.Fogyasztas < ?;'
    db.query(sql, [adr], function (error, results) {
        if (error) {
            console.log(error);
            res.status(500).json({status: 'error'});
        } else {
            res.status(200).json(results);
        }
    });
});

app.get('/hutok', function (req, res) {
    db.query(
        'SELECT hutok.*, markak.Marka, tipusok.Tipus FROM hutok INNER JOIN markak ON hutok.BrandID = markak.BrandID INNER JOIN tipusok ON hutok.TypeID = tipusok.TypeID;',
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

app.get('/hutok/min', function (req, res) {
    db.query(
        'SELECT hutok.*, markak.Marka, tipusok.Tipus FROM hutok INNER JOIN markak ON hutok.BrandID = markak.BrandID INNER JOIN tipusok ON hutok.TypeID = tipusok.TypeID WHERE hutok.Fogyasztasev = (SELECT MIN(Fogyasztasev) FROM hutok) LIMIT 1;',
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

app.get('/hutok/:selected_refrigerator_y_c', function (req, res) {
    var adr = req.params.selected_refrigerator_y_c;
    var sql = 'SELECT hutok.*, markak.Marka, tipusok.Tipus FROM hutok INNER JOIN markak ON hutok.BrandID = markak.BrandID INNER JOIN tipusok ON hutok.TypeID = tipusok.TypeID WHERE hutok.Fogyasztasev < ?';
    db.query(sql, [adr], function (error, results) {
        if (error) {
            console.log(error);
            res.status(500).json({status: 'error'});
        } else {
            res.status(200).json(results);
        }
    });
});

app.get('/mikrohullamu_sutok', function (req, res) {
    db.query(
        'SELECT mikrohullamu_sutok.*, markak.Marka, tipusok.Tipus FROM mikrohullamu_sutok INNER JOIN markak ON mikrohullamu_sutok.BrandID = markak.BrandID INNER JOIN tipusok ON mikrohullamu_sutok.TypeID = tipusok.TypeID;',
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

app.get('/mikrohullamu_sutok/min', function (req, res) {
    db.query(
        'SELECT mikrohullamu_sutok.*, markak.Marka, tipusok.Tipus FROM mikrohullamu_sutok INNER JOIN markak ON mikrohullamu_sutok.BrandID = markak.BrandID INNER JOIN tipusok ON mikrohullamu_sutok.TypeID = tipusok.TypeID WHERE mikrohullamu_sutok.Fogyasztas = (SELECT MIN(Fogyasztas) FROM mikrohullamu_sutok) LIMIT 1;',
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

app.get('/mikrohullamu_sutok/:selected_microwave_c', function (req, res) {
    var adr = req.params.selected_microwave_c;
    var sql = 'SELECT mikrohullamu_sutok.*, markak.Marka, tipusok.Tipus FROM mikrohullamu_sutok INNER JOIN markak ON mikrohullamu_sutok.BrandID = markak.BrandID INNER JOIN tipusok ON mikrohullamu_sutok.TypeID = tipusok.TypeID WHERE mikrohullamu_sutok.Fogyasztas < ?;';
    db.query(sql, [adr], function (error, results) {
        if (error) {
            console.log(error);
            res.status(500).json({status: 'error'});
        } else {
            res.status(200).json(results);
        }
    });
});

app.get('/mosogatogepek', function (req, res) {
    db.query(
        'SELECT mosogatogepek.*, markak.Marka, tipusok.Tipus FROM mosogatogepek INNER JOIN markak ON mosogatogepek.BrandID = markak.BrandID INNER JOIN tipusok ON mosogatogepek.TypeID = tipusok.TypeID;',
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

app.get('/mosogatogepek/min', function (req, res) {
    db.query(
        'SELECT mosogatogepek.*, markak.Marka, tipusok.Tipus FROM mosogatogepek INNER JOIN markak ON mosogatogepek.BrandID = markak.BrandID INNER JOIN tipusok ON mosogatogepek.TypeID = tipusok.TypeID WHERE mosogatogepek.Fogyasztas_100_eco_program = (SELECT MIN(Fogyasztas_100_eco_program) FROM mosogatogepek) LIMIT 1;',
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

app.get('/mosogatogepek/:selected_dishwasher_100_ep_c', function (req, res) {
    var adr = req.params.selected_dishwasher_100_ep_c;
    var sql = 'SELECT mosogatogepek.*, markak.Marka, tipusok.Tipus FROM mosogatogepek INNER JOIN markak ON mosogatogepek.BrandID = markak.BrandID INNER JOIN tipusok ON mosogatogepek.TypeID = tipusok.TypeID WHERE mosogatogepek.Fogyasztas_100_eco_program < ?';
    db.query(sql, [adr], function (error, results) {
        if (error) {
            console.log(error);
            res.status(500).json({status: 'error'});
        } else {
            res.status(200).json(results);
        }
    });
});

app.get('/paraelszivok', function (req, res) {
    db.query(
        'SELECT paraelszivok.*, markak.Marka FROM paraelszivok INNER JOIN markak ON paraelszivok.BrandID = markak.BrandID;',
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

app.get('/paraelszivok/:selected_dehumidifier_c', function (req, res) {
    var adr = req.params.selected_dehumidifier_c;
    var sql = 'SELECT paraelszivok.*, markak.Marka FROM paraelszivok INNER JOIN markak ON paraelszivok.BrandID = markak.BrandID WHERE paraelszivok.Fogyasztas < ?;';
    db.query(sql, [adr], function (error, results) {
        if (error) {
            console.log(error);
            res.status(500).json({status: 'error'});
        } else {
            res.status(200).json(results);
        }
    });
});

app.get('/paraelszivok/min', function (req, res) {
    db.query(
        'SELECT paraelszivok.*, markak.Marka FROM paraelszivok INNER JOIN markak ON paraelszivok.BrandID = markak.BrandID WHERE paraelszivok.Fogyasztas = (SELECT MIN(Fogyasztas) FROM paraelszivok) LIMIT 1;',
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

app.get('/sutok', function (req, res) {
    db.query(
        'SELECT sutok.*, markak.Marka FROM sutok INNER JOIN markak ON sutok.BrandID = markak.BrandID;',
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

app.get('/sutok/minhagyomanyos', function (req, res) {
    db.query(
        'SELECT sutok.*, markak.Marka FROM sutok INNER JOIN markak ON sutok.BrandID = markak.BrandID WHERE sutok.Egy_uzemciklusra_vetitett_energiafogyasztas_hagyomanyos = (SELECT MIN(Egy_uzemciklusra_vetitett_energiafogyasztas_hagyomanyos) FROM sutok) LIMIT 1;',
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

app.get('/sutok/minlegkevereses', function (req, res) {
    db.query(
        'SELECT sutok.*, markak.Marka FROM sutok INNER JOIN markak ON sutok.BrandID = markak.BrandID WHERE sutok.Egy_uzemciklusra_vetitett_energiafogyasztas_legkevereses = (SELECT MIN(Egy_uzemciklusra_vetitett_energiafogyasztas_legkevereses) FROM sutok) LIMIT 1;',
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

app.get('/sutok/:selected_oven_c_traditional/:selected_oven_c_airmixing', function (req, res) {
    var adrTraditional = req.params.selected_oven_c_traditional;
    var adrAirmixing = req.params.selected_oven_c_airmixing;
    var sql = 'SELECT sutok.*, markak.Marka FROM sutok INNER JOIN markak ON sutok.BrandID = markak.BrandID WHERE sutok.Egy_uzemciklusra_vetitett_energiafogyasztas_hagyomanyos < ? and sutok.Egy_uzemciklusra_vetitett_energiafogyasztas_legkevereses < ?;';
    db.query(sql, [adrTraditional, adrAirmixing], function (error, results) {
        if (error) {
            console.log(error);
            res.status(500).json({status: 'error'});
        } else {
            res.status(200).json(results);
        }
    });
});

app.get('/mosogepek', function (req, res) {
    db.query(
        'SELECT mosogepek.*, markak.Marka, tipusok.Tipus FROM mosogepek INNER JOIN markak ON mosogepek.BrandID = markak.BrandID INNER JOIN tipusok ON mosogepek.TypeID = tipusok.TypeID;',
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

app.get('/mosogepek/min', function (req, res) {
    db.query(
        'SELECT mosogepek.*, markak.Marka, tipusok.Tipus FROM mosogepek INNER JOIN markak ON mosogepek.BrandID = markak.BrandID INNER JOIN tipusok ON mosogepek.TypeID = tipusok.TypeID WHERE mosogepek.Fogyasztas_100_eco_40_60_program = (SELECT MIN(Fogyasztas_100_eco_40_60_program) FROM mosogepek) LIMIT 1;',
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

app.get('/mosogepek/:selected_washing_m_100_ep40_60_c', function (req, res) {
    var adr = req.params.selected_washing_m_100_ep40_60_c;
    var sql = 'SELECT mosogepek.*, markak.Marka, tipusok.Tipus FROM mosogepek INNER JOIN markak ON mosogepek.BrandID = markak.BrandID INNER JOIN tipusok ON mosogepek.TypeID = tipusok.TypeID WHERE mosogepek.Fogyasztas_100_eco_40_60_program < ?';
    db.query(sql, [adr], function (error, results) {
        if (error) {
            console.log(error);
            res.status(500).json({status: 'error'});
        } else {
            res.status(200).json(results);
        }
    });
});

app.get('/szaritogepek', function (req, res) {
    db.query(
        'SELECT szaritogepek.*, markak.Marka, tipusok.Tipus FROM szaritogepek INNER JOIN markak ON szaritogepek.BrandID = markak.BrandID INNER JOIN tipusok ON szaritogepek.TypeID = tipusok.TypeID;',
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

app.get('/szaritogepek/min', function (req, res) {
    db.query(
        'SELECT szaritogepek.*, markak.Marka, tipusok.Tipus FROM szaritogepek INNER JOIN markak ON szaritogepek.BrandID = markak.BrandID INNER JOIN tipusok ON szaritogepek.TypeID = tipusok.TypeID WHERE szaritogepek.Fogyasztasev = (SELECT MIN(Fogyasztasev) FROM szaritogepek) LIMIT 1;',
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


app.get('/szaritogepek/:selected_dryer_y_c', function (req, res) {
    var adr = req.params.selected_dryer_y_c;
    var sql = 'SELECT szaritogepek.*, markak.Marka, tipusok.Tipus FROM szaritogepek INNER JOIN markak ON szaritogepek.BrandID = markak.BrandID INNER JOIN tipusok ON szaritogepek.TypeID = tipusok.TypeID WHERE szaritogepek.Fogyasztasev < ?;';
    db.query(sql, [adr], function (error, results) {
        if (error) {
            console.log(error);
            res.status(500).json({status: 'error'});
        } else {
            res.status(200).json(results);
        }
    });

});

app.post('/users',  (req, res) => {
    const { username, email, password, action } = req.body;
    const plainPassword = req.body.password; // Felhasználó által megadott jelszó

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
        bcrypt.hash(plainPassword, saltRounds, (err, hashedPassword) => {
            if (err) {
                console.error('Hiba a jelszó titkosítása során: ' + err.stack);
                return res.status(500).json({ message: 'Hiba történt a regisztráció során' });
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
    const {
        searchValueRefrigerator, searchValueFreezer, searchValueHot_plate, searchValueMicrowave, searchValueDishwasher,
        searchValueDehumidifier, searchValueOven, searchValueWashing_machine, searchValueDryer, email
    } = req.body;

    // Ellenőrizzük, hogy az e-mail cím már létezik-e az adatbázisban
    const checkEmailQuery = 'SELECT * FROM profiles WHERE email = ?';
    db.query(checkEmailQuery, [email], (emailError, emailResults) => {
        if (emailError) {
            console.error('E-mail cím ellenőrzés hiba: ', emailError);
            res.status(500).json({ message: 'Hiba történt a mentés során' });
        } else {
            if (emailResults.length > 0) {
                // Az e-mail cím már létezik, frissítjük a meglévő profilt
                const updateQuery = `
                    UPDATE profiles
                    SET
                        searchValueRefrigerator = ?,
                        searchValueFreezer = ?,
                        searchValueHot_plate = ?,
                        searchValueMicrowave = ?,
                        searchValueDishwasher = ?,
                        searchValueDehumidifier = ?,
                        searchValueOven = ?,
                        searchValueWashing_machine = ?,
                        searchValueDryer = ?
                    WHERE email = ?;
                `;
                const updateValues = [
                    searchValueRefrigerator, searchValueFreezer, searchValueHot_plate, searchValueMicrowave, searchValueDishwasher,
                    searchValueDehumidifier, searchValueOven, searchValueWashing_machine, searchValueDryer, email
                ];
                db.query(updateQuery, updateValues, (updateError, updateResult) => {
                    if (updateError) {
                        console.error('Hiba a profil frissítésekor: ', updateError);
                        res.status(500).json({ message: 'Hiba történt a profil frissítése során!' });
                    } else {
                        console.log('Profil frissítve');
                        res.status(200).json({ message: 'Profil sikeresen frissítve!' });
                    }
                });
            } else {
                // Az e-mail cím nem létezik, új profil létrehozása
                const insertQuery = 'INSERT INTO profiles (searchValueRefrigerator, searchValueFreezer, searchValueHot_plate, searchValueMicrowave, searchValueDishwasher, searchValueDehumidifier, searchValueOven, searchValueWashing_machine, searchValueDryer, email) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
                const insertValues = [
                    searchValueRefrigerator, searchValueFreezer, searchValueHot_plate, searchValueMicrowave, searchValueDishwasher,
                    searchValueDehumidifier, searchValueOven, searchValueWashing_machine, searchValueDryer, email
                ];
                db.query(insertQuery, insertValues, (insertError, insertResult) => {
                    if (insertError) {
                        console.error('Hiba az adatbázisba való beszúrás során: ', insertError);
                        res.status(500).json({ message: 'Hiba történt a mentés során!' });
                    } else {
                        console.log('Sikeres mentés');
                        res.status(200).json({ message: 'Sikeres mentés!' });
                    }
                });
            }
        }
    });
});


app.get('/profiles/:userEmail', function (req, res) {
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



