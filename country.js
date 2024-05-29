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
    const top = document.createElement('div');
    top.setAttribute('class', 'top');
    const flag = document.createElement('div');
    flag.setAttribute('class', 'flag');
    flag.style.background = `url(${country.flags.svg})`;
    const altText = document.createElement('div');
    altText.setAttribute('class', 'alt');
    altText.textContent = country.flags.alt;

    top.append(flag, altText);

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
    currency.innerText = `Currency: ${curr[0].name} ${curr[0].symbol}`;

    general.append(countryName, capital, location, currency);

    page.append(top, general);
  });
});