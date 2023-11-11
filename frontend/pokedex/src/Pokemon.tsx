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

  const fetchPokemon = (url: string) => {
    P.resource(url)
      .then((response: { results: { url: string; }[]; next: string; }) => {
        const urls = response.results.map((pokemon: { url: string }) => pokemon.url);
        setPokemonUrls(prevUrls => [...prevUrls, ...urls]);
      });
  };

  useEffect(() => {
    fetchPokemon('/api/v2/pokemon?limit=151');
  }, []);

  if (pokemonUrls.length === 0) return <div>Loading...</div>;

  const chunkArray = (array: string[], chunkSize: number) => {
    const chunks = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
  };

  // foreach chunk in chunkArray, reorder the array so that the first element is in the middle

  

  return (
    <>
      <div className='pokemon-grid'>

        {chunkArray(pokemonUrls, 5).map((chunk, chunkIndex) => (
          <div className="row" key={chunkIndex}>
            Test
            {chunk.map((url, index) => (
              <>
                {index}
                <PokemonCard url={url} key={index} />
              </>
            ))}
          </div>
        ))}
      </div>
    </>
  );

}

export default Pokemon;