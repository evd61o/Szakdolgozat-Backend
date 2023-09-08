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

app.get
