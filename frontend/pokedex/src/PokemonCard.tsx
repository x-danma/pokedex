import React, { useState, useEffect } from 'react';
import { getTypeIcon } from './getTypeIcon';

type PokemonCardProps = {
    url: string;
};

const PokemonCard: React.FC<PokemonCardProps> = ({ url }) => {
    const [pokemon, setPokemon] = useState<{ number: number; name: string; image: string; shinyImage: string; type: string[] } | null>(null);
    const [isShiny, setIsShiny] = useState(true);

    useEffect(() => {

        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                setPokemon({
                    number: data.id,
                    name: data.name,
                    image: data.sprites.front_default,
                    shinyImage: data.sprites.front_shiny,
                    type: data.types.map((typeInfo: { type: { name: any; }; }) => typeInfo.type.name)
                });
            });

    }, [url]);

    const toggleShiny = () => {
        setIsShiny(!isShiny);
    };

    return (
        <div className="card">
          {pokemon ? (
            <>
              <b>{pokemon.name.toUpperCase()}</b>
              <button className="toggle-button" onClick={toggleShiny}>Toggle Shiny</button>
              <a href={`https://www.pokemon.com/us/pokedex/${pokemon.name}`} target="_blank" rel="noopener noreferrer">
                <img src={isShiny ? pokemon.shinyImage : pokemon.image} alt={pokemon.name} />
              </a>
              <div className="type-icons">
                {pokemon.type.map((type, index) => (
                  <img key={index} className="type-icon" src={getTypeIcon(type)} alt={type} />
                ))}
              </div>
            </>
          ) : (
            <div className="spinner"></div>
          )}
        </div>
      );
}

export default PokemonCard;