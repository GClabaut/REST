import { REST } from "./import/fetch.js";

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
  page.innerHTML = '';
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

    const nation = document.createElement('div');
    nation.setAttribute('class', 'nation')
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

    const commonName = document.createElement('div');
    const underlineCommon = document.createElement('span');
    underlineCommon.setAttribute('class', 'underline');
    underlineCommon.textContent = 'Common name:'
    const common = document.createElement('p');
    common.setAttribute('class', 'common');
    common.textContent = ` ${country.name.common}`;
    commonName.append(underlineCommon, common);

    const officialName = document.createElement('div');
    const underlineOfficial = document.createElement('span');
    underlineOfficial.setAttribute('class', 'underline');
    underlineOfficial.textContent = 'Official name:'
    const official = document.createElement('p');
    official.setAttribute('class', 'official');
    official.textContent = ` ${country.name.official}`;
    officialName.append(underlineOfficial, official);

    const capital = document.createElement('div');
    const underlineCapital = document.createElement('span');
    underlineCapital.setAttribute('class', 'underline');
    underlineCapital.textContent = 'Capital:'
    const cap = document.createElement('p');
    cap.setAttribute('class', 'capital');
    cap.textContent = ` ${country.capital[0]}`;
    capital.append(underlineCapital, cap);

    const populationTotal = document.createElement('div');
    const underlinePopulation = document.createElement('span');
    underlinePopulation.setAttribute('class', 'underline');
    underlinePopulation.textContent = 'Population:'
    const population = document.createElement('p');
    population.setAttribute('class', 'population');
    population.textContent = ` ${country.population}`;
    populationTotal.append(underlinePopulation, population);
    
    const region = document.createElement('div');
    const underlineRegion = document.createElement('span');
    underlineRegion.setAttribute('class', 'underline');
    underlineRegion.textContent = 'Region:'
    const reg = document.createElement('p');
    reg.setAttribute('class', 'region');
    reg.textContent = ` ${country.region}`;
    region.append(underlineRegion, reg);

    const subregion = document.createElement('div');
    const underlineSubregion = document.createElement('span');
    underlineSubregion.setAttribute('class', 'underline');
    underlineSubregion.textContent = 'Subregion:'
    const subreg = document.createElement('p');
    subreg.setAttribute('class', 'subregion');
    subreg.textContent = ` ${country.region}`;
    subregion.append(underlineSubregion, subreg);

    const currency = document.createElement('div');
    const underlineCurrency = document.createElement('span');
    underlineCurrency.setAttribute('class', 'underline');
    underlineCurrency.textContent = 'Currency:'
    const currTable = Object.values(country.currencies);
    const curr = document.createElement('p');
    curr.setAttribute('class', 'currency');
    curr.textContent = ` ${currTable[0].name} (${currTable[0].symbol})`;
    currency.append(underlineCurrency, curr);

    general.append(commonName, officialName, capital, populationTotal, region, subregion, currency)

    top.append(nation, general);

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

    page.append(top, map);
  });
});