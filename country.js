import { REST } from "./import/fetch.js";

const page = document.querySelector('.page')
const country = JSON.parse(sessionStorage.getItem('country'));
document.title = country;
const animation = document.querySelector('.animation')

// Change color theme from light to dark
function setTheme() {
  const root = document.documentElement;
  const newTheme = root.className === 'light' ? 'dark' : 'light';
  root.className = newTheme;
}
setTheme();
document.querySelector('.theme-toggle').addEventListener('click', setTheme)

function setFavicons(favImg) {
  const headTitle = document.querySelector('head');
  const setFavicon = document.createElement('link');
  setFavicon.setAttribute('rel','shortcut icon');
  setFavicon.setAttribute('href',favImg);
  headTitle.appendChild(setFavicon);
}

REST({... {url: 'https://restcountries.com/v3.1/name', query: country} })
.then((data) => {
  animation.style.display = 'none';
  page.style.display = 'grid';
  data.map((country) => {
    setFavicons(country.flags.svg);

    const top = document.querySelector('.top');
    const nation = document.querySelector('.nation');

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
    caption.textContent = 'National anthem';
    const audio = document.createElement('audio');
    audio.controls = 'controls';
    audio.src = `./asset/anthem/${country.name.common}.mp3`;
    audio.textContent = 'Your browser does not support audio.';

    figure.append(caption, audio)

    nation.append(flag, altText, figure);

    const general = document.createElement('div');
    general.setAttribute('class', 'general');

    const commonDiv = document.querySelector('.common');
    const common = document.createElement('p');
    common.textContent = ` ${country.name.common}`;
    commonDiv.append(common);

    const officialDiv = document.querySelector('.official');
    const official = document.createElement('p');
    official.textContent = ` ${country.name.official}`;
    officialDiv.append(official);

    const capitalDiv = document.querySelector('.capital');
    const capital = document.createElement('p');
    capital.textContent = ` ${country.capital[0]}`;
    capitalDiv.append(capital);

    const populationDiv = document.querySelector('.population');
    const population = document.createElement('p');
    population.textContent = ` ${country.population}`;
    populationDiv.append(population);

    const regionDiv = document.querySelector('.region');
    const region = document.createElement('p');
    region.textContent = ` ${country.region}`;
    regionDiv.append(region);

    const subregionDiv = document.querySelector('.subregion');
    const subregion = document.createElement('p');
    subregion.textContent = ` ${country.region}`;
    subregionDiv.append(subregion);

    const currencyDiv = document.querySelector('.currency');
    const curr = Object.values(country.currencies);
    const currency = document.createElement('p');
    currency.textContent = ` ${curr[0].name} (${curr[0].symbol})`;
    currencyDiv.append(currency);

    const map = document.querySelector('.map');
    const google = document.createElement('iframe');
    google.title = `${country.name.common} map`
    google.src = `https://www.google.com/maps?q=${country.name.common}&output=embed`
    google.width = "600"
    google.height = "450"
    google.style = "border:0";
    google.allowFullscreen = "";
    google.loading = "lazy";
    google.referrerPolicy = "no-referrer-when-downgrade"

    map.append(google)
  });
});