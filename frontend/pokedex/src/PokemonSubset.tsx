import React, { useState, useEffect } from 'react';
import PokemonCard from './PokemonCard';
import { Pokedex } from 'pokeapi-js-wrapper';
import Grid from '@material-ui/core/Grid';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
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

  const chunkArray = (array: string[], chunkSize: number) => {
    const chunks = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
  };

 

  return (
    <>
      <button onClick={generatePDF}>Generate PDF</button>
      <div className="pokemon-grid">
        {chunkArray(pokemonUrls, 5).map((chunk, chunkIndex) => (
          <div className={chunkIndex % 5 === 4 ? "page-break" : ""} key={chunkIndex}>
            {chunk.map((url, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <PokemonCard url={url} />
              </Grid>
            ))}
          </div>
        ))}
      </div></>
  );
}

export default PokemonSubset;