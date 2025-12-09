const gallery = document.querySelector("#gallery");
const filterBtnGreen = document.querySelector("#greenCat");
const filterBtnFlower = document.querySelector("#flowerCat");
const filterBtnCactus = document.querySelector("#cactCat");
const homeBtn = document.querySelector("#homeBtn");
const cartBtn = document.querySelector("#cartBtn");
const counter = document.querySelector("#counter");

class Product {
    constructor(id, name, price, stock, category) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.stock = stock;
        this.category = category;
        this.image = "";
        this.description = "";
    }

    //Funktionen som "aktiverar" våra produktkort och gör de synliga
    renderCards() {
        const card = document.createElement("div"); //skapar en div i vår HTML
        card.classList.add("card"); //ger klassnamn till vår nya div

        //Lägger till innehåll i vår nya div
        card.innerHTML = `
		<div id = "cardWrapper">
        	<img src="${this.image}" class="cardImg" alt="Produktbild"/>

			<div id="cardContent">
				<h3 id="cardTitle"> ${this.name} </h3>
				<p id="cardPrice"> ${this.price};-</p>
				<button class="cardBtn" id="details-btn">Visa mer</button>
				<button class="cardBtn" id="addToCart-btn">Lägg i kundvagn</button>
			</div>

		</div>
    `;

        const detailsBtn = card.querySelector("#details-btn"); //Hämtar in detailsBtn som skapades i innerHtml ovan.

        // Kör funktionen som öppnar modal när man klickar på knappen
        detailsBtn.addEventListener("click", () => {
            openDetailsModal(this); // skickar hela produktobjektet till modal-funktionen (alltså allting som finns i objekten vi skapar nedan i products)
        });

        const addToCartBtn = card.querySelector("#addToCart-btn"); //Hämtar in addToCart-knappen som skapades i innerHtml ovan

        // Om produkten har 0 i lager, gör knappen avstängd och byt text
        if (this.stock === 0) {
            addToCartBtn.disabled = true; // Går inte att klicka
            addToCartBtn.textContent = "Slut i lager"; // Ny text på knappen
            addToCartBtn.classList.add("disabled-btn"); // Lägger till en klass för att kunna byta färg på knappen vid lagerdiff
        }

        /*  Om produkten finns i lager så går den att lägga till i cart med klick-eventet.
        Funktionen i eventet kollar om produkten redan ligger i cart,  i så fall addera antalet, annars lägg till den med antal 1. 
        Detta för att det inte ska skapas flera varor av samma produkt i cart */
        if (this.stock > 0) {
            addToCartBtn.addEventListener("click", () => {
                const existingProduct = cart.find(
                    (item) => item.id === this.id
                ); //Jämför produkt id med this.id för att se om produkten redan existerar i varukorgen
                if (existingProduct) {
                    existingProduct.quantity++; //addera value quantity
                } else {
                    cart.push({ ...this, quantity: 1 }); //om inte produkten finns i cart, lägg till den med en ny key: quantity med value = 1
                }
                openCartModal(); //Modalen öppnar när produkten lagts till i cart
                updateCounter(); //Uppdaterar countern i cart-ikonen
            });
        }
        return card;
    }
}

//Array av våra produkter som objekt
const products = [
    new Product(1, "Monstera Deliciosa", 249, 12, "gröna växter"),
    new Product(2, "Guldpalm", 299, 33, "gröna växter"),
    new Product(3, "Svärmorstunga", 199, 0, "gröna växter"),
    new Product(4, "Garderobsblomma", 249, 0, "gröna växter"),
    new Product(5, "Elefantöra", 129, 17, "gröna växter"),
    new Product(6, "Gummiträd", 279, 1, "gröna växter"),

    new Product(7, "Orkidé", 199, 18, "blommande växter"),
    new Product(8, "Primula", 45, 5, "blommande växter"),
    new Product(9, "Cyklamen", 59, 10, "blommande växter"),
    new Product(10, "Hibiskus", 149, 0, "blommande växter"),
    new Product(11, "Flamingoblomma", 249, 90, "blommande växter"),
    new Product(12, "Kalanchoe", 39, 7, "blommande växter"),

    new Product(13, "Aloe Vera", 89, 20, "suckulenter & kaktusar"),
    new Product(14, "Echeveria Elegans", 69, 37, "suckulenter & kaktusar"),
    new Product(15, "Plattkaktus", 129, 6, "suckulenter & kaktusar"),
    new Product(16, "Haworthia Fasciata", 79, 15, "suckulenter & kaktusar"),
    new Product(17, "Grön Kaktus Mini – Mix", 39, 0, "suckulenter & kaktusar"),
    new Product(18, "San Pedro kaktus", 179, 2, "suckulenter & kaktusar"),
];

//Array med våra bilder och description och parar ihop med produkterna via id.
//Vi separerar detta från products för att hålla koden mer överskådlig.
const productInfo = [
    // GRÖNA VÄXTER
    {
        id: 1,
        image: "assets/images/flowerImages/greens/MonsteraDeliciosa.png",
        description: `
           Populär grönväxt med stora, blanka blad som utvecklar naturliga hål och flikar. Trivs bäst i ljust läge utan direkt sol. Låt jorden torka upp mellan vattningarna. En lättskött växt som snabbt blir ett grönt blickfång i rummet.
        `,
    },
    {
        id: 2,
        image: "assets/images/flowerImages/greens/Guldpalm.png",
        description: `
            Luftrenande palm med mjuka, ljusgröna fjäderblad. Trivs i ljust läge och vill ha jämn fukt i jorden. Gillar en dusch då och då för att hålla bladen fräscha. Ger rummet en tropisk känsla
        `,
    },
    {
        id: 3,
        image: "assets/images/flowerImages/greens/Svarmorstunga-(Sansevieria).png",
        description: `Mycket tålig växt med upprätta, svärdformade blad. Klarar både ljus och skugga och behöver väldigt lite vatten. Perfekt för den som vill ha en lättskött och robust växt.
        
        `,
    },
    {
        id: 4,
        image: "assets/images/flowerImages/greens/Garderobsblomma.png",
        description: `Elegant växt med glänsande, mörkgröna blad. Tål skugga och vill vattnas sparsamt. En av de mest lättskötta gröna växterna och passar i nästan alla miljöer.`,
    },
    {
        id: 5,
        image: "assets/images/flowerImages/greens/Elefantora.png",
        description: `Charmig växt med runda, myntformade blad på långa stjälkar. Trivs i ljust läge och vill ha lätt fuktig jord. Ger ofta små ”bebisar” som kan planteras om.
        `,
    },
    {
        id: 6,
        image: "assets/images/flowerImages/greens/FicusElastic(Gummitrad).png",
        description: `Ståtlig växt med tjocka, blanka blad. Vill stå ljust men inte i direkt sol. Vattnas måttligt och uppskattar hög luftfuktighet. En klassiker som ger rummet ett stilrent uttryck.
        `,
    },

    // BLOMMANDE VÄXTER
    {
        id: 7,
        image: "assets/images/flowerImages/flowers/Orkidé-Phalaenopsis.png",
        description: `Elegant orkidé som blommar länge med stora, färgstarka blommor. Trivs bäst i ljust läge och vill vattnas sparsamt. Svalare placering förlänger blomningen. 

        `,
    },
    {
        id: 8,
        image: "assets/images/flowerImages/flowers/Primula.png",
        description: `Färgstark vårblomma som trivs i ljust läge och lätt fuktig jord. Perfekt som glad färgklick i hemmet. Kan placeras svalare för längre blomning. 

        `,
    },
    {
        id: 9,
        image: "assets/images/flowerImages/flowers/Cyklamen.png",
        description: `Dekorativ växt med hjärtformade blad och eleganta blommor i starka färger. Vill stå svalt och ljust och vattnas försiktigt underifrån.

        `,
    },
    {
        id: 10,
        image: "assets/images/flowerImages/flowers/Hibiskus.png",
        description: `Tropisk blomma med stora, praktfulla blommor. Trivs i ljust läge och vill ha jämn fukt i jorden. En riktig färgexplosion när den trivs.

        `,
    },
    {
        id: 11,
        image: "assets/images/flowerImages/flowers/Flamingoblomma-(Anthurium).png",
        description: `Glänsande, hjärtformade blad och hållbara blommor i rött, rosa eller vitt. Trivs i ljust läge och vill ha lätt fuktig jord. Luftfuktighet gynnar blomningen.


        `,
    },
    {
        id: 12,
        image: "assets/images/flowerImages/flowers/Kalanchoe.png",
        description: `Lättskött växt med små, hållbara blommor i många färger. Trivs i ljust läge och vill torka upp mellan vattningarna. En klassiker som blommar länge.
        `,
    },
    //SUCKULENTER & KAKTUSAR
    {
        id: 13,
        image: "assets/images/flowerImages/kaktusar/Aloe-Vera.png",
        description: `Klassisk suckulent med tjocka, gröna blad fyllda med gel. Trivs i soligt läge och vill ha mycket lite vatten. Perfekt för dig som vill ha en växt som nästan sköter sig själv.
        `,
    },
    {
        id: 14,
        image: "assets/images/flowerImages/kaktusar/EcheveriaElegans.png",
        description: `Rosettformad suckulent med tjocka, blågröna blad. Vill stå ljust och vattnas sparsamt. En dekorativ liten växt som passar i små krukor.
        `,
    },
    {
        id: 15,
        image: "assets/images/flowerImages/kaktusar/Opuntia-Microdasys-(Plattkaktus).png",
        description: `Karaktäristisk kaktus med runda ”öron” täckta av små, mjuka taggar. Trivs i soligt fönster och vill torka ut helt mellan vattningarna.
        `,
    },
    {
        id: 16,
        image: "assets/images/flowerImages/kaktusar/Haworthia-Fasciata.png",
        description: `Kompakt och lättskött suckulent med zebrarandiga blad. Klarar både sol och halvskugga och behöver mycket lite vatten.
        `,
    },
    {
        id: 17,
        image: "assets/images/flowerImages/kaktusar/Gron-Kaktus-Mini-Mix.png",
        description: `Små dekorativa kaktusar i varierande former. Vill stå soligt och måste torka upp helt mellan vattningarna. Perfekt som liten prydnad eller gåva.
        `,
    },
    {
        id: 18,
        image: "assets/images/flowerImages/kaktusar/San-Pedro-kaktus-(Trichocereus).png",
        description: `Ståtlig pelarkaktus med snabb tillväxt. Trivs i soligt läge och vattnas mycket sparsamt. En arkitektonisk och iögonfallande växt.`,
    },
];

//En tom array för vår kundvagn där vi ska lägga till produkter
const cart = [];

//En forEach-loop i products-arrayen där vi kopplar ihop image och description med våra produkter
products.forEach((product) => {
    const info = productInfo.find((item) => item.id === product.id); // Letar efter ett objekt i productInfo som har samma id som produkten
    // Om ett matchande objekt hittas...
    if (info) {
        product.image = info.image; // ...sätter vi produktens bild till värdet från productInfo
        product.description = info.description; // ...och sätter produktens beskrivning till värdet från productInfo
    }
});

// Skapar en kopia av products-arrayen och sorterar den alfabetiskt efter produktnamn
// ... = spread operator skapar en kopia av arrayen så att originalet inte påverkas
//.localeCompare() = Inbyggd funktion som jämför två strängar enligt valt språk (här svenska: "sv")
const sorted = [...products].sort((a, b) => a.name.localeCompare(b.name, "sv"));
sorted.forEach((product) => {
    // Loopar igenom den sorterade listan och renderar varje produktkort till galleriet utifrån sort() funktionen
    gallery.appendChild(product.renderCards());
});

//Funktion som filtrerar ut produkterna baserat på category.
const filteredCategory = (category) => {
    gallery.innerHTML = ""; // Tömmer galleriet

    const sortedFiltered = products //Skapar en inre funktion som filtrerar utifrån category och sedan sorterar alfabetiskt
        .filter((product) => product.category === category)
        .sort((a, b) => a.name.localeCompare(b.name, "sv"));

    sortedFiltered.forEach((product) =>
        gallery.appendChild(product.renderCards())
    ); // lägger till den nya filtrearde arrayen i vårt tömda gallery
};

//Eventlisteners för våra filter-knappar i navbaren
filterBtnGreen.addEventListener("click", () =>
    filteredCategory("gröna växter")
);
filterBtnFlower.addEventListener("click", () =>
    filteredCategory("blommande växter")
);
filterBtnCactus.addEventListener("click", () =>
    filteredCategory("suckulenter & kaktusar")
);

//Evenlistener för hemknappen som, likt första funktionen, visar alla våra produkter igen, sorterade.
homeBtn.addEventListener("click", () => {
    gallery.innerHTML = "";

    sorted.forEach((product) => {
        gallery.appendChild(product.renderCards());
    });
});

// ÖPPNAR DETAILS "Visa mer" MODALEN

function openDetailsModal(product) {
    const modal = document.querySelector("#modal"); //Hämtar in modal-elementet från HTML
    const modalBody = document.querySelector("#modalBody"); //Hämtar in modal-elementet från HTML

    //Lägger till vårt innehåll i modal-body
    modalBody.innerHTML = `
        <img src="${product.image}" class="modal-img" />

        <h2>${product.name}</h2>
        <p><strong>Pris:</strong> ${product.price} kr</p>
        <p id="details-category"><strong>Kategori:</strong> ${
            product.category
        }</p>
        <p><strong>Lagersaldo:</strong> ${
            product.stock === 0
                ? "Slut i lager"
                : product.stock < 10
                ? "Få i lager (< 10)"
                : "Finns i lager (+ 10)"
        }</p>

        <h3>Beskrivning</h3>
        <p>${product.description}</p>
    `;

    modal.classList.remove("hidden"); //Tar bort klassen "hidden" för att modalen ska synas när funktionen aktiveras
    //Tar bort klassnamn för att styling för cart endast ska gälla på cart
}

//Funktion för att öppna vår varukorg
const openCartModal = () => {
    const modal = document.querySelector("#modal");
    const modalBody = document.querySelector("#modalBody");
    modal.classList.remove("hidden");

    // Om varukorgen är tom
    if (cart.length === 0) {
        modalBody.innerHTML = "<h2>Kundvagn</h2><p>Din kundvagn är tom.</p>";
        return;
    }

    // Starta modalen
    modalBody.innerHTML = `
  <div id = "cartHeader">
    <h2>Kundvagn</h2>
    <button id="clearCart" class="cardBtn">Töm kundvagn</button>
    </div>
    <div id="cartModal-content"></div>
    <p id="totalPrice"></p>
  
  `;

    //Funktion för att clear button ska tömma hela varukorgen
    const clearBtn = document.querySelector("#clearCart");
    clearBtn.addEventListener("click", () => {
        modalBody.innerHTML = "<h2>Kundvagn</h2><p>Din kundvagn är tom.</p>";
        cart.splice(0, cart.length);
        updateCounter();
    });

    // Hämta containern vi skapade
    const container = modalBody.querySelector("#cartModal-content");

    // Lägg in alla produkter direkt
    cart.forEach((item, index) => {
        container.innerHTML += `
      <div class="cartItem">
        <img src="${item.image}" class="cartModalImg" />
        <p id="cartName">${item.name}</p>
        <p id="cartQuantity">Antal: ${item.quantity} </p>
        <p id="cartPrice" >${item.price} kr/st</p>
        <button onclick="deleteItem(${index})" class="x-btn" id="deleteBtn">&times;</button>
                        
      </div>
    `;
    });
    document.querySelector(
        "#totalPrice"
    ).textContent = `Totalsumma: ${totalSum()} kr`;
};

/* 
index → var i arrayen vi ska börja
1 → hur många element som ska tas bort 
*/

const deleteItem = (index) => {
    cart.splice(index, 1);
    openCartModal();
    updateCounter();
};

cartBtn.addEventListener("click", (e) => {
    openCartModal();
});

// STÄNGER MODALEN

document.querySelector("#closeModal").addEventListener("click", () => {
    document.querySelector("#modal").classList.add("hidden"); //Lägger till klassen "hidden" som är display:none, för att gömma modalen igen
});

document.querySelector("#modal").addEventListener("click", (e) => {
    if (e.target.id === "modal") {
        e.target.classList.add("hidden");
    }
});

const updateCounter = () => {
    let items = 0;
    for (let i = 0; i < cart.length; i++) {
        items += cart[i].quantity; //Uppdaterar priset baserat på antalet av varje produkt som finns i korgen
    }
    counter.textContent = items;
};
updateCounter();

//Funktion för att addera summan av alla våra produkter i varukorgen
const totalSum = () => {
    let sum = 0;
    for (let i = 0; i < cart.length; i++) {
        sum += cart[i].price * cart[i].quantity; //Uppdaterar priset baserat på antalet av varje produkt som finns i korgen
    }
    return sum;
};
