import React, { useState, useEffect } from 'react';
import { getTypeIcon } from './getTypeIcon';

type PokemonCardProps = {
    url: string;
};

const PokemonCard: React.FC<PokemonCardProps> = ({ url }) => {
    const [pokemon, setPokemon] = useState<{ number: number; name: string; image: string; type: string[] } | null>(null);

    useEffect(() => {
        setTimeout(() => {
            fetch(url)
                .then((response) => response.json())
                .then((data) => {
                    setPokemon({
                        number: data.id, // Add this line
                        name: data.name,
                        image: data.sprites.front_default,
                        type: data.types.map((typeInfo: { type: { name: any; }; }) => typeInfo.type.name)
                    });
                });
        }, 1000);
    }, [url]);

    return (
        <div className="card">
            {pokemon ? (
                <>
                    <h3> {pokemon.number}. {pokemon.name.toUpperCase()}</h3>
                    <img src={pokemon.image} alt={pokemon.name} />
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