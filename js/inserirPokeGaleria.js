fetch('/json/pokedex-galeria.json')
    .then(res => res.json())
    .then(data => {
        const container = document.querySelector('.pokeContainer');

        const pokemonsOrdenados = data.pokemons.sort((a, b) => {
            const numA = parseInt(a.number.replace('#', ''), 10);
            const numB = parseInt(b.number.replace('#', ''), 10);
            return numA - numB;
        });

        pokemonsOrdenados.forEach(p => {
            const div = document.createElement('div');
            
            div.className = `pokemon ${p.type} ${p.shiny ? 'shiny' : ''} ${p.trade ? 'trade' : ''}`;
            
            div.innerHTML = `
            <div class="imgContainer">
              
              <div class="icon-container">
                ${p.shiny ? '<span class="icon shiny-icon" title="Shiny"></span>' : ''}
                ${p.trade ? '<span class="icon trade-icon" title="Trocado"></span>' : ''}
              </div>
              
              <img src="${p.image}" alt="${p.alt}">
            </div>
            <div class="info">
              <div class="name-wrapper">
                <p><strong>${p.name}</strong></p>
              </div>
              <p><strong>${p.number}</strong></p>
              <p><strong>${p.game}</strong></p>
              <p><strong>${p.date}</strong></p>
            </div>`;
            
            container.appendChild(div);
        });
    })
    .catch(error => {
        console.error('Erro ao carregar o JSON dos Pokémons:', error);
        const container = document.querySelector('.pokeContainer');
        container.innerHTML = "<p style='color: white; font-family: sans-serif;'>Erro ao carregar a Pokédex. Verifique o console.</p>";
    });