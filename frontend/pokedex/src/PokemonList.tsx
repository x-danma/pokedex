import { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Tab } from '@mui/material';
import { Pokedex } from 'pokeapi-js-wrapper';
import { getTypeIcon } from './getTypeIcon';

type Pokemon = {
    name: string;
    url: string;
    type: string; // Add the type property
};

const P = new Pokedex();

function PokemonList() {
    const [pokemon, setPokemon] = useState<Pokemon[]>([]);

    useEffect(() => {
        P.getPokemonsList({ limit: 6 })
            .then((response: { results: any[]; }) => {
                // For each Pokemon, fetch its details to get its type
                const promises = response.results.map(poke =>
                    P.getPokemonByName(poke.name).then(details => ({
                        name: poke.name,
                        url: poke.url,
                        type: details.types[0].type.name, // Assume the first type is the main type
                    }))
                );

                // Update the state once all promises have resolved
                Promise.all(promises).then(setPokemon);
            });
    }, []);

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Pokemon Name</TableCell>
                        <TableCell align="right">Pokemon URL</TableCell>
                        <TableCell align="right">Pokemon Type</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {pokemon.map((poke: Pokemon) => (
                        <TableRow key={poke.name}>
                            <TableCell component="th" scope="row">
                                {poke.name}
                            </TableCell>
                            <TableCell align="right">{poke.url}</TableCell>
                            <TableCell align="right">{poke.type}</TableCell>

                            <TableCell align="right">
                                {poke.type.split(',').map((type, index) => (
                                    <img key={index} src={getTypeIcon(type.trim())} alt={type.trim()} />
                                ))}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default PokemonList;