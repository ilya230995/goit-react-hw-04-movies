import { useState, useEffect } from 'react';
import { Link, useRouteMatch, useLocation } from 'react-router-dom';
import * as moviesApi from '../services/services.js';
import s from '../css/moviesPage.module.css';

function MoviesPage() {
  const { url } = useRouteMatch();
  const location = useLocation();

  const [movieQuerry, setMovieQuerry] = useState(null);
  const [searchMovies, setSearchMovies] = useState(null);

  const [querry, setQuerry] = useState(null);

  const querryHandler = e => {
    setQuerry(e.currentTarget.value.toLowerCase());
  };

  const submitHandler = e => {
    e.preventDefault();

    setMovieQuerry(querry);

    setQuerry(null);
  };

  useEffect(() => {
    if (!movieQuerry) {
      return;
    }

    moviesApi
      .fetchgMovies(movieQuerry)
      .then(movies => setSearchMovies(movies.results))
      .finally(setMovieQuerry(null));
  }, [movieQuerry]);

  return (
    <>
      <form onSubmit={submitHandler} className={s.searchMovieForm}>
        <label>
          <input
            type="text"
            onChange={querryHandler}
            autoComplete="off"
            className={s.inputSearchMovieForm}
          ></input>
        </label>
        <button type="submit" className={s.submitSearchMovie}>
          Search
        </button>
      </form>

      {searchMovies && (
        <ul>
          {searchMovies.map(movie => (
            <li key={movie.id}>
              <Link
                to={{
                  pathname: `${url}/${movie.id}`,
                  state: { from: location },
                }}
              >
                {movie.name ? movie.name : movie.original_title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default MoviesPage;
