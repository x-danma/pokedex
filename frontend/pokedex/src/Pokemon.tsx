import React, { useState, useEffect } from 'react';

const Pokemon = () => {
    const [pokemonData, setPokemonData] = useState<null | { name: string, image: string, type: string }>(null);

    useEffect(() => {
        fetch('https://pokeapi.co/api/v2/pokemon/pikachu')
            .then(response => response.json())
            .then(data => {
                const pokemon = {
                    name: data.name,
                    image: data.sprites.front_default,
                    type: data.types.map((typeInfo: { type: { name: string } }) => typeInfo.type.name).join(', ')
                };
                setPokemonData(pokemon);
            });
    }, []);

    if (!pokemonData) return <div>Loading...</div>;

    return (
        <div>
            <h2>{pokemonData.name}</h2>
            <img src={pokemonData.image} alt={pokemonData.name} />
            <p>Type: {pokemonData.type}</p>
        </div>
    );
}

export default Pokemon;
