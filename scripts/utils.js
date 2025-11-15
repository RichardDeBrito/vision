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