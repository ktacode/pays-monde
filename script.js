"use strict";

const API = `https://restcountries.com/v3.1`;

const searchForm = document.querySelector(".search-form");
const section = document.querySelector(".section");
const spinner = document.querySelector(".spinner");
const navItems = document.querySelectorAll(".nav__item");

function formatNumber(num) {
  if (num >= 1_000_000_000) {
    return (num / 1_000_000_000).toFixed(1).replace(/\.0$/, "") + " Md"; // Billions
  } else if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(1).replace(/\.0$/, "") + " M"; // Millions
  } else if (num >= 1_000) {
    return (num / 1_000).toFixed(1).replace(/\.0$/, "") + " K"; // Thousands
  } else {
    return num.toString(); // Numbers less than 1000
  }
}

async function getAllCountries() {
  section.innerHTML = "";
  try {
    spinner.style.opacity = 1;
    const result = await fetch(`${API}/all`);
    const data = await result.json();
    spinner.style.opacity = 0;
    renderCountries(data);
  } catch (error) {
    console.log(error);
  }
}

async function getCountriesPerRegion(region) {
  section.innerHTML = "";
  try {
    spinner.style.opacity = 1;
    const result = await fetch(`${API}/region/${region}`);
    const data = await result.json();
    spinner.style.opacity = 0;
    renderCountries(data);
  } catch (error) {
    console.log(error);
  }
}

function renderCountry(country) {
  const [currency] = country.currencies
    ? Object.keys(country.currencies)
    : "Indéfini";
  const population = formatNumber(country.population);
  const markup = `<div class="card">

        <img src="${country.flags.png}" alt="${
    country.flags.alt
  }" class="img img__country-flag card__img"/>

        <div class="card__details">
          <p class="text text--md text--bold">${
            country.name?.common || "Indéfini"
          }</p>
          <p class="text text--sm text--secondary">
            <span class="material-icons">location_city</span>&nbsp;${
              country.capital ? country.capital[0] : "Indéfini"
            }
          </p>
          <p class="text text--sm text--secondary">
            <span class="material-icons">south_america</span>&nbsp;${
              country.region || "Indéfini"
            }
          </p>
          <p class="text text--sm text--secondary">
            <span class="material-icons">diversity_3</span>&nbsp;${
              population || "Indéfini"
            } 
          </p>
          <p class="text text--sm text--secondary">
            <span class="material-icons">attach_money</span>&nbsp;${
              country.currencies
                ? country.currencies[currency]?.name
                : "Indéfini"
            }(${
    country.currencies ? country.currencies[currency]?.symbol : "Indéfini"
  })
            
          </p>
        </div>
      </div>`;

  return markup;
}

function renderCountries(list) {
  list.map((c) => {
    section.insertAdjacentHTML("beforeend", renderCountry(c));
  });
}

async function fetchCountry(name = "drc") {
  section.innerHTML = "";
  try {
    spinner.style.opacity = 1;
    const result = await fetch(`${API}/name/${name}`);
    const data = await result.json();
    spinner.style.opacity = 0;
    renderCountries(data);
  } catch (error) {
    console.log(error);
  }
}

function updateNavItems(hash) {
  navItems.forEach((i) => i.classList.remove("nav__item--selected"));

  navItems.forEach((i) => {
    if (i.hash === hash) {
      i.classList.add("nav__item--selected");
    }
  });
}

function initUI() {
  // Listens to submit event
  searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const { value } = searchForm.querySelector(".text-input");
    if (!value) return;
    fetchCountry(value);
    searchForm.querySelector(".text-input").value = "";
  });

  window.addEventListener(
    "hashchange",
    (e) => {
      const { hash } = e.currentTarget.location;
      const region = hash.substring(1);
      updateNavItems(hash);
      if (region === "all") {
        getAllCountries();
        return;
      }
      getCountriesPerRegion(region);
    },
    false
  );
}

function start() {
  initUI();

  getAllCountries();
}

start();
