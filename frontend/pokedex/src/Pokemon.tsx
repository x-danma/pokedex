import React, { useState, useEffect } from 'react';
import PokemonCard from './PokemonCard';

const Pokemon = () => {
  const [pokemonUrls, setPokemonUrls] = useState<string[]>([]);

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=12')
      .then((response) => response.json())
      .then((data) => {
        const urls = data.results.map((pokemon: { url: string }) => pokemon.url);
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