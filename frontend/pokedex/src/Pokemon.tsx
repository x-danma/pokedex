import React, { useState, useEffect } from 'react';
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

  useEffect(() => {
    P.getPokemonsList({limit: 15})
      .then((response: { results: { url: string; }[]; }) => {
        const urls = response.results.map((pokemon: { url: string }) => pokemon.url);
        setPokemonUrls(urls);
      });
  }, []);

  if (pokemonUrls.length === 0) return <div>Loading...</div>;

  return (
    <div className="pokemon-grid">
      {pokemonUrls.map((url, index) => <PokemonCard key={index} url={url} />)}
    </div>
  );
}

export default Pokemon;