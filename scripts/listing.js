import {stringLimited} from './utils.js';

const API_KEY = 'b950b2f8751b9d6c2cf1bf2e45f1dd11';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const selectGenre = document.getElementById('select-genre');

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
            const textYearBox = document.createElement('p');

            if (card.first_air_date) {
                textYearBox.textContent = card.first_air_date.substring(0,4);
            } else {
                textYearBox.textContent = card.release_date.substring(0,4);
            }
            
            yearBox.appendChild(textYearBox);
            imageCard.appendChild(yearBox);
            
            //titulo do filme
            const titleCard = document.createElement('div');
            titleCard.classList.add('title-card');
            const textTitleCard = document.createElement('p');
            
            if (card.media_type === "tv") {
                textTitleCard.textContent = stringLimited(card.name);
                
            } else {
                textTitleCard.textContent = stringLimited(card.title);

            };
            
            titleCard.appendChild(textTitleCard);
    
            //box info
            const containerInfo = document.createElement('div');
            containerInfo.classList.add('container-info');
            const boxInfoType = document.createElement('span');
            const boxInfoGen = document.createElement('span');
            boxInfoType.classList.add('box-info');
            
            if(card.media_type === "tv") {
               boxInfoType.textContent = 'Serie'; 
            } else {
                boxInfoType.textContent = 'Filme';
            }

            boxInfoGen.classList.add('box-info');

            let primaryId = card.genre_ids[0];

            if (primaryId === 878) {
                primaryId = card.genre_ids[1];
            }

            const genreName = await primaryGenre(primaryId);
            
            boxInfoGen.textContent = `${genreName}`;
            containerInfo.appendChild(boxInfoType);
            containerInfo.appendChild(boxInfoGen);
        
            //card do filme
            const cardBox = document.createElement('div');
            cardBox.classList.add('card');
            cardBox.appendChild(imageCard);
            cardBox.appendChild(titleCard);
            cardBox.appendChild(containerInfo);
        
            containerCards.appendChild(cardBox);
        } catch (error) {
            console.error('Erro ao carregar cards:', error);
        }
    }
};

export async function primaryGenre(id) {
    try {
        const listGenres = await loadGenres();
        
        const genre = listGenres.find(genre => genre.id === id);

        return genre ? genre.name: 'Desconhecido';
    } catch (error) {
        console.error('Erro ao capturar genero:', error);
    }
}

export async function loadCards(numPage) {
    try {

        const response = await fetch(`${BASE_URL}/search/multi?api_key=${API_KEY}&language=pt-BR&query=a&page=${numPage}`);
        const data = await response.json();
        createCard(data.results);
        

        const nextPages = document.getElementById('next');

        nextPages.addEventListener('click', () => {
            const containerCards = document.getElementById('container-cards');
            containerCards.innerHTML = '';
            
            const atualPages = document.querySelectorAll('.num-page');

            let initialPage = `${atualPages[4].innerHTML}`;

            loadCards(initialPage);

            let countPagesString = initialPage;

            console.log(countPagesString);

            atualPages.forEach((page) => {

                page.innerHTML = `${countPagesString}`;
                let countPagesInt = Number(countPagesString);

                countPagesInt += 1;
                
                countPagesString = countPagesInt.toString();
                console.log(countPagesString);
            })
        });
    } catch (error) {
        console.error('Erro ao carregar os filmes:', error);
    }
}

export async function loadCardsSearch(name) {
    try {
        const response = await fetch(`${BASE_URL}/search/multi?api_key=${API_KEY}&language=pt-BR&query=${name}`);
        const data = await response.json();
        createCard(data.results);

    } catch (error) {
        console.error('Erro ao buscar filme:', error);
    }
}

export async function loadGenres() {
    try {
        const respose = await fetch(
            `${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=pt-BR`
        );
        const data = await respose.json();

        populateSelectGenre(data.genres);

        return data.genres

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

