const btnSearch = document.getElementById('btn-search');
const inputBusca = document.getElementById('busca');
const cardResultado = document.getElementById('resultado');
const textoAviso = document.getElementById('aviso');

const nomePokemon = document.getElementById('poke-nome');
const imgElement = document.getElementById('poke-imagem');
const tipoPokemon = document.getElementById('poke-tipo');

async function buscarPokemon() {
  const termoBusca = inputBusca.value.toLowerCase().trim();

  if (!termoBusca) return;

  try {
    const resposta = await fetch(`https://pokeapi.co/api/v2/pokemon/${termoBusca}`);

    if (!resposta.ok) {
      throw new Error('Pokémon não encontrado!');
    }

    const pokemon = await resposta.json();

    nomePokemon.textContent = pokemon.name.toUpperCase();
    imgElement.src = pokemon.sprites.other['official-artwork'].front_default;
    
    const tipos = pokemon.types.map(item => item.type.name).join(', ');
    tipoPokemon.textContent = `Tipo: ${tipos}`;

    cardResultado.classList.remove('hidden');
    textoAviso.classList.add('hidden');
  } catch (erro) {
    cardResultado.classList.add('hidden');
    textoAviso.classList.remove('hidden');
    textoAviso.textContent = erro.message;
  }
}

btnSearch.addEventListener('click', buscarPokemon);

inputBusca.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') buscarPokemon();
});