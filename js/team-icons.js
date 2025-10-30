document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.pokemonCard');

    cards.forEach(card => {
        const sprite = card.querySelector('.spriteHR');
        const hasMega = card.dataset.mega;
        const hasGmax = card.dataset.gmax;
        const isShiny = card.dataset.shiny === 'true';

        const iconContainer = document.createElement('div');
        iconContainer.className = 'icon-containerHR';
        card.querySelector('.sprite-container').appendChild(iconContainer);

        if (isShiny) {
            const shinyIcon = document.createElement('span');
            shinyIcon.className = 'iconHR shiny-iconHR';
            shinyIcon.title = 'Shiny';
            iconContainer.appendChild(shinyIcon);
        }

        if (hasMega) {
            const megaIcon = document.createElement('span');
            megaIcon.className = 'iconHR mega-iconHR';
            megaIcon.title = 'Mega Evolução';
            iconContainer.appendChild(megaIcon);

            megaIcon.addEventListener('mouseenter', () => {
                sprite.classList.add('fade-out');
                setTimeout(() => {
                    sprite.src = hasMega;
                    sprite.classList.remove('fade-out');
                }, 150);
            });
            megaIcon.addEventListener('mouseleave', () => {
                sprite.classList.add('fade-out');
                setTimeout(() => {
                    sprite.src = card.querySelector('.spriteHR').dataset.original || sprite.src;
                    sprite.classList.remove('fade-out');
                }, 150);
            });

            sprite.dataset.original = sprite.src;
        }

        if (hasGmax) {
            const gmaxIcon = document.createElement('span');
            gmaxIcon.className = 'iconHR giga-iconHR';
            gmaxIcon.title = 'Gigantamax';
            iconContainer.appendChild(gmaxIcon);

            gmaxIcon.addEventListener('mouseenter', () => {
                sprite.classList.add('fade-out');
                setTimeout(() => {
                    sprite.src = hasGmax;
                    sprite.classList.remove('fade-out');
                }, 150);
            });
            gmaxIcon.addEventListener('mouseleave', () => {
                sprite.classList.add('fade-out');
                setTimeout(() => {
                    sprite.src = sprite.dataset.original;
                    sprite.classList.remove('fade-out');
                }, 150);
            });

            sprite.dataset.original = sprite.src;
        }
    });
});
