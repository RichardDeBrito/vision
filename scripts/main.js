import {loadGenres, loadCards, loadCardsSearch} from './listing.js';
import { captInputValue } from './utils.js';

document.addEventListener('DOMContentLoaded', () => {
    loadGenres();
    loadCards();
});

const buttonSearch = document.getElementById('button-search');

buttonSearch.addEventListener('click', () => {
    const containerCards = document.getElementById('container-cards');
    containerCards.innerHTML = '';
    
    const inputValue = captInputValue();
    loadCardsSearch(inputValue);
    console.log(inputValue);
});



