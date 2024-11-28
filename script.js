"use strict";

const API = `https://restcountries.com/v3.1`;

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
