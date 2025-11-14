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