import { loadCards, loadCardsSearch, loadCardsByGenre } from "./listing.js";
import { captInputValue } from "./utils.js";

export async function pagination(typeLoadCardsNum = 1) {
    const inputValue = captInputValue();
    const containerCards = document.getElementById('container-cards');
    const passPages = document.getElementById('pass-pages');

    const MAX_PAGES = 500;

    let data;
    if (typeLoadCardsNum === 2 && inputValue.trim() !== '') {
        data = await loadCardsSearch(inputValue, 1);
    } else {
        data = await loadCards(1);
    }

    if (!data) return;

    let totalPages = Math.min(data.total_pages || 1, MAX_PAGES);

    passPages.innerHTML = '';

    const returnBtn = document.createElement('div');
    returnBtn.id = 'return';
    returnBtn.textContent = '‹';
    returnBtn.style.cursor = 'pointer';
    passPages.appendChild(returnBtn);

    const pagesContainer = document.createElement('div');
    pagesContainer.id = 'pages-list';
    pagesContainer.style.display = 'flex';
    pagesContainer.style.gap = '8px';
    passPages.appendChild(pagesContainer);

    const nextBtn = document.createElement('div');
    nextBtn.id = 'next';
    nextBtn.textContent = '›';
    nextBtn.style.cursor = 'pointer';
    passPages.appendChild(nextBtn);

    let startPage = 1;
    function renderPageBlock() {
        pagesContainer.innerHTML = '';
        const endPage = Math.min(startPage + 4, totalPages);
        for (let p = startPage; p <= endPage; p++) {
            const pageBtn = document.createElement('div');
            pageBtn.classList.add('num-page');
            pageBtn.textContent = `${p}`;
            pageBtn.style.cursor = 'pointer';
            if (p === 1) pageBtn.id = 'num-page-active';
            pagesContainer.appendChild(pageBtn);
        }
        
        if (startPage <= 1) {
            returnBtn.style.display = 'none';
        } else {
            returnBtn.style.display = 'flex';
        }

        if (startPage + 5 > totalPages) {
            nextBtn.style.display = 'none';
        } else {
            nextBtn.style.display = 'flex';
        }
    }

    renderPageBlock();

    async function loadPage(pageNumber) {
        containerCards.innerHTML = '';
        if (typeLoadCardsNum === 2 && inputValue.trim() !== '') {
            await loadCardsSearch(inputValue, pageNumber);
        } else {
            await loadCards(pageNumber);
        }
    }

    pagesContainer.addEventListener('click', async (e) => {
        const target = e.target;
        if (!target.classList.contains('num-page')) return;
        const pageSelect = parseInt(target.textContent, 10);
        await loadPage(pageSelect);

        const current = document.getElementById('num-page-active');
        if (current) current.removeAttribute('id');
        target.id = 'num-page-active';
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    nextBtn.addEventListener('click', () => {
        if (startPage + 5 <= totalPages) {
            startPage += 5;
            renderPageBlock();

            const firstBtn = pagesContainer.querySelector('.num-page');
            if (firstBtn) {
                const current = document.getElementById('num-page-active');
                if (current) current.removeAttribute('id');
                firstBtn.id = 'num-page-active';
                loadPage(parseInt(firstBtn.textContent, 10));

                if (startPage + 5 > totalPages) nextBtn.style.display = 'none';
                if (startPage > 1) returnBtn.style.display = 'flex';
            }
        }
    });


    returnBtn.addEventListener('click', () => {
        if (startPage - 5 >= 1) {
            startPage -= 5;
            renderPageBlock();
            const firstBtn = pagesContainer.querySelector('.num-page');
            if (firstBtn) {
                const current = document.getElementById('num-page-active');
                if (current) current.removeAttribute('id');
                firstBtn.id = 'num-page-active';
                loadPage(parseInt(firstBtn.textContent, 10));
                
                if (startPage <= 1) returnBtn.style.display = 'none';
                if (startPage + 5 <= totalPages) nextBtn.style.display = 'flex';
            }
        }
    });
}