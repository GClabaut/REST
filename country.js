import { REST } from "./fetch.js";

const page = document.querySelector('.page')
const country = JSON.parse(sessionStorage.getItem('country'));
document.title = country;

// Change color theme from light to dark
function setTheme() {
  const root = document.documentElement;
  const newTheme = root.className === 'light' ? 'dark' : 'light';
  root.className = newTheme;
}
setTheme();
document.querySelector('.theme-toggle').addEventListener('click', setTheme)

REST({... {url: 'https://restcountries.com/v3.1/name', query: country} })
.then((data) => {
  data.map((country) => {

    function setFavicons(favImg){
      const headTitle = document.querySelector('head');
      const setFavicon = document.createElement('link');
      setFavicon.setAttribute('rel','shortcut icon');
      setFavicon.setAttribute('href',favImg);
      headTitle.appendChild(setFavicon);
    }
    setFavicons(country.flags.svg);

    const top = document.createElement('div');
    top.setAttribute('class', 'top');
    const flag = document.createElement('div');
    flag.setAttribute('class', 'flag');
    flag.style.background = `url(${country.flags.svg})`;
    const altText = document.createElement('div');
    altText.setAttribute('class', 'alt');
    altText.textContent = country.flags.alt;

    const figure = document.createElement('figure');
    figure.setAttribute('class', 'figure');
    const caption = document.createElement('figcaption');
    caption.setAttribute('class', 'caption');
    caption.textContent = 'National anthem: ';
    const audio = document.createElement('audio');
    audio.controls = 'controls';
    audio.src = `./asset/anthem/${country.name.common}.mp3`;
    audio.textContent = 'Your browser does not support audio.';

    figure.append(caption, audio)

    top.append(flag, altText, figure);

    const general = document.createElement('div');
    general.setAttribute('class', 'general');

    const countryName = document.createElement('div');
    countryName.setAttribute('class', 'name');
    const common = document.createElement('p');
    common.innerText = `Common name: ${country.name.common}`;
    const official = document.createElement('p');
    official.innerText = `Official name: ${country.name.official}`;
    const population = document.createElement('div');
    population.setAttribute('class', 'population');
    population.innerText = `Population: ${country.population}`

    countryName.append(common, official, population);

    const location = document.createElement('div');
    location.setAttribute('class', 'div');
    const region = document.createElement('p');
    region.setAttribute('class', 'region');
    region.innerText = `Region: ${country.region}`;
    const subRegion = document.createElement('p');
    subRegion.setAttribute('class', 'subregion');
    subRegion.innerText = `Subregion: ${country.subregion}`;

    location.append(region, subRegion)

    const capital = document.createElement('div');
    capital.setAttribute('class', 'capital');
    capital.innerText = `Capital: ${country.capital[0]}`;

    const currency = document.createElement('div');
    currency.setAttribute('class', 'currency');
    const curr = Object.values(country.currencies);
    currency.innerText = `Currency: ${curr[0].name} (${curr[0].symbol})`;

    const map = document.createElement('div');
    map.setAttribute('class', 'map');
    const google = document.createElement('iframe');
    google.src = `https://www.google.com/maps?q=${country.name.common}&output=embed`
    google.width = "600"
    google.height = "450"
    google.style = "border:0";
    google.allowFullscreen = "";
    google.loading = "lazy";
    google.referrerPolicy = "no-referrer-when-downgrade"

    map.append(google)


    general.append(countryName, capital, location, currency);

    page.append(top, general, map);
  });
});