const token = localStorage.getItem("jwt");

async function autentisering(token) {
  try {
    const response = await fetch("/auth-test", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

if (document.querySelector(".Spider")) {
  document.querySelector(".Spider").addEventListener("click", () => {
    läggTillProdukt("765LT Spider");
  });
  document.querySelector(".S-spider").addEventListener("click", () => {
    läggTillProdukt("720 S Spider");
  });
  document.querySelector(".S").addEventListener("click", () => {
    läggTillProdukt("720 S");
  });
  document.querySelector(".Artura").addEventListener("click", () => {
    läggTillProdukt("Artura");
  });
  document.querySelector(".GT").addEventListener("click", () => {
    läggTillProdukt("GT");
  });
  document.querySelector(".Senna").addEventListener("click", () => {
    läggTillProdukt("Mclaren Senna");
  });
  document.querySelector(".Speedtail").addEventListener("click", () => {
    läggTillProdukt("Speedtail");
  });
  document.querySelector(".Senna-gtr").addEventListener("click", () => {
    läggTillProdukt("Mclaren Senna GTR");
  });
  document.querySelector(".Elva").addEventListener("click", () => {
    läggTillProdukt("Elva");
  });
  document.querySelector(".LT").addEventListener("click", () => {
    läggTillProdukt("765LT");
  });
  document.querySelector(".ta-bort-contents").addEventListener("click", () => {
    console.log("Knapp har tryckts");
    taBortProdukt(token);
  });

  document.querySelector(".varukorg").addEventListener("mousenter", () => {
    if (!varukorgHamtad) {
      hämtaVarukorg(token);
    }
  });

  document.querySelector(".kop-contents").addEventListener("click", () => {
    kopProdukt(token);
  });
  supercars = document.querySelector(".modeller-supercars");
  gt = document.querySelector(".modeller-gt");
  ultimate = document.querySelector(".modeller-ultimate");
  legacy = document.querySelector(".modeller-legacy");

  supercars_li = document.querySelector(".supercars");
  gt_li = document.querySelector(".gt");
  ultimate_li = document.querySelector(".ultimate");
  legacy_li = document.querySelector(".legacy");

  document.querySelector(".supercars").addEventListener("click", () => {
    supercars.style = "display:block; display:flex";
    supercars_li.style = "color:orange; border-bottom:1px solid orange";

    gt_li.style = "color:black; border-bottom:1px solid black";
    ultimate_li.style = "color:black; border-bottom:1px solid black";
    legacy_li.style = "color:black; border-bottom:1px solid black";
    gt.style = "display:none";
    ultimate.style = "display:none";
    legacy.style = "display:none";
  });

  document.querySelector(".gt").addEventListener("click", () => {
    gt.style = "display:block; display:flex";
    gt_li.style = "color:orange; border-bottom:1px solid orange";

    supercars_li.style = "color:black; border-bottom:1px solid black";
    ultimate_li.style = "color:black; border-bottom:1px solid black";
    legacy_li.style = "color:black; border-bottom:1px solid black";
    supercars.style = "display:none";
    ultimate.style = "display:none";
    legacy.style = "display:none";
  });

  document.querySelector(".ultimate").addEventListener("click", () => {
    ultimate.style = "display:block; display:flex";
    ultimate_li.style = "color:orange; border-bottom:1px solid orange";

    supercars_li.style = "color:black; border-bottom:1px solid black";
    gt_li.style = "color:black; border-bottom:1px solid black";
    legacy_li.style = "color:black; border-bottom:1px solid black";
    supercars.style = "display:none";
    gt.style = "display:none";
    legacy.style = "display:none";
  });
  document.querySelector(".legacy").addEventListener("click", () => {
    legacy.style = "display:block; display:flex";
    legacy_li.style = "color:orange; border-bottom:1px solid orange";

    supercars_li.style = "color:black; border-bottom:1px solid black";
    gt_li.style = "color:black; border-bottom:1px solid black";
    ultimate_li.style = "color:black; border-bottom:1px solid black";
    supercars.style = "display:none";
    gt.style = "display:none";
    ultimate.style = "display:none";
  });

  document
    .querySelector(".artiklar-header-button")
    .addEventListener("click", () => {
      document.querySelector(".artiklar-main").scrollLeft -= 200;
    });
  document
    .querySelector(".artiklar-header-button2")
    .addEventListener("click", () => {
      document.querySelector(".artiklar-main").scrollLeft += 200;
    });
}

async function läggTillProdukt(produkt) {
  try {
    const decodedToken = await autentisering(token); // Autentiserar användaren med en token och väntar på svar

    const formData = {
      // Skapar ett formdata objekt med den avkodade tokenene och produkten
      decodedToken,
      produkt: produkt,
    };

    const response = await fetch("/laggTillVarukorg", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(formData),
    });

    const result = await response.json(); // väntar på svar att servern omvandlas till json
    if (result.success) {
      // om produkten lades till framgångsrikt
      alert(`Du har lagt till bilen ${produkt} i din varukorg`); // visar alert när och vilken produkt som läggs till i varukorgen
      varukorgHamtad = false;
      await hämtaVarukorg(token); // hämtar den uppdaterade varukorgen
      location.reload();
    } else {
      alert("Produkten kunde inte läggas till i varukorgen.");
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

async function autentisering(token) {
  try {
    const response = await fetch("/auth-test", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}
let varukorgHamtad = false;

document.querySelector(".ta-bort-contents").addEventListener("click", () => {
  // när användaren trycker på knappen
  console.log("Knapp har tryckts");
  taBortProdukt(token);
});

document.querySelector(".kop-contents").addEventListener("click", () => {
  // när användaren trycker på knappen
  kopProdukt(token);
});

document.querySelector(".varukorg").addEventListener("mouseenter", async () => {
  // när användaren hovrar över knappen
  if (!varukorgHamtad) {
    await hämtaVarukorg(token);
  }
});

async function hämtaVarukorg(token) {
  try {
    const decodedToken = await autentisering(token); // Autentiserar användaren med token och väntar på svar
    const användarnamn = decodedToken.användarnamn;

    const response = await fetch(`/cart?användarnamn=${användarnamn}`, {
      // skrickar en begäran med användarnamnet som query-parametrar till cart
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const result = await response.json(); // väntar på att svar från servern omvandlas till json
    console.log("Hämtad varukorg:", result);

    // kontrollerar om hämtningen lyckades
    if (result.success) {
      visaVarukorgContents(result.data);
      varukorgHamtad = true;
    } else {
      console.error("Fel vid hämtning av varukorg", result.message);
    }
  } catch (error) {
    console.error("Fel vid kommunikation med servern", error);
  }
}

function visaVarukorgContents(VarukorgContents) {
  const VarukorgContentDiv = document.getElementById("cart-content");
  const UlContent = document.getElementById("ul");
  UlContent.innerHTML = ""; // Rensar tidigare innehåll i diven

  const ul = document.getElementById("ul");
  let totalsumma = 0;

  VarukorgContents.forEach((produkt) => {
    const li = document.createElement("li");
    const knapp = document.createElement("button"); // Skapar en knapp för att ta bort produkten
    knapp.textContent = `Ta bort ${produkt.bilNamn} (${produkt.pris} kr)`;

    knapp.addEventListener("click", async () => {
      try {
        await taBortProdukt(token, produkt.bilNamn); // Anrop funktion för att ta bort produkten
        await hämtaVarukorg(token); // Hämtar uppdaterade varukorgen
        varukorgHamtad = true;
      } catch (error) {
        console.error("Fel vid borttagning av produkt:", error);
      }
    });

    // li.textContent = `Bil: ${produkt.bilNamn}, Pris: ${produkt.pris} kr`;
    li.appendChild(knapp); // Lägger till knappen i li-elementet

    ul.appendChild(li);

    totalsumma += produkt.pris;
  });

  VarukorgContentDiv.appendChild(ul);

  const totalsummaElement = document.getElementById("summa");
  totalsummaElement.textContent = `Summa: ${totalsumma} kr`;
  VarukorgContentDiv.appendChild(totalsummaElement);

  console.log("Total summa:", totalsumma); // Loggar totalsumman, behövs det?
}

//----

async function taBortProdukt(token, produkt) {
  // funktion för att ta bort produkter
  try {
    const decodedToken = await autentisering(token);

    const formData = {
      decodedToken,
      produkt,
    };

    const response = await fetch("/taBortVarukorg", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      // kontrollerar att svaret är ok, annars fel.
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    // kontrollerar om borttagningen av produkter lyckade
    if (result.success) {
      console.log("Success", result);
      varukorgHamtad = false;
      await hämtaVarukorg(token);
      location.reload();
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

async function kopProdukt(token) {
  try {
    const decodedToken = await autentisering(token);
    const formData = { decodedToken };

    const response = await fetch("/kopVarukorg", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    if (result.success) {
      const products = result.data;
      // console.log(products);
      let alertMessage = "Du har köpt följande produkter:\n";

      products.forEach((product) => {
        alertMessage += `Bil: ${product.bilNamn}, Pris: ${product.pris} kr\n`;
      });
      console.log(alertMessage);

      alert(alertMessage);
      console.log("Success:", result);
    } else {
      alert("Köpet misslyckades.");
    }

    varukorgHamtad = false;
    hämtaVarukorg(token);
  } catch (error) {
    console.error("Error:", error);
  }
}

document
  .getElementById("anvandarnamnForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    var nyttAnvandarnamn = document.getElementById("användarnamn").value;

    console.log("Form submitted");

    console.log(nyttAnvandarnamn);
    skapaNyttAnvandarnamn(nyttAnvandarnamn);
  });

async function skapaNyttAnvandarnamn(nyttAnvändarnamn) {
  try {
    const decodedToken = await autentisering(token);
    const gammaltAnvändarnamn = decodedToken.användarnamn;

    const input = {
      nyttAnvändarnamn,
      gammaltAnvändarnamn,
    };

    const response = await fetch("/bytAnvandarnamn", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(input),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error:", error);
  }
}
