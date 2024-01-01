// PokemonContext.tsx
import React, { createContext, useState, useEffect, useContext } from 'react';
import { Pokedex } from 'pokeapi-js-wrapper';

const options = {
  protocol: 'https',
  versionPath: '/api/v2/',
  cache: true,
  timeout: 5 * 1000 // 5s
}
const P = new Pokedex(options);

interface PokemonContextValue {
    pokemonUrls: string[];
    fetchPokemon: (url: string) => void;
}

const PokemonContext = createContext<PokemonContextValue | null>(null);

export const PokemonProvider = ({ children }: { children: React.ReactNode }) => {
  const [pokemonUrls, setPokemonUrls] = useState<string[]>([]);

  const fetchPokemon = (url: string) => {
    P.resource(url)
      .then((response: { results: { url: string; }[]; next: string; }) => {
        const urls = response.results.map((pokemon: { url: string }) => pokemon.url);
        setPokemonUrls(prevUrls => [...prevUrls, ...urls]);
      });
  };

  useEffect(() => {
    if (pokemonUrls.length === 0) {
      fetchPokemon('/api/v2/pokemon?limit=100');
    }
  }); 

  return (
    <PokemonContext.Provider value={{ pokemonUrls, fetchPokemon }}>
      {children}
    </PokemonContext.Provider>
  );
};

export const usePokemon = () => {
  const context = useContext(PokemonContext);
  if (context === null) {
    throw new Error('usePokemon must be used within a PokemonProvider');
  }
  return context;
};