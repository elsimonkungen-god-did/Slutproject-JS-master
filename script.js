// Eventlyssnare på knappen som anropar funktionen
// addProductToLocalStorage() med en hårdkodad produkt.
document.querySelector(".LT").addEventListener("click", () => {
  const data = {
    produkt: "765LT",
    pris: 490810,
  };

  fetch("/läggTillVarukorg", {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // Ange innehållet som JSON
    },
    body: JSON.stringify(data), // Konvertera objektet till JSON-format och inkludera det i body
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Något gick fel");
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Fel:", error);
    });
});

document.querySelector(".Spider").addEventListener("click", () => {
  addProductToLocalStorage({ name: "765LT Spider |", price: 100 });
  location.reload();
});
document.querySelector(".S-spider").addEventListener("click", () => {
  addProductToLocalStorage({ name: "720S Spider |", price: 100 });
  location.reload();
});
document.querySelector(".S").addEventListener("click", () => {
  addProductToLocalStorage({ name: "720S |", price: 100 });
  location.reload();
});
document.querySelector(".Artura").addEventListener("click", () => {
  addProductToLocalStorage({ name: "Artura |", price: 100 });
  location.reload();
});
document.querySelector(".GT").addEventListener("click", () => {
  addProductToLocalStorage({ name: "GT  |", price: 100 });
  location.reload();
});
document.querySelector(".Senna").addEventListener("click", () => {
  addProductToLocalStorage({ name: "Mclaren Senna |", price: 100 });
  location.reload();
});
document.querySelector(".Speedtail").addEventListener("click", () => {
  addProductToLocalStorage({ name: "Speedtail |", price: 100 });
  location.reload();
});
document.querySelector(".Senna-gtr").addEventListener("click", () => {
  addProductToLocalStorage({ name: "Mclaren Senna GTR |", price: 100 });
  location.reload();
});
document.querySelector(".Elva").addEventListener("click", () => {
  addProductToLocalStorage({ name: "Elva |", price: 100 });
  location.reload();
});

// Exempel på att använda SQL för att lägga till en produkt
document.querySelector(".LT").addEventListener("click", () => {
  addProductToDatabase("765LT", 382500, "Supercar");
  location.reload();
});

// Fortsätt med att lägga till resten av produkterna på samma sätt...

/**
 *
 *
 * Lägger till objektet product i en array i localStorage som heter products.
 * @param {object product} product ett objekt som läggs in i en array i localStorage.
 */
function addProductToLocalStorage(product) {
  // Hämta ut alla produkter som finns i localStorage
  // JSON.parse(string) tar en sträng i JSON-format och gör ett javascript-objekt av det.
  let products = JSON.parse(localStorage.getItem("products"));

  // kontrollera om det fanns en array i localStorage
  if (products && Array.isArray(products)) {
    // OM det fanns en array i localStorage, lägg till product.
    products.push(product);
  } else {
    // om det INTE fanns en array i localStorage så skapa en med product i.
    products = [product];
  }

  // Spara arrayen med produkter i localStorage igen.
  // JSON.stringify(objekt) skapar en sträng på JSON-format av ett objekt.
  localStorage.setItem("products", JSON.stringify(products));
}

let cartDiv = document.querySelector("#cart-content");

//localStorage.getItem("nyckel") hämtar värdet på det som sparats i LocalStorage med nyckeln "nyckel".
// JSON.parse(string) tar en sträng i JSON-format och gör ett javascript-objekt av det.
let products = JSON.parse(localStorage.getItem("products"));

//Variabeln products innehåller nu en array med alla produkter som sparats i LocalStorage.
console.log(products);

if (Array.isArray(products)) {
  products.forEach((product) => {
    cartDiv.insertAdjacentHTML(
      "beforeend",
      `<div><button class="button">Namn: ${product.name} Pris: ${product.price}</div>`
    );
  });
  document.querySelectorAll(".button").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      console.log(event.target);

      const indexToRemove = products.findIndex(
        (product) => product.name === event.target.textContent.split(" ")[1]
      );

      products.splice(indexToRemove, 1);

      localStorage.setItem("products", JSON.stringify(products));
      location.reload();
    });
  });
} else {
  cartDiv.insertAdjacentHTML("beforeend", `<div>Varukorgen är tom.</div>`);
}
// rad 83-97 har gjorts med open ai

let tabortcontents = document.querySelectorAll(".ta-bort-contents");
tabortcontents.forEach((element) => {
  element.addEventListener("click", () => {
    localStorage.clear();
    location.reload();
  });
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

/**
 *
 * Det här är nytt
 *
 *
 */

// function loginUser(email, password) {
//   fetch('/login', {
//       method: 'POST',
//       headers: {
//           'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ email: email, password: password }),
//   })
//   .then(response => {
//       if (!response.ok) {
//           throw new Error('Fel vid inloggning');
//       }
//       return response.json();
//   })
//   .then(data => {
//       console.log(data);
//       // Hantera svaret från servern här
//   })
//   .catch(error => {
//       console.error('Fel vid inloggning:', error);
//       // Hantera fel här
//   });
// }
