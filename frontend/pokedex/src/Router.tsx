import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Pokemon from './Pokemon';
import HomePage from './HomePage';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/pokemon" element={<Pokemon />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;