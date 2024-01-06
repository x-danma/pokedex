import React, { useState, useEffect, createContext, useContext } from "react";
import { Pokedex } from "pokeapi-js-wrapper";

const options = {
  protocol: "https",
  versionPath: "/api/v2/",
  cache: true,
  timeout: 5 * 1000, // 5s
};
const P = new Pokedex(options);

interface PokemonContextValue {
  pokemonUrls: string[];
  fetchPokemon: (offset: number, limit: number) => void;
  setOffset: React.Dispatch<React.SetStateAction<number>>;
  setLimit: React.Dispatch<React.SetStateAction<number>>;
}

const PokemonContext = createContext<PokemonContextValue | null>(null);

export const PokemonProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [pokemonUrls, setPokemonUrls] = useState<string[]>([]);
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(151); // Generation 1 has 151 Pokemon

  const fetchPokemon = (offset: number, limit: number) => {
    P.resource(`/api/v2/pokemon?offset=${offset}&limit=${limit}`).then(
      (response: { results: { url: string }[]; next: string }) => {
        const urls = response.results.map(
          (pokemon: { url: string }) => pokemon.url
        );
        setPokemonUrls(urls);
      }
    );
  };

  useEffect(() => {
    fetchPokemon(offset, limit);
  }, [limit, offset]);

  return (
    <PokemonContext.Provider
      value={{ pokemonUrls, fetchPokemon, setOffset, setLimit }}
    >
      {children}
    </PokemonContext.Provider>
  );
};

export const usePokemon = () => {
  const context = useContext(PokemonContext);
  if (context === null) {
    throw new Error("usePokemon must be used within a PokemonProvider");
  }
  return context;
};
