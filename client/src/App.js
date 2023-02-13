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

  const KaydedilenlerListesineEkle = movie => {
    // Burası esnek. Aynı filmin birden fazla kez "saved" e eklenmesini engelleyin
    
  };
 
  return (
      <div>

        <KaydedilenlerListesi list={saved} />

        <Switch>
          <Route exact path="/">
            <FilmListesi movies={movieList} />
          </Route>
          <Route exact path="/filmler/:id">
            <Film KaydedilenlerListesineEkle={KaydedilenlerListesineEkle}/>
          </Route>
        </Switch>

      </div>
  );
}
