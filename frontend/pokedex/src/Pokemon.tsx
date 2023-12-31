import { useState } from 'react';
import PokemonCard from './PokemonCard';
import { usePokemon } from './PokemonContext';

const Pokemon = () => {
  const { pokemonUrls } = usePokemon();
  const [isAllShiny, setIsAllShiny] = useState(false);
  const [showOnlyFirstFive, setShowOnlyFirstFive] = useState(false); // New state variable

 
  if (!pokemonUrls || (pokemonUrls as string[]).length === 0) return <div>Loading...</div>;

  const chunkArray = (array: string[], chunkSize: number) => {
    const chunks = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
  };

  const transposeArray = (array: string[][]) => {
    return array[0].map((_, colIndex) => array.map(row => row[colIndex]));
  };

  const toggleShowFirstFive = () => {
    setShowOnlyFirstFive(!showOnlyFirstFive);
  };
  const displayedPokemonUrls = Array.isArray(pokemonUrls) ? (showOnlyFirstFive ? pokemonUrls.slice(0, 5) : pokemonUrls) : [];

  return (
    <>
      <div style={{ display: 'flex', top: 0, background: '#fff', padding: '10px', zIndex: 100 }}>       
        <button style={{ marginRight: '20px' }} onClick={toggleShowFirstFive}>
          {showOnlyFirstFive ? 'Show All' : 'Show Only First Five'}
        </button>
        <button onClick={() => setIsAllShiny(!isAllShiny)}>Toggle All Shiny</button>
      </div>
      <div style={{ paddingTop: '50px' }}>
        <div className='pokemon-grid'>
          {transposeArray(chunkArray(displayedPokemonUrls, 5)).map((chunk, chunkIndex) => (
            <div className="row" key={chunkIndex}>
              {chunk.map((url, index) => (
                <>
                  <PokemonCard url={url} isShiny={isAllShiny} key={index} />
                </>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Pokemon;