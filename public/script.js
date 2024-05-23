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
  alert(`Du har lagt till bilen ${produkt} i din varukorg`);
  try {
    const decodedToken = await autentisering(token);


    const formData = {
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


    const result = await response.json();
    if (result.succes) {
      varukorgHamtad = false;
      await hämtaVarukorg(token);
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

// Filips  nya galna saker
let varukorgHamtad = false;

document.querySelector(".ta-bort-contents").addEventListener("click", () => {
  console.log("Knapp har tryckts");
  taBortProdukt(token);
});

document.querySelector(".kop-contents").addEventListener("click", () => {
  kopProdukt(token);
});

document.querySelector(".varukorg").addEventListener("mouseenter", async () => {
  if (!varukorgHamtad) {
    await hämtaVarukorg(token);
  }
});


async function hämtaVarukorg(token) {
  try {
    const decodedToken = await autentisering(token);
    const användarnamn = decodedToken.användarnamn;


    const response = await fetch(`/cart?användarnamn=${användarnamn}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const result = await response.json();
    console.log("Hämtad varukorg:", result);


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
  VarukorgContentDiv.innerhtml = ""; //PS ha små boxstäver på html INTE STORA


  if (VarukorgContents.length === 0) {
    VarukorgContentDiv.innerhtml = "<li> din varukorg är tom. </li>";
    return;
  }
  const ul = document.getElementById("ul");


  let totalsumma = 0;


  VarukorgContents.forEach((produkt) => {
    const li = document.createElement("li");
    li.textContent = `Bil: ${produkt.bilNamn}, Pris: ${produkt.pris} kr`;
    ul.appendChild(li);


    totalsumma += produkt.pris;
  });


  VarukorgContentDiv.appendChild(ul);


  const totalsummaElement = document.getElementById("summa");
  totalsummaElement.textContent = `Summa: ${totalsumma} kr`;
  VarukorgContentDiv.appendChild(totalsummaElement);


  console.log("Total summa:", totalsumma);
}


//----


async function taBortProdukt(token) {
  try {
    const decodedToken = await autentisering(token);


    const formData = {
      decodedToken,
      // produkt: produkt,
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
      throw new Error(`HTTP error! status: ${response.status}`);
    }


    const result = await response.json();
    if (result.success) {
      console.log("Success", result);
      varukorgHamtad = false;
      await hämtaVarukorg(token);
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


   

document.getElementById("anvandarnamnForm").addEventListener("submit", function (event) {
    event.preventDefault();
     var nyttAnvandarnamn = document.getElementById("användarnamn").value;
   
      console.log("Form submitted");
          

        console.log(nyttAnvandarnamn)
          skapaNyttAnvandarnamn(nyttAnvandarnamn)
          
          });

        async function skapaNyttAnvandarnamn(nyttAnvändarnamn) {
          try {
           const decodedToken = await autentisering(token);
           const gammaltAnvändarnamn = decodedToken.användarnamn;
         
            const input = {
             nyttAnvändarnamn,
              gammaltAnvändarnamn
              };
          
              const response = await fetch("/bytAnvandarnamn", {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                  Accept: "application/json"
                },
                body: JSON.stringify(input)
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
          
          

