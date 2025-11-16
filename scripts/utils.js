export function stringLimited(text) {
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