import { useState, useEffect } from 'react';
import PokemonCard from './PokemonCard';
import { Pokedex } from 'pokeapi-js-wrapper';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useRef } from 'react';
const options = {
  protocol: 'https',
  versionPath: '/api/v2/',
  cache: true,
  timeout: 5 * 1000 // 5s
}
const P = new Pokedex(options);

const Pokemon = () => {
  const [pokemonUrls, setPokemonUrls] = useState<string[]>([]);

  const fetchPokemon = (url: string) => {
    P.resource(url)
      .then((response: { results: { url: string; }[]; next: string; }) => {
        const urls = response.results.map((pokemon: { url: string }) => pokemon.url);
        setPokemonUrls(prevUrls => [...prevUrls, ...urls]);
      });
  };

  useEffect(() => {
    fetchPokemon('/api/v2/pokemon?limit=151');
  }, []);

  if (pokemonUrls.length === 0) return <div>Loading...</div>;

  // Split the pokemonUrls array into chunks of 5
  const rows = [];
  for (let i = 0; i < pokemonUrls.length; i += 5) {
    rows.push(pokemonUrls.slice(i, i + 5));
  }

  const input = useRef<HTMLDivElement>(null);
  const generatePDF = () => {

    html2canvas(input.current as HTMLElement)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'PNG', 0, 0, 210, 297);
        pdf.save("download.pdf");
        pdf.save("download.pdf");
      });
  };

  return (
    <>
      <button onClick={generatePDF}>Generate PDF</button>
      <div className="pokemon-grid" ref={input}>
        {pokemonUrls.map((url, index) => <PokemonCard key={index} url={url} />)}
      </div>
    </>
  );

}

export default Pokemon;