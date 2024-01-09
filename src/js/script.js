// API

let currentPageUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=1';

window.onload = async () => {
    try {
        await loadPokemon(currentPageUrl);
    } catch (error) {
        console.log(error);
    }

    const nextButton = document.getElementById('next-button')
    const backButton = document.getElementById('back-button')

    nextButton.addEventListener('click', loadNextPokemon)
    backButton.addEventListener('click', loadPreviousPokemon)
}

async function loadPokemon(url) {
    const display = document.getElementById('display');
    display.innerHTML = '';

    try {
        const response = await fetch(url);
        const responseJson = await response.json();

        responseJson.results.forEach((pokemon) => {
            const screen = document.createElement('div')
            screen.className = 'screen'

            const numero = pokemon.url.replace(/\D/g, "");

            const img = document.createElement('div')
            img.style.backgroundImage =
                `url('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${numero.replace(/2/, "")}.svg')`
            img.className = 'img-screen'
            img.style.backgroundColor = generateColor()

            const pokemonName = document.createElement('span')
            pokemonName.className = 'pokemon-name'
            pokemonName.innerHTML = `${pokemon.name}`

            display.appendChild(screen)
            display.appendChild(pokemonName)
            screen.appendChild(img)

            async function loadInfo() {
                const infoContainer = document.getElementById('display-info')
                const infoBottonContainer = document.getElementById('info-bottom-container')
                infoContainer.innerHTML = ''
                infoBottonContainer.innerHTML = ''

                try {
                    const infoPokemon = await fetch(pokemon.url)
                    const infoPokemonJson = await infoPokemon.json()

                    const listInfo = document.createElement('ul')
                    listInfo.className = 'list-info'

                    const info1 = document.createElement('li')
                    const info2 = document.createElement('li')
                    const info3 = document.createElement('li')
                    const info4 = document.createElement('li')

                    info1.className = 'info'
                    info2.className = 'info'
                    info3.className = 'info'
                    info4.className = 'info'
                    info1.innerHTML = `Height: ${infoPokemonJson.height}`
                    info2.innerHTML = `Weight: ${infoPokemonJson.weight}`
                    info3.innerHTML = `Base XP: ${infoPokemonJson.base_experience}`

                    const listAbility = document.createElement('ul')
                    listAbility.className = 'list-ability'

                    const ability = document.createElement('li')
                    ability.innerHTML = 'Habilidades:'

                    info4.appendChild(listAbility)
                    listAbility.appendChild(ability)

                    infoPokemonJson.abilities.forEach((info) => {
                        let infos = info.ability.name

                        const li = document.createElement('li')
                        li.innerHTML = `${infos},`

                        listAbility.appendChild(li)
                    })

                    const infoId = document.createElement('div')
                    infoId.className = 'info-bottom'
                    infoId.innerHTML = `#${infoPokemonJson.id}`

                    infoBottonContainer.appendChild(infoId)

                    const infoBotton = document.createElement('div')
                    const ul = document.createElement('ul')
                    infoBotton.className = 'info-bottom'

                    infoBottonContainer.appendChild(infoBotton)
                    infoBotton.appendChild(ul)
                    
                    infoPokemonJson.types.forEach(tipo => {
                        const nameType = tipo.type.name

                        const li = document.createElement('li')
                        li.innerHTML = `${nameType}`

                        ul.appendChild(li)
                    })

                    infoContainer.appendChild(listInfo)
                    listInfo.appendChild(info1)
                    listInfo.appendChild(info2)
                    listInfo.appendChild(info3)
                    listInfo.appendChild(info4)

                } catch (error) {
                    console.log(error);
                }
            }

            async function loadMoves() {
                const quadrados = document.getElementById('quadrados')
                quadrados.innerHTML = ''

                try {
                    const infoPokemon = await fetch(pokemon.url)
                    const infoPokemonJson = await infoPokemon.json()

                    for (let i = 0; i < 5; i++) {
                        const moves = infoPokemonJson.moves[i].move.name

                        const div = document.createElement('div')
                        div.innerHTML = `${moves}`
                        div.className = 'quadrado'

                        quadrados.appendChild(div)
                    }

                } catch (error) {
                    console.log(error);
                }
            }

            loadInfo();
            loadMoves();
        });

        const nextButton = document.getElementById('next-button')
        const backButton = document.getElementById('back-button')

        nextButton.disabled = !responseJson.next
        backButton.disabled = !responseJson.previous

        currentPageUrl = url;

    } catch (error) {
        console.log(error);
    }
}

async function loadNextPokemon() {
    if (!currentPageUrl) return;

    try {
        const response = await fetch(currentPageUrl)
        const responseJson = await response.json()
        console.log(responseJson);
        await loadPokemon(responseJson.next)
    } catch (error) {
        console.log(error);
    }
}

async function loadPreviousPokemon() {
    if (!currentPageUrl) return;

    try {
        const response = await fetch(currentPageUrl)
        const responseJson = await response.json()
        console.log(responseJson);
        await loadPokemon(responseJson.previous)
    } catch (error) {
        console.log(error);
    }
}

// music Button

const play = document.querySelector(".play");
const pause = document.querySelector('.pause');
const musica = document.getElementById('musica');

play.addEventListener('click', () => {
    play.classList.remove('play');
    play.classList.add('pause');
    pause.classList.add('play');
    pause.classList.remove('pause');
    musica.play();
})

pause.addEventListener('click', () => {
    play.classList.remove('pause');
    play.classList.add('play');
    pause.classList.add('pause');
    pause.classList.remove('play');
    musica.pause();
})

// color

function generateColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    
    return color;
    
  }