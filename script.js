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

async function getAllCountries() {
  try {
    const result = await fetch(`${API}/all`);
    const data = await result.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

function renderCountries(list) {}

async function fetchCountry(name = "drc") {
  try {
    const result = await fetch(`${API}/name/${name}`);
    const data = await result.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

function initUI() {
  searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const { value } = searchForm.querySelector(".text-input");
    fetchCountry(value);
  });
}

function start() {
  initUI();
}

start();
