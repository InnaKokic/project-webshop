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
        <h2> ${this.name} </h2>
        <p> ${this.price} :-</p>
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
];

products.forEach((product) => {
  gallery.appendChild(product.renderCards());
});
