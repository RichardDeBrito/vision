import {stringLimited} from './utils.js';

const API_KEY = 'b950b2f8751b9d6c2cf1bf2e45f1dd11';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const selectGenre = document.getElementById('select-genre');

document.addEventListener('DOMContentLoaded', () => {
    loadGenres();
    loadMovies();
})

async function loadGenres() {
    try {
        const respose = await fetch(
            `${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=pt-BR`
        );
        const data = await respose.json();

        populateSelectGenre(data.genres);

    } catch (error) {
        console.error('Erro ao carregar gêneros:', error);
    }
}

const populateSelectGenre = (genres) => {
    selectGenre.innerHTML = '<option value="">Todos os gêneros</option>';
    genres.forEach(genre => {
        const option = document.createElement('option');
        option.value = genre.id;
        option.textContent = genre.name;
        selectGenre.appendChild(option);
    });
};

async function loadMovies() {
    try {
        const response = await fetch(`${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=pt-BR&page=2`);
        const data = await response.json();
        createCardMovie(data.results);
    
    } catch (error) {
        console.error('Erro ao carregar os filmes:', error);
    }
}

const createCardMovie = (moviesData) => {
    const containerCards = document.getElementById('container-cards');

    moviesData.forEach(movie => {
        //ano do filme
        const imageCard = document.createElement('div');
        imageCard.classList.add('image-card');
        imageCard.style.backgroundImage = `url(${IMG_BASE_URL}${movie.poster_path})`
        const yearBox = document.createElement('div');
        yearBox.classList.add('year');
        const textYearBox = document.createElement('p');
        textYearBox.textContent = movie.release_date.substring(0,4);
        yearBox.appendChild(textYearBox);
        imageCard.appendChild(yearBox);

        //titulo do filme
        const titleCard = document.createElement('div');
        titleCard.classList.add('title-card');
        const textTitleCard = document.createElement('p');
        textTitleCard.textContent = stringLimited(movie.title);
        titleCard.appendChild(textTitleCard);

        //box info
        const containerInfo = document.createElement('div');
        containerInfo.classList.add('container-info');
        const boxInfoType = document.createElement('span');
        const boxInfoGen = document.createElement('span');
        boxInfoType.classList.add('box-info');
        boxInfoType.textContent = 'Filme';
        boxInfoGen.classList.add('box-info');
        boxInfoGen.textContent = 'nada';
        containerInfo.appendChild(boxInfoType);
        containerInfo.appendChild(boxInfoGen);
    
        //card do filme
        const cardMovie = document.createElement('div');
        cardMovie.classList.add('card');
        cardMovie.appendChild(imageCard);
        cardMovie.appendChild(titleCard);
        cardMovie.appendChild(containerInfo);
    
        containerCards.appendChild(cardMovie)
    });
};