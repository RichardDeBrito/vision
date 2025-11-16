const API_KEY = 'b950b2f8751b9d6c2cf1bf2e45f1dd11';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_BASE_URL = 'https://image.tmdb.org/t/p/w1280';

let currentSlide = 0;
let carouselItems = [];
let autoPlayInterval;

export async function initCarousel() {
    try {
        
        const response = await fetch(`${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=pt-BR&page=1`);
        const data = await response.json();
        
        carouselItems = data.results.slice(0, 5).filter(movie => movie.backdrop_path);
        
        createHeroCarousel(carouselItems);
        setupHeroCarouselNavigation();
        startAutoPlay();

    } catch (error) {
        console.error('Erro ao carregar carrossel hero:', error);
    }
}

function createHeroCarousel(movies) {
    const carouselTrack = document.getElementById('hero-carousel-track');
    const indicators = document.getElementById('hero-indicators');
    
    carouselTrack.innerHTML = '';
    indicators.innerHTML = '';
    
    movies.forEach((movie, index) => {
        const carouselItem = document.createElement('div');
        carouselItem.className = 'hero-carousel-item';
        carouselItem.innerHTML = `
            <img src="${IMG_BASE_URL}${movie.backdrop_path}" alt="${movie.title}">
        `;
        carouselTrack.appendChild(carouselItem);
        
        const indicator = document.createElement('div');
        indicator.className = `carousel-indicator ${index === 0 ? 'active' : ''}`;
        indicator.addEventListener('click', () => {
            goToSlide(index);
        });
        indicators.appendChild(indicator);
    });
}

function setupHeroCarouselNavigation() {
    const prevButton = document.getElementById('hero-carousel-prev');
    const nextButton = document.getElementById('hero-carousel-next');
    
    prevButton.addEventListener('click', () => {
        stopAutoPlay();
        goToSlide(currentSlide - 1);
        startAutoPlay();
    });
    
    nextButton.addEventListener('click', () => {
        stopAutoPlay();
        goToSlide(currentSlide + 1);
        startAutoPlay();
    });
    
    setupSwipeNavigation();
}

function setupSwipeNavigation() {
    const carousel = document.getElementById('hero-carousel');
    let startX = 0;
    
    carousel.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        stopAutoPlay();
    });
    
    carousel.addEventListener('touchend', (e) => {
        const endX = e.changedTouches[0].clientX;
        const diff = startX - endX;
        
        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                goToSlide(currentSlide + 1);
            } else {
                goToSlide(currentSlide - 1);
            }
        }
        startAutoPlay();
    });
}

function goToSlide(slideIndex) {
    
    if (carouselItems.length === 0) {
        console.error('Nenhum item no carrossel');
        return;
    }
    
    if (slideIndex < 0) {
        slideIndex = carouselItems.length - 1;
    } else if (slideIndex >= carouselItems.length) {
        slideIndex = 0;
    }
    
    currentSlide = slideIndex;
    
    const carouselTrack = document.getElementById('hero-carousel-track');
    const indicators = document.querySelectorAll('.carousel-indicator');
    
    carouselTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
    
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentSlide);
    });
}

function startAutoPlay() {
    stopAutoPlay();
    autoPlayInterval = setInterval(() => {
        if (carouselItems.length > 0) {
            goToSlide(currentSlide + 1);
        }
    }, 5000);
}

function stopAutoPlay() {
    if (autoPlayInterval) {
        clearInterval(autoPlayInterval);
        autoPlayInterval = null;
    }
}

document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        stopAutoPlay();
    } else {
        startAutoPlay();
    }
});