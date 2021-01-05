import { useState, useEffect } from 'react';
import { useParams, useHistory, useLocation } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { useRouteMatch } from 'react-router-dom';
import * as moviesApi from '../services/services.js';
import { Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Loader from 'react-loader-spinner';
import s from '../css/MovieDetailsPage.module.css';
import imageNotFound from '../images/404.png';
import { FaArrowLeft } from 'react-icons/fa';

const Cast = lazy(() => import('./Cast'));
const Reviews = lazy(() => import('./Reviews'));

function MovieDetailsPage() {
  const { movieId } = useParams();
  const { url } = useRouteMatch();
  const location = useLocation();
  const history = useHistory();

  const [movie, setMovie] = useState(null);
  const [castLink, setCastLink] = useState(false);
  const [reviewLink, setReviewLink] = useState(false);

  useEffect(() => {
    moviesApi.fetchgMovieDetails(movieId).then(movies => setMovie(movies));
  }, [movieId]);

  const goBack = () => {
    history.push(location?.state?.from?.state?.from?.state?.from ?? '/');
  };

  const toogleLink = (link, setLink) => {
    if (link) {
      setLink(false);
    } else {
      setLink(true);
    }
  };
  console.log(location);

  return (
    <>
      {movie && (
        <>
          <button type="button" onClick={goBack}>
            <FaArrowLeft /> Go back
          </button>
          <div className={s.movieDetails}>
            <img
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                  : imageNotFound
              }
              alt="img"
              className={s.filmImage}
            ></img>
            <div>
              <h2>{movie.title}</h2>
              <p>User score: {movie.vote_average * 10}%</p>
              <h3>Overview</h3>
              <p>{movie.overview}</p>
              <h3>Genres</h3>
              <p className={s.genres}>
                {movie.genres.map(genre => genre.name).join(' ')}
              </p>
            </div>
          </div>
          <h3>Additional information</h3>
          <ul className={s.addInfoList}>
            <li>
              {' '}
              <NavLink
                exact
                to={{
                  pathname: `${url}/cast`,
                  state: { from: location },
                }}
                onClick={() => toogleLink(castLink, setCastLink)}
              >
                Cast
              </NavLink>
            </li>
            <li>
              {' '}
              <NavLink
                exact
                to={{
                  pathname: `${url}/reviews`,
                  state: { from: location },
                }}
                onClick={() => toogleLink(reviewLink, setReviewLink)}
              >
                Review
              </NavLink>
            </li>
          </ul>

          <Suspense fallback={<Loader />}>
            <Route path="/movies/:movieId/cast">{castLink && <Cast />}</Route>
            <Route path="/movies/:movieId/reviews">
              {reviewLink && <Reviews />}
            </Route>
          </Suspense>
        </>
      )}
    </>
  );
}

export default MovieDetailsPage;
