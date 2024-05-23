import { fetchSearch } from "./fetch.js";

function setTheme() {
  const root = document.documentElement;
  const newTheme = root.className === 'dark' ? 'light' : 'dark';
  root.className = newTheme;
  
  document.querySelector('.theme-name').textContent = newTheme;
}

document.querySelector('.theme-toggle').addEventListener('click', setTheme)

function showResults(val) {
  const res = document.querySelector("#result");
  res.innerHTML = '';
  let list = '';

  fetchSearch({... {url: 'https://restcountries.com/v3.1/name', query: `${search.value}`} })

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

const search = document.querySelector("#search-box")

search.addEventListener("keyup", () => {
  showResults(search.value);
});