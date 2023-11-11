import React from 'react';
import { PokemonData } from './Pokemon'; // Import the PokemonData type from the Pokemon file

type PokemonCardProps = {
  pokemon: PokemonData;
};

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {
  return (
    <div className="card">
      <h2>{pokemon.name}</h2>
      <img src={pokemon.image} alt={pokemon.name} />
      <p>Type: {pokemon.type}</p>
    </div>
  );
}

export default PokemonCard;