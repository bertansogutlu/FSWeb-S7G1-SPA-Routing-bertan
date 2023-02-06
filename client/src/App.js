import React, { useState, useEffect } from 'react';
import axios from 'axios';

import KaydedilenlerListesi from './Filmler/KaydedilenlerListesi';
import FilmListesi from './Filmler/FilmListesi';
import Film from './Filmler/Film'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

export default function App() {
  const [saved, setSaved] = useState([]); // Stretch: the ids of "saved" movies
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    const FilmleriAl = () => {
      axios
        .get('http://localhost:5001/api/filmler') // Burayı Postman'le çalışın
        .then(response => {
          // Bu kısmı log statementlarıyla çalışın
          // ve burdan gelen response'u 'movieList' e aktarın
          setMovieList(response.data)
        })
        .catch(error => {
          console.error('Sunucu Hatası', error);
        });
    }
    FilmleriAl();
  }, []);

  const KaydedilenlerListesineEkle = id => {
    // Burası esnek. Aynı filmin birden fazla kez "saved" e eklenmesini engelleyin

  };
  KaydedilenlerListesineEkle(0)
  return (
    <Router className="App">
      <div>
        <KaydedilenlerListesi list={saved} />
        <div>
          <Link to="/">FilmListesi</Link>
          <Link to="/filmler/:id">Film</Link>
        </div>
        <Switch>
        <Route path="/filmler/:id">
            <Film />
          </Route>
          <Route path="/">
            <FilmListesi movies={movieList} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
