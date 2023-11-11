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

interface PokemonSubsetProps {
    pokemonNumbers: number[];
}

const PokemonSubset: React.FC<PokemonSubsetProps> = ({ pokemonNumbers }) => {
    const [pokemonUrls, setPokemonUrls] = useState<string[]>([]);

    useEffect(() => {
        pokemonNumbers.forEach((number) => {
            P.getPokemonByName(number)
                .then((pokemon: { species: { url: string; }; }) => {
                    setPokemonUrls(prevUrls => [...prevUrls, pokemon.species.url]);
                });
        });
    }, [pokemonNumbers]);

    if (pokemonUrls.length === 0) return <React.Fragment>Loading...</React.Fragment>;

    return (
        <div className="pokemon-grid">
            {pokemonUrls.map((url, index) => <PokemonCard key={index} url={url} />)}
        </div>
    );
}

export default PokemonSubset;