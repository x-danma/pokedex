import { useState, useEffect } from 'react';
import PokemonCard from './PokemonCard';
import { Pokedex } from 'pokeapi-js-wrapper';

const options = {
  protocol: 'https',
  versionPath: '/api/v2/',
  cache: true,
  timeout: 5 * 1000 // 5s
}
const P = new Pokedex(options);

const Pokemon = () => {
  const [pokemonUrls, setPokemonUrls] = useState<string[]>([]);
  const [nextUrl, setNextUrl] = useState<string>('');

  const fetchPokemon = (url: string) => {
    P.resource(url)
      .then((response: { results: { url: string; }[]; next: string; }) => {
        const urls = response.results.map((pokemon: { url: string }) => pokemon.url);
        setPokemonUrls(prevUrls => [...prevUrls, ...urls]);
        setNextUrl(response.next);
      });
  };

  useEffect(() => {
    fetchPokemon('/api/v2/pokemon?limit=5');
  }, []);

  if (pokemonUrls.length === 0) return <div>Loading...</div>;

  return (
    <div className="pokemon-grid">
      {pokemonUrls.map((url, index) => <PokemonCard key={index} url={url} />)}
      <button onClick={() => fetchPokemon(nextUrl)}>Load More</button>
    </div>
  );
}

export default Pokemon;