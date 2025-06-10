( async () => {

  const TOTAL_POKEMONS = 11;
  const TOTAL_POKEMON_PAGES = 5;

  const fs = require( 'fs' );

  const pokemonIds = Array.from( { length: TOTAL_POKEMONS }, ( _, i ) => i + 1);

  let fileContent = pokemonIds
  .map(
    id => `/pokemon/${ id }`
  )
  .join( '\n' );

  // Paginas de Pokémons
  for (let index = 0; index <= TOTAL_POKEMON_PAGES; index++) {
    fileContent += `\n/pokemon/page/${ index}`;
  }

  //Pokemons por nombre
  const pokemonNameList = await fetch( `https://pokeapi.co/api/v2/pokemon?limit=${ TOTAL_POKEMONS }` )
  .then( res => res.json() );

  fileContent += '\n';
  fileContent += pokemonNameList.results.map(
    pokemon => `/pokemon/${ pokemon.name }`
  ).join( '\n' );

  fs.writeFileSync('routes.txt', fileContent );
  console.log( 'routers.txt created.' );

}
)();
