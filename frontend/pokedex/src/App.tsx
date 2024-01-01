import "./App.css";
import Pokedex from "./Pokedex";
import { PokemonProvider } from "./PokemonContext";

function App() {
  return (
    <PokemonProvider>
      <Pokedex />
    </PokemonProvider>
  );
}

export default App;
