import { loadCards, loadCardsSearch } from "./listing.js";
import { captInputValue } from "./utils.js";

export function pagination(typeLoadCardsNum) {
    const inputValue = captInputValue();

    const containerCards = document.getElementById('container-cards');
    containerCards.innerHTML = '';

    if(inputValue.trim() !== '') {   
        loadCardsSearch(inputValue, 1);
    } else {
        loadCards(1);
    }

    const buttonsPages = document.querySelectorAll('.num-page');
    
    for (const buttonPage of buttonsPages) {
        buttonPage.addEventListener('click', () => {
            const pageSelect = parseInt(buttonPage.innerHTML);

            containerCards.innerHTML = '';

            switch (typeLoadCardsNum) {
                case 1:
                    loadCards(pageSelect);
                    break;
                case 2:
                    loadCardsSearch(inputValue, pageSelect);
                    break;
                default:
                    loadCards(pageSelect);
                    break;
            }

            const pageActive = document.getElementById('num-page-active');
            if (pageActive) {
                pageActive.removeAttribute('id');
            }

            buttonPage.setAttribute('id', 'num-page-active');
        });
    }

    const nextPages = document.getElementById('next');
    const returnPages = document.getElementById('return');
    
    nextPages.addEventListener('click', () => {
        containerCards.innerHTML = '';
                
        const atualPages = document.querySelectorAll('.num-page');

        if(atualPages[4].innerHTML >= 5) {
            returnPages.style.display = 'flex';
        }

        let endPage = parseInt(atualPages[4].innerHTML);
        
        loadCards(endPage);

        let countPagesInt = endPage;
        
        const atualActivePage = document.getElementById('num-page-active');
        if (atualActivePage) {
            atualActivePage.removeAttribute('id');
        }

        atualPages[0].setAttribute('id', 'num-page-active');

        atualPages.forEach((page) => {
            page.innerHTML = `${countPagesInt}`;
            countPagesInt += 1;
        });
    });
    
    returnPages.addEventListener('click', () => {
        containerCards.innerHTML = '';
    
        const atualPages = document.querySelectorAll('.num-page');
        
        let initialPage = parseInt(atualPages[0].innerHTML);
        
        loadCards(initialPage - 4);

        let countPagesInt = initialPage - 4;

        const atualActivePage = document.getElementById('num-page-active');
        if (atualActivePage) {
            atualActivePage.removeAttribute('id');
        }

        atualPages[0].setAttribute('id', 'num-page-active');
    
        if(initialPage === 5) {
            returnPages.style.display = 'none';
        }

        atualPages.forEach((page) => {
            page.innerHTML = `${countPagesInt}`;
            countPagesInt += 1;
        });
    });
}