import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import * as moviesApi from '../services/services.js';
import s from '../css/HomePage.module.css';

function MainPage() {
  const [trendingMovies, setTrendingMovies] = useState(null);
  const location = useLocation();

  useEffect(() => {
    moviesApi
      .fetchTrendingMovies()
      .then(movies => setTrendingMovies(movies.results));
  }, []);
  return (
    <>
      <h2 className={s.sectionTitle}>Trending today</h2>
      {trendingMovies && (
        <ul>
          {trendingMovies.map(movie => (
            <li key={movie.id}>
              <Link
                to={{
                  pathname: `/movies/${movie.id}`,
                  state: { from: location },
                }}
              >
                {movie.original_title ?? movie.original_name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
export default MainPage;
