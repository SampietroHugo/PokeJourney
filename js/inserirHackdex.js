fetch('/json/hackdex.json')
  .then(res => res.json())
  .then(data => {
    const container = document.querySelector('.pokeContainer');
    const pokemonsOrdenados = data.pokemons.sort((a, b) => {
      const numA = parseInt(a.number.replace('#', ''), 10);
      const numB = parseInt(b.number.replace('#', ''), 10);
      return numA - numB;
    });

    const total = pokemonsOrdenados.length;
    const shinies = pokemonsOrdenados.filter(p => p.shiny).length;
    const trades = pokemonsOrdenados.filter(p => p.trade).length;

    document.getElementById('totalCount').textContent = `Total: ${total}`;
    document.getElementById('shinyCount').textContent = `Shiny: ${shinies}`;
    document.getElementById('tradeCount').textContent = `Trocados: ${trades}`;

    const renderPokemons = (list) => {
      container.classList.add('fade-out');
      setTimeout(() => {
        container.innerHTML = '';
        list.forEach(p => {
          const div = document.createElement('div');
          div.className = `pokemonHR ${p.type} ${p.shiny ? 'shinyHR' : ''} ${p.trade ? 'tradeHR' : ''}`;

          div.innerHTML = `
            <div class="imgContainerHR">
              <div class="icon-containerHR">
                ${p.shiny ? '<span class="iconHR shiny-iconHR" title="Shiny"></span>' : ''}
                ${p.trade ? '<span class="iconHR trade-iconHR" title="Trocado"></span>' : ''}
                ${p.gigantamax ? '<span class="iconHR giga-iconHR" title="Gigantamax"></span>' : ''}
                ${p.mega ? '<span class="iconHR mega-iconHR" title="Mega Evolução"></span>' : ''}
              </div>
              <img src="${p.image}" alt="${p.alt}" class="poke-sprite">
            </div>
            <div class="infoHR">
              <div class="name-wrapperHR"><p><strong>${p.name}</strong></p></div>
              <p><strong>${p.number}</strong></p>
              <p><strong>${p.game}</strong></p>
              <p><strong>${p.date}</strong></p>
            </div>`;

          const img = div.querySelector('.poke-sprite');
          
          if (p.gigantamax && p.gigantamaxSprite) {
            const gigaIcon = div.querySelector('.giga-iconHR');
            gigaIcon.addEventListener('mouseenter', () => {
              img.classList.add('fade-out');
              setTimeout(() => {
                img.src = p.gigantamaxSprite;
                img.classList.remove('fade-out');
              }, 150);
            });
            gigaIcon.addEventListener('mouseleave', () => {
              img.classList.add('fade-out');
              setTimeout(() => {
                img.src = p.image;
                img.classList.remove('fade-out');
              }, 150);
            });
          }

          if (p.mega && p.megaSprite) {
            const megaIcon = div.querySelector('.mega-iconHR');
            megaIcon.addEventListener('mouseenter', () => {
              img.classList.add('fade-out');
              setTimeout(() => {
                img.src = p.megaSprite;
                img.classList.remove('fade-out');
              }, 150);
            });
            megaIcon.addEventListener('mouseleave', () => {
              img.classList.add('fade-out');
              setTimeout(() => {
                img.src = p.image;
                img.classList.remove('fade-out');
              }, 150);
            });
          }

          container.appendChild(div);
        });
        container.classList.remove('fade-out');
      }, 300);
    };

    renderPokemons(pokemonsOrdenados);

    document.querySelectorAll('.filter-btn[data-filter]').forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.dataset.filter;
        if (filter === 'shiny') renderPokemons(pokemonsOrdenados.filter(p => p.shiny));
        else if (filter === 'trade') renderPokemons(pokemonsOrdenados.filter(p => p.trade));
        else renderPokemons(pokemonsOrdenados);
      });
    });

    const gameList = document.getElementById('gameList');
    const jogosUnicos = [...new Set(pokemonsOrdenados.map(p => p.game))].sort();

    jogosUnicos.forEach(game => {
      const p = document.createElement('p');
      p.textContent = game;
      p.dataset.game = game;
      gameList.appendChild(p);
    });

    gameList.addEventListener('click', (e) => {
      if (e.target.dataset.game) {
        const selectedGame = e.target.dataset.game;
        renderPokemons(pokemonsOrdenados.filter(p => p.game.toLowerCase() === selectedGame.toLowerCase()));
        document.querySelector('.dropdown').classList.remove('open');
      }
    });

    const dropdown = document.querySelector('.dropdown');
    const gameFilterBtn = document.getElementById('gameFilterBtn');
    gameFilterBtn.addEventListener('click', () => dropdown.classList.toggle('open'));

    document.addEventListener('click', (e) => {
      if (!dropdown.contains(e.target) && e.target !== gameFilterBtn) {
        dropdown.classList.remove('open');
      }
    });
  })
  .catch(error => {
    console.error('Erro ao carregar o JSON dos Pokémons:', error);
    document.querySelector('.pokeContainer').innerHTML =
      "<p style='color: white; font-family: sans-serif;'>Erro ao carregar a Pokédex. Verifique o console.</p>";
  });
