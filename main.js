const gallery = document.querySelector("#gallery");
const filterBtnGreen = document.querySelector("#greenCat");
const filterBtnFlower = document.querySelector("#flowerCat");
const filterBtnCactus = document.querySelector("#cactCat");
const homeBtn = document.querySelector("#homeBtn");
const cartBtn = document.querySelector("#cartBtn");
const counter = document.querySelector("#counter");

class Product {
    constructor(id, name, price, inStock, category) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.inStock = inStock;
        this.category = category;
        this.image = "";
        this.description = "";
    }

    renderCards() {
        const card = document.createElement("div"); //skapar en div i vår HTML
        card.classList.add("card"); //ger klassnamn till vår nya div

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

        //Funktion för att koppla "visa mer" -knappen med funktionen som öppnar vår modal
        const detailsBtn = card.querySelector("#details-btn");
        detailsBtn.addEventListener("click", () => {
            openDetailsModal(this); // skickar hela produktobjektet till modal-funktionen (alltså allting som finns i objekten vi sakapar nedan i products)
        });

        const addToCartBtn = card.querySelector("#addToCart-btn");

        /*   En funktion som kollar om produkten redan ligger i cart, i så fall (if) plussa antalet, 
        annars (else) lägg till den i cart med antal 1 */
        addToCartBtn.addEventListener("click", () => {
            const existingProduct = cart.find((item) => item.id === this.id);
            if (existingProduct) {
                existingProduct.quantity++; //skapar en ny egenskap (key) i vårt this-objekt
            } else {
                cart.push({ ...this, quantity: 1 });
            }
            openCartModal();
            updateCounter();
            console.log(cart);
        });

        return card;
    }
}
//Array av våra produkter
const products = [
    new Product(1, "Monstera Deliciosa", 249, true, "gröna växter"),
    new Product(2, "Guldpalm", 299, true, "gröna växter"),
    new Product(3, "Svärmorstunga", 199, true, "gröna växter"),
    new Product(4, "Garderobsblomma", 249, true, "gröna växter"),
    new Product(5, "Elefantöra", 129, true, "gröna växter"),
    new Product(6, "Gummiträd", 279, true, "gröna växter"),

    new Product(7, "Orkidé", 199, true, "blommande växter"),
    new Product(8, "Primula", 45, true, "blommande växter"),
    new Product(9, "Cyklamen", 59, true, "blommande växter"),
    new Product(10, "Hibiskus", 149, true, "blommande växter"),
    new Product(11, "Flamingoblomma", 249, true, "blommande växter"),
    new Product(12, "Kalanchoe", 39, true, "blommande växter"),

    new Product(13, "Aloe Vera", 89, true, "suckulenter & kaktusar"),
    new Product(14, "Echeveria Elegans", 69, true, "suckulenter & kaktusar"),
    new Product(15, "Plattkaktus", 129, true, "suckulenter & kaktusar"),
    new Product(16, "Haworthia Fasciata", 79, true, "suckulenter & kaktusar"),
    new Product(
        17,
        "Grön Kaktus Mini – Mix",
        39,
        true,
        "suckulenter & kaktusar"
    ),
    new Product(18, "San Pedro kaktus", 179, true, "suckulenter & kaktusar"),
];

//Array med våra bilder och description
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

/* Loopar igenom alla produkter i products‑arrayen. Hittar motsvarande objekt i productInfo som har samma id. 
Om (if) ett matchande objekt hittas: tilldelas product.image och product.description värdena från productInfo. */
products.forEach((product) => {
    const info = productInfo.find((item) => item.id === product.id);

    if (info) {
        product.image = info.image;
        product.description = info.description;
    }
});

// Skapar en alfabetiskt sorterad kopia av products-arrayen (sorterar efter produktnamn)
// ... = kopierar arrayen
/* .localeCompare() är en inbyggd funktion som sortetar utifrån språkets alfabet. 
Man kan välja vilket språk, annars är default eng. */
const sorted = [...products].sort((a, b) => a.name.localeCompare(b.name, "sv"));

// Loopar igenom den sorterade listan och renderar varje produktkort till galleriet med hjälp av sorted() funktionen
sorted.forEach((product) => {
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

//Eventlistener för hemknappen som visar alla våra produkter sorterade, igen.
homeBtn.addEventListener("click", () => {
    gallery.innerHTML = "";

    sorted.forEach((product) => {
        gallery.appendChild(product.renderCards());
    });
});

// Öppnar Details-modalen

const openDetailsModal = (product) => {
    const modal = document.querySelector("#modal"); //Hämtar in modal-elementet från HTML
    const modalBody = document.querySelector("#modalBody"); //Hämtar in modal-elementet från HTML

    //Lägger till vårt innehåll i modal-body
    modalBody.innerHTML = `
        <img src="${product.image}" class="modal-img" />

        <h2>${product.name}</h2>
        <p><strong>Pris:</strong> ${product.price} kr</p>
        <p><strong>Kategori:</strong> ${product.category}</p>
        <p><strong>Lagersaldo:</strong> ${
            product.inStock ? "Finns i lager" : "Slut i lager"
        }</p>

        <h3>Beskrivning</h3>
        <p>${product.description}</p>
    `;

    modal.classList.remove("hidden"); //Tar bort klassen "hidden" för att modalen ska synas när funktionen aktiveras
    //Tar bort klassnamn för att styling för cart endast ska gälla på cart
};

//Öppnar Cart-modalen
const openCartModal = () => {
    const modal = document.querySelector("#modal");
    const modalBody = document.querySelector("#modalBody");
    modal.classList.remove("hidden");

    // Om varukorgen är tom
    if (cart.length === 0) {
        modalBody.innerHTML = "<h2>Kundvagn</h2><p>Din kundvagn är tom.</p>";
        return;
    }

    //Modalens innehåll
    modalBody.innerHTML = `
  <div id = "cartHeader">
    <h2>Kundvagn</h2>
    <button id = "clearCart">Töm kundvagn</button>
    </div>
    <div id="cartModal-content"></div>
    <p id="totalPrice"></p>
  
  `;
    //Funktion för att clear button ska tömma hela varukorgen
    const clearBtn = document.querySelector("#clearCart");
    clearBtn.addEventListener("click", () => {
        modalBody.innerHTML = "<h2>Kundvagn</h2><p>Din kundvagn är tom.</p>";
        return;
    });

    // Hämta containern vi skapade
    const container = modalBody.querySelector("#cartModal-content");

    // Produktens information i varukorgen (cartModal-content)
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

const deleteItem = (index) => {
    cart.splice(index, 1); //index → var i arrayen vi ska börja, 1 → hur många element som ska tas bort
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
        items += cart[i].quantity; //Uppdaterar priset baserat på antalet av varje produkt som finns i cart
    }
    counter.textContent = items;
};
updateCounter();

//Funktion för att addera summan av alla våra produkter i cart
const totalSum = () => {
    let sum = 0;
    for (let i = 0; i < cart.length; i++) {
        sum += cart[i].price * cart[i].quantity; //Uppdaterar priset baserat på antalet av varje produkt som finns i cart
    }
    return sum;
};
