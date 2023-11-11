import React, { useState, useEffect } from 'react';
import PokemonCard from './PokemonCard';

export interface PokemonData {
  name: string;
  image: string;
  type: string;
}

const Pokemon = () => {
  const [pokemon, setPokemon] = useState<PokemonData[]>([]);

  useEffect(() => {
    Promise.all([
      fetch('https://pokeapi.co/api/v2/pokemon/pikachu'),
      fetch('https://pokeapi.co/api/v2/pokemon/arbok')
    ])
      .then((responses) => Promise.all(responses.map((response) => response.json())))
      .then((data) => {
        const pokemonData = data.map((pokemon) => ({
          name: pokemon.name,
          image: pokemon.sprites.front_default,
          type: pokemon.types.map((typeInfo: { type: { name: any; }; }) => typeInfo.type.name).join(', ')
        }));
        setPokemon(pokemonData);
      });
  }, []);

  if (pokemon.length === 0) return <div>Loading...</div>;

  return (
    <div className="pokemon-grid">
    {pokemon.map((poke, index) => <PokemonCard key={index} pokemon={poke} />)}
  </div>
  );
}

export default Pokemon;