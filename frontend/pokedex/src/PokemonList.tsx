import { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

type Pokemon = {
  name: string;
  url: string;
};

function PokemonList() {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=5')
      .then(response => response.json())
      .then(data => setPokemon(data.results));
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Pokemon Name</TableCell>
            <TableCell align="right">Pokemon URL</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {pokemon.map((poke: Pokemon) => (
            <TableRow key={poke.name}>
              <TableCell component="th" scope="row">
                {poke.name}
              </TableCell>
              <TableCell align="right">{poke.url}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default PokemonList;