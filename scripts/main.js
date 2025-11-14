const API_KEY = 'b950b2f8751b9d6c2cf1bf2e45f1dd11';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_BASE_URL = 'https://image.tmdb.org/t/p/w500';

async function loadGenres() {
    try {
        const response = await fetch (`${BASE_URL}/genre/movie/list?api_key${API_KEY}&language=pt-BR`);
        const data = await response.json();

        populateGenreSelect(data.genres);
    } catch (error) {
        console.error('Erro ao carregar gêneros', error);
    }
}