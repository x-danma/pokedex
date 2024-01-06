/* eslint-disable indent */
import { useState } from "react";
import Dropdown from "./Dropdown";
import { usePokemon } from "./PokemonContext";
import { PokemonTabs } from "./PokemonTabs";
import Header from "./Header";

const Pokedex = () => {
  const [generation, setGeneration] = useState<number>(1); // Default to Generation 1
  const { setOffset, setLimit } = usePokemon();

  const handleGenerationChange = (newGeneration: number) => {
    setGeneration(newGeneration);
    const newOffset = calculateOffset(newGeneration);
    const newLimit = calculateLimit(newGeneration);
    console.log(newGeneration);
    setOffset(newOffset);
    setLimit(newLimit);
  };

  return (
    <div>
      <Header />
      <Dropdown
        generation={generation}
        onGenerationChange={handleGenerationChange}
      />
      <PokemonTabs />
    </div>
  );
};

export default Pokedex;

function calculateOffset(newGeneration: number) {
  switch (newGeneration) {
    case 1:
      return 0;
    case 2:
      return 151;
    case 3:
      return 251;
    case 4:
      return 386;
    case 5:
      return 493;
    case 6:
      return 649;
    case 7:
      return 721;
    case 8:
      return 809;
    case 9:
      return 905;
    case -2:
      return 0;
    default:
      throw new Error("Invalid generation");
  }
}
function calculateLimit(newGeneration: number) {
  switch (newGeneration) {
    case 1:
      return 151;
    case 2:
      return 100;
    case 3:
      return 135;
    case 4:
      return 107;
    case 5:
      return 156;
    case 6:
      return 72;
    case 7:
      return 88;
    case 8:
      return 96;
    case 9:
      return 105; // Update this when the total number of Pokemon in Generation 9 is known
    case -2:
      return 1010;
    default:
      throw new Error("Invalid generation");
  }
}
