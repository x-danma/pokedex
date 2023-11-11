import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <Link to="/pokedex">
        <button>Go to Pokedex</button>
      </Link>
      <Link to="/gen1">
        <button>Go to Gen1</button>
      </Link>
      {/* Add more links as needed */}
    </div>
  );
}

export default Home;