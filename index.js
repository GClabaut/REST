import { REST } from "./fetch.js";

const countries = document.querySelector('.countries');

function fetchREST(link, val) {
  countries.innerHTML = '';
  REST({... {url: link, query: val} })
  .then((data) => {
    data.map((country) => {
      const card = document.createElement('div');
      card.setAttribute('class', 'card');
      const link = document.createElement('a');
      link.setAttribute('href', 'country.html')
      const detail = document.createElement('details');
      detail.setAttribute('class', 'detail');
      const flag = document.createElement('summary');
      flag.setAttribute('class', 'flag')
      flag.style.background = `url(${country.flags.svg})`
      const animation = document.createElement('div');
      animation.setAttribute('class', 'animate')
      const name = document.createElement('p');
      name.setAttribute('class', 'name');
      name.textContent = country.name.official;

      detail.append(flag);
      animation.append(name);
      card.append(detail, animation);
      link.append(card);
      countries.append(link);
    })
  })
  .then(() => {
    document.querySelectorAll('.card').forEach(card => {
      card.addEventListener('mouseenter', () => {
        card.firstChild.setAttribute('open', '');
      });
      card.addEventListener('mouseleave', () => {
        card.firstChild.removeAttribute('open');
      });
      card.addEventListener('click', () => {
        sessionStorage.setItem('country', JSON.stringify(card.lastChild.innerText));
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
  const res = document.querySelector("#result");
  res.innerHTML = '';
  let list = '';

  REST({... {url: 'https://restcountries.com/v3.1/name', query: `${search.value}`} })
  .then((data) => {
    console.log(data)
    if (data.length === 0) {
      res.style.display = "none"
    } else {
      res.style.display = "block"
    }
    for (let i = 0; i < data.length; i++) {
      list += '<li>' + data[i].name.common + '</li>';
    }
    res.innerHTML = '<ul>' + list + '</ul>';

    fetchREST('https://restcountries.com/v3.1/name', val)
  })
  .then(() => {
    const resList = document.querySelectorAll("li");
    resList.forEach(item => {
      item.addEventListener('click', () => {
        search.value = item.textContent;
        showResults(val);
      });
    });
  })
};


const search = document.querySelector('#search-box')

search.addEventListener('keyup', (e) => {
  e.preventDefault
  showResults(search.value);
});

const region = document.querySelector('#region')
region.addEventListener('change', () => {
  if (region.value !== 'all') {
    fetchREST('https://restcountries.com/v3.1/region', region.value);
  } else if (region.value === 'all') {
    fetchREST('https://restcountries.com/v3.1/all');
  };
});