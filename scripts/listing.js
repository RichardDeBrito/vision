import {stringLimited} from './utils.js';

const API_KEY = 'b950b2f8751b9d6c2cf1bf2e45f1dd11';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const selectGenre = document.getElementById('select-genre');

export async function loadMovieDetails(movieId, mediaType = 'movie') {
    try {
        const response = await fetch(`${BASE_URL}/${mediaType}/${movieId}?api_key=${API_KEY}&language=pt-BR`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erro ao carregar detalhes:', error);
    }
}

async function createCard (cardData) {
    
    const containerCards = document.getElementById('container-cards');

    for (const card of cardData) {
        try {

            if (!card.poster_path) continue;

            const imageCard = document.createElement('div');
            imageCard.classList.add('image-card');
            imageCard.style.backgroundImage = `url(${IMG_BASE_URL}${card.poster_path})`;
            
            const yearBox = document.createElement('div');
            yearBox.classList.add('year');
            let textYearBox = document.createElement('p');

            if (card.first_air_date) {
                textYearBox.textContent = card.first_air_date.substring(0,4);
            } else if(card.release_date) {
                textYearBox.textContent = card.release_date.substring(0,4);
            } else {
                textYearBox.innerHTML = 'N/A';
            }
            
            yearBox.appendChild(textYearBox);
            imageCard.appendChild(yearBox);
            
            const titleCard = document.createElement('div');
            titleCard.classList.add('title-card');
            const textTitleCard = document.createElement('p');
            
            const rawTitle = card.name || card.title || card.original_name || card.original_title || (card.id ? `#${card.id}` : 'Sem título');
            textTitleCard.textContent = stringLimited(rawTitle);
            
            titleCard.appendChild(textTitleCard);
    
            const containerInfo = document.createElement('div');
            containerInfo.classList.add('container-info');
            const boxInfoType = document.createElement('span');
            const boxInfoGen = document.createElement('span');
            boxInfoType.classList.add('box-info');
            
            const inferredMediaType = card.media_type || (card.first_air_date || card.name ? 'tv' : 'movie');
            if (inferredMediaType === 'tv') {
                boxInfoType.textContent = 'Serie';
            } else {
                boxInfoType.textContent = 'Filme';
            }

            boxInfoGen.classList.add('box-info');

            let primaryId = null;
            if (Array.isArray(card.genre_ids) && card.genre_ids.length > 0) {
                primaryId = card.genre_ids[0];
                if (primaryId === 878 && card.genre_ids.length > 1) {
                    primaryId = card.genre_ids[1];
                }
            }

            const genreName = primaryId ? await primaryGenre(primaryId) : 'Desconhecido';
            boxInfoGen.textContent = `${genreName}`;
            containerInfo.appendChild(boxInfoType);
            containerInfo.appendChild(boxInfoGen);
        
            const cardBox = document.createElement('div');
            cardBox.classList.add('card');
            cardBox.appendChild(imageCard);
            cardBox.appendChild(titleCard);
            cardBox.appendChild(containerInfo);
        
            cardBox.addEventListener('click', () => {
                const mediaType = inferredMediaType || (card.first_air_date ? 'tv' : 'movie');

                window.location.href = `detail.html?id=${card.id}&type=${mediaType}`;
            });
            
            containerCards.appendChild(cardBox);
        } catch (error) {
            console.error('Erro ao carregar cards:', error);
        }
    }
};

export async function primaryGenre(id) {
    try {
        const movieGenres = await loadGenres('movie');
        const tvGenres = await loadGenres('tv');

        const combined = [...(movieGenres || []), ...(tvGenres || [])];

        const genre = combined.find(g => g.id === id);

        return genre ? genre.name : 'Desconhecido';
    } catch (error) {
        console.error('Erro ao capturar genero:', error);
    }
}

export async function loadCards(numPage) {
    try {

        const response = await fetch(`${BASE_URL}/search/multi?api_key=${API_KEY}&language=pt-BR&query=a&page=${numPage}`);
        const data = await response.json();
    createCard(data.results);
    return data;
        
    } catch (error) {
        console.error('Erro ao carregar os filmes:', error);
    }
}

export async function loadCardsSearch(name, page = 1) {
    try {
        const response = await fetch(`${BASE_URL}/search/multi?api_key=${API_KEY}&language=pt-BR&query=${name}&page=${page}`);
        const data = await response.json();
        
        const containerCards = document.getElementById('container-cards');
        containerCards.innerHTML = '';
        
        createCard(data.results);

        return data;

    } catch (error) {
        console.error('Erro ao buscar filme:', error);
    }
}

export async function loadCardsByGenre(genreId, page = 1) {
    try {
        const response = await fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&language=pt-BR&with_genres=${genreId}&page=${page}`);
        const data = await response.json();
        
        const containerCards = document.getElementById('container-cards');
        containerCards.innerHTML = '';
        
        createCard(data.results);
        return data;

    } catch (error) {
        console.error('Erro ao carregar filmes por gênero:', error);
    }
}

export async function loadMovies(page = 1) {
    try {
        const response = await fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&language=pt-BR&page=${page}`);
        const data = await response.json();

        const containerCards = document.getElementById('container-cards');
        containerCards.innerHTML = '';

        createCard(data.results);
        return data;
    } catch (error) {
        console.error('Erro ao carregar filmes:', error);
    }
}

export async function loadTV(page = 1) {
    try {
        const response = await fetch(`${BASE_URL}/discover/tv?api_key=${API_KEY}&language=pt-BR&page=${page}`);
        const data = await response.json();

        const containerCards = document.getElementById('container-cards');
        containerCards.innerHTML = '';

        createCard(data.results);
        return data;
    } catch (error) {
        console.error('Erro ao carregar séries:', error);
    }
}

export async function loadTVByGenre(genreId, page = 1) {
    try {
        const response = await fetch(`${BASE_URL}/discover/tv?api_key=${API_KEY}&language=pt-BR&with_genres=${genreId}&page=${page}`);
        const data = await response.json();

        const containerCards = document.getElementById('container-cards');
        containerCards.innerHTML = '';

        createCard(data.results);
        return data;
    } catch (error) {
        console.error('Erro ao carregar séries por gênero:', error);
    }
}

export async function loadGenres(mediaType = 'movie') {
    try {
        const response = await fetch(
            `${BASE_URL}/genre/${mediaType}/list?api_key=${API_KEY}&language=pt-BR`
        );
        const data = await response.json();

        return data.genres;

    } catch (error) {
        console.error('Erro ao carregar gêneros:', error);
    }
}

export const populateSelectGenre = (genres) => {
    selectGenre.innerHTML = '<option value="">Todos os gêneros</option>';
    genres.forEach(genre => {
        const option = document.createElement('option');
        option.value = genre.id;
        option.textContent = genre.name;
        selectGenre.appendChild(option);
    });
};