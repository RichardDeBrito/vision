import { loadCards, loadCardsSearch } from "./listing.js";
import { captInputValue } from "./utils.js";

export function pagination(typeLoadCardsNum) {

    const inputValue = captInputValue();

    if(inputValue.trim() !== '') {   
        loadCardsSearch(inputValue, 1);
    
    } else {
        loadCards(1);
    };

    const containerCards = document.getElementById('container-cards');
    containerCards.innerHTML = '';
    
    const buttonsPages = document.querySelectorAll('.num-page');
    
    for (const buttonPage of buttonsPages) {
        buttonPage.addEventListener('click', () => {
            const pageSelect = buttonPage.innerHTML;
    
            const containerCards = document.getElementById('container-cards');
            containerCards.innerHTML = '';
    
            switch (typeLoadCardsNum) {
                case 1:
                    loadCards(pageSelect);
                    break;
                case 2:
                    loadCardsSearch(inputValue, 1);
    
                default:
                    break;
            }
    
            const pageActive = document.getElementById('num-page-active');
            pageActive.removeAttribute('id');
    
            buttonPage.setAttribute('id', 'num-page-active');
        })
    };

    //Passar 5 paginas pra frente ou pra trás
    const nextPages = document.getElementById('next');
    const returnPages = document.getElementById('return');
    
    nextPages.addEventListener('click', () => {
    
        const containerCards = document.getElementById('container-cards');
        containerCards.innerHTML = '';
                
        const atualPages = document.querySelectorAll('.num-page');
    
        if(atualPages[4].innerHTML >= 5) {
            returnPages.style.display = 'flex';
        }
    
        let endPage = `${atualPages[4].innerHTML}`;
        
        loadCards(endPage);
    
        let countPagesString = endPage;
        let countPagesInt = Number(countPagesString);
    
        console.log(countPagesString);
    
        atualPages.forEach((page) => {
    
            page.innerHTML = `${countPagesString}`;
            countPagesInt = Number(countPagesString);
    
            countPagesInt += 1;
                    
            countPagesString = countPagesInt.toString();
        })
    });
    
    returnPages.addEventListener('click', () => {
        const containerCards = document.getElementById('container-cards');
        containerCards.innerHTML = '';
    
        const atualPages = document.querySelectorAll('.num-page');
        
        let initialPage = `${atualPages[0].innerHTML}`;
        
        loadCards(initialPage - 4);
    
        let countPagesString = initialPage;
        let countPagesInt = Number(countPagesString);
    
        if(initialPage === '5') {
            returnPages.style.display = 'none';
        };
    
    
        countPagesInt = initialPage - 4;
        countPagesString = countPagesInt.toString();
    
        atualPages.forEach((page) => {
    
            page.innerHTML = `${countPagesString}`;
            countPagesInt = Number(countPagesString);
    
            countPagesInt += 1;
    
            countPagesString = countPagesInt.toString();
        })
    });
}

