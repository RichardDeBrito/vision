export function stringLimited(text) {
    if (text.length > 16) {
        let titleResume = text.substring(0,16);
        titleResume += "...";
        return titleResume;
    } else {
        return text;
    }
};