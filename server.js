const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json());
app.use(express.static("public"));
//Databas
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "slutprojekt",
});

//För att hantera inlogning
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
        res.status(500).send("Det blev ett fel, prova att byta användarnamn");
        return;
      }
      res
        .status(200)
        .send("Grattis du har nu skaffat ett konto, Filip bjuder på en bil.");
    }
  );
});
app.post("/laggTillVarukorg", (req, res) => {
  const { decodedToken, produkt } = req.body;
  console.log(decodedToken.användarnamn);

  const användarnamn = decodedToken.användarnamn; // Tilldela användarnamn från decodedToken

  const sql = `INSERT INTO varukorg (användarnamn, produkt) VALUES (?, ?)`; // Lägger till en produkt i varukorgstabellen

  connection.query(sql, [användarnamn, produkt], (error, result) => {
    // SQL - frågan körs
    if (error) {
      res.status(500).send("Det blev fel med SQL");
    }
    if (result) {
      res.status(200).json({
        success: true,
        message: "Bilen har lagts till i varukorgen",
        produkt,
      });
    }
  });
});

app.post("/taBortVarukorg", (req, res) => {
  const { decodedToken, produkt } = req.body;


  const användarnamn = decodedToken.användarnamn;


  const sql = `DELETE FROM varukorg WHERE användarnamn = ? AND produkt = ? LIMIT 1`; // Tar bort alla produkter från varukorgen för en specifik användare, borttagantet
  connection.query(sql, [användarnamn, produkt], (error, result) => {
    if (error) {
      res.status(500).send("Det blev fel med SQL"); // Hantering av fel i SQL-frågan
    }


    if (result.affectedRows > 0) {
      // Om SQL-frågan lyckades och rader påverkades, skickas en bekräftelse till användaren
      console.log("Produkter borttagna", result);
      res.status(200).json("Bilen har lagts till i varukorgen");
    } else {
      return res.status(404).json("Ingen produkt hittades för borttagning"); // om ingen rad påverkades
    }
  });
});
;

app.post("/kopVarukorg", (req, res) => {
  const { decodedToken } = req.body;
  const användarnamn = decodedToken.användarnamn;

  const sqlGetProdukt = `
      SELECT varukorg.produkt AS bilNamn
      FROM varukorg
      WHERE användarnamn = ?
  `;
  const sqlDeleteProdukt = `DELETE FROM varukorg WHERE användarnamn = ?`;

  connection.query(sqlGetProdukt, [användarnamn], (error, products) => {
      if (error) {
          console.error("Error fetching products:", error);
          return res.status(500).send("Det blev fel med SQL vid hämtning av produkter");
      }

      if (products.length === 0) {
          return res.status(404).json({ success: false, message: "Inga produkter hittades i varukorgen" });
      }

      console.log("Hämtade produkter:", products);

      connection.query(sqlDeleteProdukt, [användarnamn], (error) => {
          if (error) {
              console.error("Error deleting products:", error);
              return res.status(500).send("Det blev fel med SQL vid borttagning av produkter");
          }

          // Skicka produkterna tillbaka till klienten
          res.status(200).json({ success: true, data: products });
      });
  });
});

app.post("/laggTillHistorik", (req, res) => {
  const { decodedToken, bilar } = req.body;
  const användarnamn = decodedToken.användarnamn;
  const datum = new Date().toISOString().slice(0, 10); // Formatera datum som YYYY-MM-DD

  const sqlGetUserId = `SELECT id FROM inloggning WHERE användarnamn = ?`;

  connection.query(sqlGetUserId, [användarnamn], (error, results) => {
      if (error) {
          console.error("Error fetching user ID:", error);
          return res.status(500).send("Det blev fel med SQL vid hämtning av användar-ID");
      }

      if (results.length === 0) {
          return res.status(404).send("Användare hittades inte");
      }

      const userId = results[0].id;

      const sqlInsertHistorik = `
          INSERT INTO kvitto (UserId, datum, Bilar)
          VALUES (?, ?, ?)
      `;

      connection.query(sqlInsertHistorik, [userId, datum, bilar], (error, results) => {
          if (error) {
              console.error("Error inserting into history:", error);
              return res.status(500).send("Det blev fel med SQL vid insättning i historik");
          }

          res.status(200).json({ success: true });
      });
  });
});


app.get("/hamtaKvitton", (req, res) => {
  console.log("sdnj")
  const id = req.query.userId

  const sqlGetKvitto = `
  SELECT datum, Bilar
  FROM kvitto
  WHERE userId = ?
  ORDER BY datum DESC
`;

connection.query(sqlGetKvitto, [id], (error, results) => {
 
  if (error) {
    console.error("Fel vid hämtning av kvitto:", error);
    return res.status(500).send("Det blev fel med SQL vid hämtning av kvitto");
  }

  if (results.length === 0) {
    return res.status(404).json({ success: false, message: "Inget kvitto hittades" });
  }

  res.status(200).json({ success: true, data: results }); // Skickar tillbaka resultaten som JSON
});
});

app.get("/varukorg", (req, res) => {
  const användarnamn = req.query.användarnamn; // Hämtar användare från query-parametrarna

  const sql = `SELECT bilNamn, pris FROM varukorg, bilar WHERE användarnamn = ? AND varukorg.produkt = bilar.bilNamn`; // SQL-fråga för att hämta bilnamn och pris från varukorg och bilar tabellerna där användarnamnet matchar

  connection.query(sql, [användarnamn], (error, result) => {
    if (error) {
      console.log("ERROR vet ej", error);
      res.status(500).json("Fel vid borttaggning av produkt");
    } else if (result.length) {
      // Skickar tillaka varukorgen innehåll om det finns produkter
      res.status(200).json({ success: true, data: result });
    } else {
      res.status(200).json({ success: false, message: "Varukorgen tom" }); // Skickar svar om varukorgen är tom
    }
  });
});

app.get("/auth-test", function (req, res) {
  let authHeader = req.headers["authorization"];

  if (authHeader === undefined) {
    res.status(401).send("Auth token missing.");
  }

  let token = authHeader.slice(7); // Tar bort "BEARER " som står i början på strängen.

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
