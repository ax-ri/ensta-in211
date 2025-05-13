import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import MovieDetails from './pages/MovieDetails/MovieDetails';
import './App.css';
import { Root } from './components/Root/Root';
import AddMovie from './pages/AddMovie/AddMovie.jsx';
import Auth from './pages/Auth/Auth.jsx';

function App() {
  return (
    <Root>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/add" element={<AddMovie />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </Root>
  );
}

export default App;
