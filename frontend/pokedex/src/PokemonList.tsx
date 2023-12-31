import { Table, TableBody, TableCell, TableContainer, TableRow, Paper } from '@mui/material';
import PokemonCard from './PokemonCard';
import { usePokemon } from './PokemonContext';


function PokemonList() {
  const { pokemonUrls } = usePokemon();

  return (
    <TableContainer component={Paper} className="printable">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableBody>
          {chunkArray(pokemonUrls, 5).map((chunk, chunkIndex) => (
            <TableRow key={chunkIndex}>
              {chunk.map((url: string) => (
                <TableCell key={url} style={{ width: '20%' }}>
                  <PokemonCard url={url} isShiny={false} /> {/* Render the PokemonCard component */}
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