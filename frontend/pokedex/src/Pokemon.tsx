import { useState, useEffect } from 'react';
import PokemonCard from './PokemonCard';
import { Pokedex } from 'pokeapi-js-wrapper';
import Grid from '@material-ui/core/Grid';
const options = {
  protocol: 'https',
  versionPath: '/api/v2/',
  cache: true,
  timeout: 5 * 1000 // 5s
}
const P = new Pokedex(options);

const Pokemon = () => {
  const [pokemonUrls, setPokemonUrls] = useState<string[]>([]);
  const [isAllShiny, setIsAllShiny] = useState(false);

  const fetchPokemon = (url: string) => {
    P.resource(url)
      .then((response: { results: { url: string; }[]; next: string; }) => {
        const urls = response.results.map((pokemon: { url: string }) => pokemon.url);
        setPokemonUrls(prevUrls => [...prevUrls, ...urls]);
      });
  };

  useEffect(() => {
    fetchPokemon('/api/v2/pokemon?limit=1010');
  }, []);

  if (pokemonUrls.length === 0) return <div>Loading...</div>;

  const chunkArray = (array: string[], chunkSize: number) => {
    const chunks = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
  };

  const transposeArray = (array: string[][]) => {
    return array[0].map((_, colIndex) => array.map(row => row[colIndex]));
  };


  return (
    <>
      <button onClick={() => setIsAllShiny(!isAllShiny)}>Toggle All Shiny</button>
      <div className='pokemon-grid'>
        {transposeArray(chunkArray(pokemonUrls, 5)).map((chunk, chunkIndex) => (
          <div className="row" key={chunkIndex}>
            {chunk.map((url, index) => (
              <>
                <PokemonCard url={url} isShiny={isAllShiny} key={index} />
              </>
            ))}
          </div>
        ))}
      </div>
    </>
  );

}

export default Pokemon;