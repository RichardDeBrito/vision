import {loadGenres, loadCards} from './listing.js';
import { pagination } from './pagination.js';

document.addEventListener('DOMContentLoaded', () => {
    loadGenres();
    pagination(1);
});

const buttonSearch = document.getElementById('button-search');

buttonSearch.addEventListener('click', () => {
    pagination(2);
});

document.getElementById('input-search').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        buttonSearch.click();
    }
});