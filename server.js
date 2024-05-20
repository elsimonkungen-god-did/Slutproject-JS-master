const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const cors = require("cors");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json());
app.use(express.static("public"));
// app.use(cors());

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "slutprojekt",
});

app.post("/loggaInn", async (req, res) => {
  const { användarnamn, lösenord } = req.body;

  const sql = `SELECT * FROM inloggning WHERE användarnamn = ?`;
  connection.query(sql, [användarnamn], (error, results) => {
    if (error) {
      res.status(500).json({ error: "Ett fel uppstod med sql" });
      return;
    }

    if (results.length > 0) {
      const hashatlösenord = results[0].lösenord;

      bcrypt.compare(lösenord, hashatlösenord, function (error, result) {
        if (error) {
          res.status(500).json({
            error:
              "Ett fel uppstod mellan jämförandet av lösenord och krypterat lösenord",
          });
          return;
        }
        if (result) {
          let payload = {
            sub: results[0].id,
            användarnamn: results[0].användarnamn,
          };
          const token = jwt.sign(
            payload,
            "jaggillarsmurfarmedstorahattarochstortskägg",
            { expiresIn: 7200 }
          );
          res.status(200).json({ success: true, token: token }); // Send response with token
        } else {
          res.status(401).json({ error: "Fel lösenord eller användarnamn" });
        }
      });
    } else {
      res.status(404).json({ error: "Användare finns inte" });
    }
  });
});

app.post("/register", async (req, res) => {
  const { användarnamn, kundNamn, kundEfternamn, email, lösenord } = req.body;
  const salt = await bcrypt.genSalt(10); //Härs saltas lösenordet
  const hashedpasword = await bcrypt.hash(lösenord, salt);

  // Lägg till användaren i databasen
  const sql = `INSERT INTO inloggning (användarnamn, kundNamn, kundEfternamn, email, lösenord) 
                 VALUES (?, ?, ?, ?, ?)`;
  connection.query(
    sql,
    [användarnamn, kundNamn, kundEfternamn, email, hashedpasword],
    (error) => {
      if (error) {
        res.status(500).send("Error registering user");
        return;
      }
      res.status(200).send("User registered successfully");
    }
  );
});

app.post("/laggTillVarukorg", (req, res) => {
  const { decodedToken, produkt } = req.body;
  console.log(decodedToken.användarnamn);

  const användarnamn = decodedToken.användarnamn;

  const sql = `INSERT INTO varukorg (produkt, användarnamn) VALUES (?, ?)`;

  connection.query(sql, [produkt, användarnamn], (error, result) => {
    if (error) {
      res.status(500).send("Det blev fel med SQL");
    }
    if (result) {
      res.status(200).json("Bilen har lagts till i varukorgen");
    }
  });
});

// inte testat än (demo)
app.post("/taBortVarukorg", (req, res) => {
  const { decodedToken, produkt } = req.body;

  const användarnamn = decodedToken.användarnamn;

  const sql = `DELETE FROM varukorg (produkt, användarnamn) WHERE VALUES (?, ?)`;

  connection.query(sql, [produkt, användarnamn], (error, result) => {
    if (error) {
      res.status(500).send("Det blev fel med SQL");
    }
    if (result) {
      res.status(200).json("Bilen har lagts till i varukorgen");
    }
  });
});

app.get("/cart", (req, res) => {
  const { produkt } = req.body;
  const användarnamn = req.query.användarnamn;

  const sql = `SELECT produkt FROM varukorg WHERE användarnamn = ?`;

  connection.query(sql, [produkt, användarnamn], (error, result) => {
    if (error) {
      res.status(500).send("Fel vid borttaggning av produkt");
    }
    if (result) {
      res.status(200).json("Bilen borta :)");
    }
  });
});

app.get("/auth-test", function (req, res) {
  let authHeader = req.headers["authorization"];

  if (authHeader === undefined) {
    res.status(401).send("Auth token missing.");
  }

  let token = authHeader.slice(7); // Tar bort "BEARER " som står i början på strängen.
  console.log("token: ", token);

  let decoded = {}; //Viktigt att vi ser till att decoded är ett objekt eftersom det är vad token body är.
  try {
    decoded = jwt.verify(token, "jaggillarsmurfarmedstorahattarochstortskägg");
  } catch (err) {
    // Om något är fel med token så kastas ett error.

    console.error(err); //Logga felet, för felsökning på servern.

    res.status(401).send("Invalid auth token");
  }

  res.send(decoded); // Skickar tillbaka den avkodade, giltiga, tokenen.
});

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

// let decoded
// try {
//   decoded = jwt.verify(token, 'din superhemliga secret')
// } catch (err) {
//   console.log(err) //Logga felet, för felsökning på servern.
//   res.status(401).send('Invalid auth token')
// }

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server är på port ${PORT}`);
});

connection.connect();
