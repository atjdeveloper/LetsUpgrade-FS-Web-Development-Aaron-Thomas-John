
import './App.css';
import Movies from './components/Movies';
import Movie from './components/Movie';
import Admin from './components/Admin';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/" element={<Movies/>}/>
          <Route path="/movies/:id" element={<Movie/>}/>
          <Route path="/admin" element={<Admin/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
