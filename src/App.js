import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MovieList from './components/MovieList';
import MovieListHeading from './components/MovieListHeading';
import Search from './components/Search';
import AddFavorites from './components/AddFavorites';
import RemoveFavourites from './components/RemoveFavourites';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [searchValue, setSearchValue] = useState('star');

  const getMovieRequest = async (searchValue) => {
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=241b5e20`;

    const response = await fetch(url);
    const responseJson = await response.json();

    if (responseJson.Search) {
      setMovies(responseJson.Search);
    }
  };

  useEffect(() => {
    getMovieRequest(searchValue);
  }, [searchValue]);

  useEffect(() => {
    const movieFavorites = JSON.parse(
      localStorage.getItem('react-movie-app-favorites')
    );

    if (movieFavorites) {
      setFavorites(movieFavorites);
    }
  }, []);

  const saveToLocalStorage = (items) => {
    localStorage.setItem('react-movie-app-favorites', JSON.stringify(items));
  };

  const addFavoritesMovie = (movie) => {
    const newFavoritesList = [...favorites, movie];
    setFavorites(newFavoritesList);
    saveToLocalStorage(newFavoritesList);
  };

  const removeFavoritesMovie = (movie) => {
    const newFavoritesList = favorites.filter(
      (favorites) => favorites.imdbID !== movie.imdbID
    );

    setFavorites(newFavoritesList);
    saveToLocalStorage(newFavoritesList);
  };

  return (
    <div className='container-fluid movie-app'>
      <div className='row d-flex align-items-center mt-4 mb-4'>
        <MovieListHeading heading='Movies' />
        <Search searchValue={searchValue} setSearchValue={setSearchValue} />
      </div>
      <div className='row'>
        <MovieList
          movies={movies}
          handleFavoritesClick={addFavoritesMovie}
          favoritesComponent={AddFavorites}
        />
      </div>
      <div className='row d-flex align-items-center mt-4 mb-4'>
        <MovieListHeading heading='Favourites' />
      </div>
      <div className='row'>
        <MovieList
          movies={favorites}
          handleFavouritesClick={removeFavoritesMovie}
          favoritesComponent={RemoveFavourites}
        />
      </div>
    </div>
  );
};
export default App;