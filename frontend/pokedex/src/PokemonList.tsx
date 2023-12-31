import { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import PokemonCard from './PokemonCard';

type Pokemon = {
  name: string;
  url: string;
};

function PokemonList() {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=10')
      .then(response => response.json())
      .then(data => setPokemon(data.results));
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableBody>
          {chunkArray(pokemon, 5).map((chunk, chunkIndex) => (
            <TableRow key={chunkIndex}>
              {chunk.map((poke: Pokemon) => (
                <TableCell key={poke.name}>
                  <PokemonCard url={poke.url} isShiny={false} /> {/* Render the PokemonCard component */}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default PokemonList;

function chunkArray(array: any[], chunkSize: number) {
  const results = [];
  while (array.length) {
    results.push(array.splice(0, chunkSize));
  }
  return results;
}