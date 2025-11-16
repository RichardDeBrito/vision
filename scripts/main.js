import { loadGenres, populateSelectGenre } from './listing.js';
import { pagination } from './pagination.js';
import { initCarousel } from './carousel.js';

document.addEventListener('DOMContentLoaded', async () => {
    const initialGenres = await loadGenres('movie');
    populateSelectGenre(initialGenres);

    pagination({ mode: 'discover', mediaType: 'all' });
    initCarousel();

    const selectGenre = document.getElementById('select-genre');
    const selectType = document.getElementById('select-type');

    selectGenre.addEventListener('change', handleFilterChange);

    selectType.addEventListener('change', async () => {
        const typeValue = selectType.value;
        const media = typeValue === 'tv' ? 'tv' : 'movie';
        const genres = await loadGenres(media);
        populateSelectGenre(genres);
        handleFilterChange();
    });

    const buttonSearch = document.getElementById('button-search');
    buttonSearch.addEventListener('click', () => {
        const containerCards = document.getElementById('container-cards');
        containerCards.innerHTML = '';
        const query = document.getElementById('input-search').value.trim();
        pagination({ mode: 'search', query });
    });

    document.getElementById('input-search').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const containerCards = document.getElementById('container-cards');
            containerCards.innerHTML = '';
            buttonSearch.click();
        }
    });
    
    const inicioLink = document.querySelector('a[href="#container-hero"]');
    if (inicioLink) {
        inicioLink.addEventListener('click', function(e) {
            e.preventDefault(); 
            goToHome();
        });
    }
    
    const catalogoLink = document.querySelector('a[href="#catalog-sec"]');
    if (catalogoLink) {
        catalogoLink.addEventListener('click', function(e) {
            e.preventDefault();
            goToHome();
            document.getElementById('catalog-sec').scrollIntoView({ behavior: 'smooth' });
        });
    }
});

function handleFilterChange() {
    const genreValue = document.getElementById('select-genre').value;
    const typeValue = document.getElementById('select-type').value;
    applyFilters(genreValue, typeValue);
}

async function applyFilters(genreId, type) {
    const containerCards = document.getElementById('container-cards');
    containerCards.innerHTML = '';
 
    const mediaType = type || 'all';
    const options = { mode: 'discover', mediaType, genreId: genreId || null };
    await pagination(options);
}

function goToHome() {
    
    const inputSearch = document.getElementById('input-search');
    inputSearch.value = '';
    
    const selectGenre = document.getElementById('select-genre');
    selectGenre.value = '';
    
    const pages = document.querySelectorAll('.num-page');
    pages.forEach(page => page.removeAttribute('id'));
    if (pages[0]) {
        pages[0].setAttribute('id', 'num-page-active');
    }
    
    const containerCards = document.getElementById('container-cards');
    containerCards.innerHTML = ''; 


    pagination({ mode: 'discover', mediaType: 'all' });
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
