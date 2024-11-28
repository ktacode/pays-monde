"use strict";

const API = `https://restcountries.com/v3.1`;
const COUNTRY_CARD_MARKUP = `<div class="card">
        <div class="card__img"></div>
        <div class="card__details">
          <p class="text text--md text--bold">DR Congo</p>
          <p class="text text--sm text--secondary">
            <span class="material-icons">location_city</span>&nbsp;Kinshasa
          </p>
          <p class="text text--sm text--secondary">
            <span class="material-icons">south_america</span>&nbsp;Africa
          </p>
          <p class="text text--sm text--secondary">
            <span class="material-icons">diversity_3</span>&nbsp;100 M
          </p>
          <p class="text text--sm text--secondary">
            <span class="material-icons">attach_money</span>&nbsp;Congolese
            Franc
          </p>
        </div>
      </div>`;

const searchForm = document.querySelector(".search-form");
const section = document.querySelector(".section");
const spinner = document.querySelector(".spinner");

async function getAllCountries() {
  try {
    const result = await fetch(`${API}/all`);
    const data = await result.json();
    renderCountries(data);
  } catch (error) {
    console.log(error);
  }
}

function renderCountry(country) {
  const [currency] = Object.keys(country.currencies);
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
              country.capital[0] || "Indéfini"
            }
          </p>
          <p class="text text--sm text--secondary">
            <span class="material-icons">south_america</span>&nbsp;${
              country.region || "Indéfini"
            }
          </p>
          <p class="text text--sm text--secondary">
            <span class="material-icons">diversity_3</span>&nbsp;${
              country.population || "Indéfini"
            } M
          </p>
          <p class="text text--sm text--secondary">
            <span class="material-icons">attach_money</span>&nbsp;${
              country.currencies[currency]?.name || "Indéfini"
            }(${country.currencies[currency]?.symbol || "Indéfini"})
            
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
  try {
    spinner.style.opacity = 1;
    section.innerHTML = "";
    const result = await fetch(`${API}/name/${name}`);
    const data = await result.json();
    spinner.style.opacity = 0;
    renderCountries(data);
  } catch (error) {
    console.log(error);
  }
}

function initUI() {
  searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const { value } = searchForm.querySelector(".text-input");
    if (!value) return;
    fetchCountry(value);
    searchForm.querySelector(".text-input").value = "";
  });
}

function start() {
  initUI();

  getAllCountries();
}

start();
