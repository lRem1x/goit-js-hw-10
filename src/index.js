import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCountries } from './fetchCountries';
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

const DEBOUNCE_DELAY = 300;
const fetchCountriesLine = document.getElementById('search-box');

fetchCountriesLine.addEventListener("input", debounce(onInput, DEBOUNCE_DELAY));
    


function onInput(event) {
  let inputValue = event.target.value.trim();
  if (inputValue === '') { Notify.failure('Oops, there is no country with that name'); return };
  fetchCountries(inputValue).then(renderCountriesList);
  
}

function renderCountriesList(countries) {
  if (countries.length > 10) {
    countryList.innerHTML = '';
    countryInfo.innerHTML = '';
    Notify.info('Too many matches found. Please enter a more specific name.');
    return;
  } else
    
  if (countries.length <= 10&&countries.length>1) {
    const markupList = countries
      .map((country) => {
        return `
    <li class="country-list__item">
    <img class="country-list__flags" src="${country.flags.svg}" alt="${country.name}" width="45" />
    <h2 class="country-list__name">${country.name}</h2>
  </li>`;
      }).join("");
    countryList.innerHTML = markupList;
    countryInfo.innerHTML = '';
  } else

  if (countries.length === 1) {
    const markup = countries
      .map((country) => {
        let lengList=[];
        for (const lang of country.languages) {
          console.log(lang.name);
          lengList.push(lang.name);
        }
        console.log(Object.values(lengList));
      return `         
          <div class="country-info__wrapper">
      <img class="country-info__flags" src="${country.flags.svg}" alt="${country.name}" width="100" />
        <h2 class="country-info__name">${country.name}</h2>
      </div>
            <p class="text-stile"><b class="title-stile">CAPITAL</b>: ${country.capital}</p>
            <p class="text-stile"><b class="title-stile">POPULATION</b>: ${country.population}</p>
            <p class="text-stile"><b class="title-stile">LANGUAGES</b>: ${Object.values(lengList)}</p>      
        `;
     })
     .join("");
    countryInfo.innerHTML = markup;
    countryList.innerHTML = '';
  }
  // else {
  //   countryList.innerHTML = '';
  //   countryInfo.innerHTML = '';}
  
   
 

}

  