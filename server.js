const express = require('express');
const mysql = require('mysql');
// const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');


const app = express();
// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.json());
app.use(express.urlencoded())
app.use(express.json())
app.use(express.static('public'))

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "slutprojekt"
});

app.post('/loggaIn', async (req, res) => {
    //Funkar det att ha två stycken constanter med namnet sql?? Kolla syntax
    const { användarnamn, lösenord } = req.body; 
    const sql = `SELECT * FROM inloggning WHERE användarnamn = ?`;
    console.log(användarnamn)
    connection.query(sql, [användarnamn], (error, results) =>{
        if (error) {
            res.status(500).json({ error: 'Ett fel uppstod med sql' });
            return;
        }

        if (results.length > 0) {
            //Eftersom det bara kan finnas ett lösenord per användarnamn
            const storedPassword = results[0].lösenord;
            //Här jämförs lösenordet som har skrivits in med det saltade lösenordet på databasen.
            bcrypt.compare(lösenord, storedPassword, function(error, result) {
                if (error) {
                    res.status(500).json({ error: 'Ett fel uppstod mellan jämförandet av lösenord och krypterat lösenord' });
                    return;
                }
                if (result) {
                    const namn = results[0].kundNamn + results[0].kundEfternamn;
                    console.log("hejehej")
                    res.json({ success: true, message: `Hej ${namn} !!!` });
                    //Ge även token, ge den tidsbegränsning
                } else {
                    res.status(401).json({ error: 'Fel lösenord eller användarnamn' });
                }
                
            });
        } else {
            res.status(404).json({ error: 'Användare finns inte' });
        }
    });
});



app.post('/register', async (req, res) => {
    const { användarnamn, kundNamn, kundEfternamn, email, lösenord } = req.body; 
    const salt = await bcrypt.genSalt(10); //Härs saltas lösenordet
    const hashedpasword = await bcrypt.hash(lösenord,salt)

    // Lägg till användaren i databasen
    const sql = `INSERT INTO inloggning (användarnamn, kundNamn, kundEfternamn, email, lösenord) 
                 VALUES (?, ?, ?, ?, ?)`;
    connection.query(sql, [användarnamn, kundNamn, kundEfternamn, email, hashedpasword], (error) => {
        if (error) {
            res.status(500).send('Error registering user');
            return;
        }
        res.status(200).send('User registered successfully');
    });
});

// app.post('/läggTillVarukorg', async (req, res) => {
//     //Det behövs ta in både bilen och använderan som la till bilen i varukorgen
//     const {} = req.body; 

//     // "Inser INTO", användarnamnet samt b
//     const sql = `INSERT INTO varukorg (användarnamn, bilNamn) 
//                  VALUES (?, ?)`;
//     //bilen och använderen
//     connection.query(sql, [användarnamn, bilen], (error) => {
//         if (error) {
//             res.status(500).send('Det blev fel med SQL');
//             return;
//         }
//         res.status(200).send('Bilen', [$bilen.namn], 'har lagts till i varukorgen');
//     });
// });

// app.get('/seVarukorg', async (req, res) => {
//     const {användarnamn} = req.body; 

//     const sql = `SELECT * FROM varukorg WHERE användarnamn = ?`;
//     connection.query(sql, [användarnamn], (error) => {
//         if (error) {
//             res.status(500).json({ error: 'Ett fel Med framtagningen av bilens efternamn'});
//             return;
//         }
//         else if(results.length > 0) {
//         const bilarna = resultat;
//                 res.status(200).json(bilarna));
//             }
// });

// app.get('/Visa bilar', (res) => {
//     const(select * from )


    
// }



// );




const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server är på port ${PORT}`);
});

connection.connect();

