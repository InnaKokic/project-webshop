const gallery = document.querySelector("#gallery");

class Product {
    constructor(id, name, price, inStock, category) {
        this.id = id;
        /* this.image = image; */
        this.name = name;
        this.price = price;
        this.inStock = inStock;
        this.category = category;
        /*  this.description = description; */
    }

    renderCards() {
        const card = document.createElement("div"); //skapar en div i vår HTML
        card.classList.add("card"); //ger klassnamn till vår nya div

        card.innerHTML = `
        <h3> ${this.name} </h3>
        <p> ${this.price};-</p>
        <p> ${this.inStock ? "Finns i lager" : "Slut i lager"} </p>

    `;

        return card;
    }
}

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
    new Product(17, "Grön Kaktus Mini – Mix", 39, true, "suckulenter & kaktusar"),
    new Product(18, "San Pedro kaktus", 179, true, "suckulenter & kaktusar")
    
];

products.forEach((product) => {
    gallery.appendChild(product.renderCards());
});
