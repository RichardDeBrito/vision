const hamburguer = document.getElementById('hamburguer');
        const menu = document.getElementById('menu');
        const overlay = document.getElementById('overlay');
        
        hamburguer.addEventListener('click', () => {
            hamburguer.classList.toggle('active');
            menu.classList.toggle('active');
            overlay.classList.toggle('active');
        });
        
        overlay.addEventListener('click', () => {
            hamburguer.classList.remove('active');
            menu.classList.remove('active');
            overlay.classList.remove('active');
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