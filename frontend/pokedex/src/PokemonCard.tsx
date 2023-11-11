import React, { useState, useEffect } from 'react';

type PokemonCardProps = {
  url: string;
};

const PokemonCard: React.FC<PokemonCardProps> = ({ url }) => {
  const [pokemon, setPokemon] = useState<{ name: string; image: string; type: string } | null>(null);

  useEffect(() => {
    setTimeout(() => {
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          setPokemon({
            name: data.name,
            image: data.sprites.front_default,
            type: data.types.map((typeInfo: { type: { name: any; }; }) => typeInfo.type.name).join(', ')
          });
        });
    }, 1000);
  }, [url]);

  return (
    <div className="card">
      {pokemon ? (
        <>
          <h2>{pokemon.name}</h2>
          <img src={pokemon.image} alt={pokemon.name} />
          <p>Type: {pokemon.type}</p>
        </>
      ) : (
        <div className="spinner"></div>
      )}
    </div>
  );
}

export default PokemonCard;