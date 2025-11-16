import { showSpinner, hideSpinner } from './utils.js';

const API_KEY = 'b950b2f8751b9d6c2cf1bf2e45f1dd11';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_BASE_URL = 'https://image.tmdb.org/t/p/w500';

export async function createDetailsPageSerie(details) {
   
    const imageMedia = document.getElementById('image-media');
    const originalName = document.getElementById('original-name');
    const mediaType = document.getElementById('media-type');
    const quantSeasons = document.getElementById('seasons');
    const quantEpisodies = document.getElementById('episodes');
    const mediaTitle = document.getElementById('media-title');
    const releaseDate = document.getElementById('release-date');
    const synopsis = document.getElementById('synopsis');
    const ratingSpan = document.getElementById('rating');
    const genreList = document.getElementById('genre-list');

    if (!details) return;

    if (details.poster_path) {
        imageMedia.src = `${IMG_BASE_URL}${details.poster_path}`;
    } else if (details.backdrop_path) {
        imageMedia.src = `${IMG_BASE_URL}${details.backdrop_path}`;
    }

    mediaTitle.textContent = details.title || details.name || 'Título desconhecido';

    ratingSpan.textContent = (details.vote_average !== undefined) ? details.vote_average.toFixed(1) : '0.0';

    originalName.textContent = details.original_title || details.original_name || '-';

    releaseDate.textContent = (details.release_date || details.first_air_date) ? (details.release_date || details.first_air_date).substring(0,10) : '-';

    mediaType.textContent = (details.media_type === 'tv' || details.number_of_seasons !== undefined) ? 'Série' : 'Filme';

    if (details.number_of_seasons !== undefined) {
        quantSeasons.textContent = details.number_of_seasons;
        quantEpisodies.textContent = details.number_of_episodes || '-';
        document.getElementById('season-block').style.display = '';
        document.getElementById('episodes-block').style.display = '';
    } else {

        const seasonBlock = document.getElementById('season-block');
        const episodesBlock = document.getElementById('episodes-block');
        if (seasonBlock) seasonBlock.style.display = 'none';
        if (episodesBlock) episodesBlock.style.display = 'none';
    }

    synopsis.textContent = details.overview || '-';

    genreList.innerHTML = '';
    if (Array.isArray(details.genres)) {
        details.genres.slice(0,3).forEach(g => {
            const span = document.createElement('span');
            span.classList.add('box-info');
            span.textContent = g.name;
            genreList.appendChild(span);
        });
    }
}


function getQueryParams() {
    const params = {};
    const qs = window.location.search.replace(/^\?/, '');
    qs.split('&').forEach(pair => {
        if (!pair) return;
        const [k, v] = pair.split('=');
        params[decodeURIComponent(k)] = decodeURIComponent(v || '');
    });
    return params;
}

export async function initDetailsPage() {
    const params = getQueryParams();
    const id = params.id;
    const type = params.type || 'movie';

    if (!id) return;

    try {
        showSpinner();
        const response = await fetch(`${BASE_URL}/${type}/${id}?api_key=${API_KEY}&language=pt-BR`);
        const data = await response.json();
       
        data.media_type = type;
        createDetailsPageSerie(data);
    } catch (error) {
        console.error('Erro ao carregar detalhes:', error);
    } finally {
        hideSpinner();
    }
}

if (typeof window !== 'undefined') {
    if (document.getElementById('container-hero-details')) {
        window.addEventListener('DOMContentLoaded', () => {
            initDetailsPage();
        });
    }
}

