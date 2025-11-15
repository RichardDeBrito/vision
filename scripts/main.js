import {loadGenres, loadCards, loadCardsSearch} from './listing.js';
import { captInputValue } from './utils.js';

document.addEventListener('DOMContentLoaded', () => {
    loadGenres();
    loadCards(1);
});

const buttonSearch = document.getElementById('button-search');

buttonSearch.addEventListener('click', () => {
    const containerCards = document.getElementById('container-cards');
    containerCards.innerHTML = '';
    
    const inputValue = captInputValue();
    loadCardsSearch(inputValue);
    console.log(inputValue);
});

const buttonsPages = document.querySelectorAll('.num-page');

for (const buttonPage of buttonsPages) {
    buttonPage.addEventListener('click', () => {
        const pageSelect = buttonPage.innerHTML;

        const containerCards = document.getElementById('container-cards');
        containerCards.innerHTML = '';
        loadCards(pageSelect);

        const pageActive = document.getElementById('num-page-active');
        pageActive.removeAttribute('id');

        buttonPage.setAttribute('id', 'num-page-active');
    })
};
