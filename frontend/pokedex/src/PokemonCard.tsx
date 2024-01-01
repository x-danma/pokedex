import React, { useState, useEffect } from "react";
import { getTypeIcon } from "./getTypeIcon";
import "./pokemon-card.css";
type PokemonCardProps = {
  url: string;
  isShiny: boolean;
  showToggleButton?: boolean;
};

type Pokemon = {
  number: number;
  name: string;
  image: string;
  shinyImage: string;
  type: string[];
};

const PokemonCard: React.FC<PokemonCardProps> = ({
  url,
  isShiny,
  showToggleButton = false,
}) => {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [shiny, setShiny] = useState<boolean>(isShiny);

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setPokemon({
          number: data.id,
          name: data.name,
          image: data.sprites.front_default,
          shinyImage: data.sprites.front_shiny,
          type: data.types.map(
            (typeInfo: { type: { name: string } }) => typeInfo.type.name
          ),
        });
      });
  }, [url]);

  useEffect(() => {
    setShiny(isShiny);
  }, [isShiny]);

  const toggleShiny = () => {
    setShiny(!shiny);
  };

  return (
    <div className="card">
      {pokemon ? (
        <>
          <b>
            {pokemon.number}. {formatPokemonName(pokemon.name, pokemon.number)}
          </b>
          {showToggleButton && (
            <button className="toggle-button" onClick={toggleShiny}>
              Toggle Shiny
            </button>
          )}{" "}
          <a
            href={`https://www.pokemon.com/us/pokedex/${pokemon.name}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={shiny ? pokemon.shinyImage : pokemon.image}
              alt={pokemon.name}
            />
          </a>
          <div className="type-icons">
            {pokemon.type.map((type, index) => (
              <img
                key={index}
                className="type-icon"
                src={getTypeIcon(type)}
                alt={type}
              />
            ))}
          </div>
        </>
      ) : (
        <div className="spinner"></div>
      )}
    </div>
  );
};

export default PokemonCard;

function formatPokemonName(name: string, number: number) {
  if (number === 892) {
    name = name.split("-")[0];
  }
  return name.toUpperCase();
}
