const hamburguer = document.getElementById('hamburguer');
        const menu = document.getElementById('menu');
        
        hamburguer.addEventListener('click', () => {
            hamburguer.classList.toggle('active');
            menu.classList.toggle('active');
            overlay.classList.toggle('active');
        });

export function stringLimited(text) {
    if (text.length > 20) {
        let titleResume = text.substring(0,19);
        titleResume += "...";
        console.log(titleResume)
        return titleResume;
    } else {
        return text;
    }

};