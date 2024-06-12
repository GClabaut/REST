import { REST } from "./import/fetch.js";

const countries = document.querySelector('.countries');

const isMobile = !window.matchMedia('only screen and (min-width: 1024px)').matches

function fetchREST(link, val) {
  REST({... {url: link, query: val} })
  .then((data) => {
    countries.innerHTML = '';
    data.map((country) => {
      const card = document.createElement('div');
      card.setAttribute('class', 'card');
      const link = document.createElement('a');
      link.setAttribute('href', 'country.html');
      link.setAttribute('class', 'link-desktop');
      const detail = document.createElement('details');
      detail.setAttribute('class', 'detail');
      const flag = document.createElement('summary');
      flag.setAttribute('class', 'flag');
      flag.style.background = `url(${country.flags.svg})`
      const animation = document.createElement('div');
      animation.setAttribute('class', 'animate');
      const linkTablet = document.createElement('a');
      linkTablet.setAttribute('href', 'country.html');
      linkTablet.setAttribute('class', 'link-tablet');
      const name = document.createElement('h1');
      name.setAttribute('class', 'name');
      name.textContent = country.name.official;

      detail.append(flag);
      linkTablet.append(name);
      animation.append(linkTablet);
      card.append(detail, animation);
      link.append(card);
      countries.append(link);
    })
  })
  .then(() => {
    document.querySelectorAll('.card').forEach(card => {
      if (isMobile !== true) {
        card.addEventListener('mouseenter', () => {
          card.firstChild.setAttribute('open', '');
        });
        card.addEventListener('mouseleave', () => {
          card.firstChild.removeAttribute('open');
        });
      }
      card.addEventListener('click', () => {
        sessionStorage.setItem('country', JSON.stringify(card.lastChild.outerText));
      });
    });
  });
};
fetchREST('https://restcountries.com/v3.1/all');

// Change color theme from light to dark
function setTheme() {
  const root = document.documentElement;
  const newTheme = root.className === 'light' ? 'dark' : 'light';
  root.className = newTheme;
}
setTheme();
document.querySelector('.theme-toggle').addEventListener('click', setTheme)


// searchbox results
function showResults(val) {
  const result = document.querySelector(".result");
  result.textContent = '';
  const res = document.createElement('ul');

  REST({... {url: 'https://restcountries.com/v3.1/name', query: `${search.value}`} })
  .then((data) => {
    for (let i = 0; i < data.length; i++) {
      const newItem = document.createElement('li');
      newItem.textContent = data[i].name.common;
      res.append(newItem);
    }
    result.append(res);

    fetchREST('https://restcountries.com/v3.1/name', val)
  })
  .then(() => {
    const resList = document.querySelectorAll('li');
    resList.forEach(item => {
      item.addEventListener('click', () => {
        search.value = item.textContent;
        showResults(search.value);
      });
    });
  });
};


const search = document.querySelector('.search-box')

search.addEventListener('keydown', (e) => {
  showResults(search.value);
  if (search.value === '') {
    fetchREST('https://restcountries.com/v3.1/all')
  }
});

const region = document.querySelector('.region')
region.addEventListener('change', () => {
  if (region.value !== 'all') {
    fetchREST('https://restcountries.com/v3.1/region', region.value);
  } else if (region.value === 'all') {
    fetchREST('https://restcountries.com/v3.1/all');
  };
});

document.querySelector('form').addEventListener('submit', (e) => {
  e.preventDefault()
});