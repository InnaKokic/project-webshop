# Webshop – In Sisters Garden

Live-demo: <https://insistersgarden.netlify.app>

In Sisters Garden är en enkel och stilren webshop utvecklad som ett grupparbete i kursen Grundläggande programmering. Projektet är byggt med HTML, CSS och JavaScript och simulerar en mindre e-handel med fokus på tydlig UI-design och grundläggande funktionalitet.

Detta projekt är utvecklat som ett frontend-case utan koppling till backend eller databas. Funktionalitet som produktdata, lager och kundvagn simuleras i klienten med vanilla JavaScript.

Webbshoppen låter användaren:

- Bläddra bland produkter

- Filtrera efter kategori

- Se detaljer för varje produkt via modal

- Lägga till och ta bort produkter i kundvagnen

- Se lagersaldo för varje produkt

- Se uppdaterad totalsumma och antal varor i kundvagnen

Projektet innehåller anpassad styling för mobil, tablet och desktop genom media queries.

## Installation & start lokalt

1. **Klona repositoryt**

   git clone <https://github.com/InnaKokic/project-webshop>

2. **Navigera till projektmappen**

   cd project-webshop

3. **Starta projektet**

   Öppna index.html direkt i webbläsaren, eller använd Live Server i t.ex. VS Code.

## Teknisk översikt

**Byggd med**

- HTML5 – struktur och semantik

- CSS – layout, grid, media queries och styling

- JavaScript – rendering, logik, modaler, kundvagn, filtrering

**Kodstruktur**

- index.html – huvudstruktur och komponenter

- styles.css – global styling, variabler och responsiv design

- main.js – produktklass, rendering, events, modalsystem och kundvagnslogik

- assets/ – bilder och ikoner

**Objektorienterad struktur**

Produkterna skapas som egna instanser av en Product-klass med metoden renderCards() som genererar HTML-kort.

## Teamet bakom

Projektet är skapat av:

**Inna Kokic**, **Josefine Asplund** & **Caroline Enggren**
