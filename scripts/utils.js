export function stringLimited(text) {
    if (!text) return '';
    if (text.length > 16) {
        let titleResume = text.substring(0,16);
        titleResume += "...";
        return titleResume;
    } else {
        return text;
    }
};

export function captInputValue() {
    const valueInputSearch = document.getElementById('input-search');
    const valueInput = valueInputSearch.value;

    return valueInput;
}

export function formatDate(dateString) {
    if (!dateString) return 'N/A';
    
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('pt-BR', options);
}

export function truncateText(text, maxLength = 150) {
    if (text.length <= maxLength) return text;
    
    return text.substring(0, maxLength) + '...';
}

let spinnerStartTime = 0;
const SPINNER_MIN_DISPLAY_TIME = 100; 

export function showSpinner() {
    const spinner = document.getElementById('global-spinner');
    if (spinner) {
        spinner.style.display = 'flex';
        spinner.setAttribute('aria-hidden', 'false');
        spinnerStartTime = Date.now();
    }
}

export function hideSpinner() {
    const spinner = document.getElementById('global-spinner');
    if (spinner) {
        const elapsedTime = Date.now() - spinnerStartTime;
        const remainingTime = Math.max(0, SPINNER_MIN_DISPLAY_TIME - elapsedTime);
        
        if (remainingTime > 0) {
            setTimeout(() => {
                spinner.style.display = 'none';
                spinner.setAttribute('aria-hidden', 'true');
            }, remainingTime);
        } else {
            spinner.style.display = 'none';
            spinner.setAttribute('aria-hidden', 'true');
        }
    }
}