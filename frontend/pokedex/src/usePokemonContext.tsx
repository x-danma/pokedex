import React, { createContext, useState, useEffect, useContext } from 'react';
import Pokemon from './Pokemon';

type PokemonContextType = {
    pokemonDetails: typeof Pokemon[];
    fetchPokemon: (url: string) => void;
};

const PokemonContext = createContext<PokemonContextType | undefined>(undefined);

export const PokemonProvider: React.FC = ({ children }) => {
  const [pokemonDetails, setPokemonDetails] = useState<Pokemon[]>([]);

  const fetchPokemon = (url: string) => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const pokemon = {
          number: data.id,
          name: data.name,
          image: data.sprites.front_default,
          shinyImage: data.sprites.front_shiny,
          type: data.types.map((typeInfo: { type: { name: any; }; }) => typeInfo.type.name)
        };

        setPokemonDetails(prevDetails => [...prevDetails, pokemon]);
      });
  };

  return (
    <PokemonContext.Provider value={{ pokemonDetails, fetchPokemon }}>
      {children}
    </PokemonContext.Provider>
  );
};

export const usePokemonContext = () => {
  const context = useContext(PokemonContext);
  if (!context) {
    throw new Error('usePokemonContext must be used within a PokemonProvider');
  }
  return context;
};