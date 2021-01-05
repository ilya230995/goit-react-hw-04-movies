import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as moviesApi from '../services/services.js';
import imageNotFound from '../images/404.png';
import s from '../css/Cast.module.css';

function Cast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState(null);

  useEffect(() => {
    moviesApi.fetchgCast(movieId).then(credits => setCast(credits.cast));
  }, [movieId]);

  return (
    <>
      {cast && (
        <ul>
          {cast.map(person => (
            <li key={person.id} className={s.castListItem}>
              <img
                src={
                  person.profile_path
                    ? `https://image.tmdb.org/t/p/w500/${person.profile_path}`
                    : imageNotFound
                }
                alt="img"
                className={s.castImage}
              ></img>
              <p className={s.castInfo}>{person.name}</p>
              <p className={s.castInfo}>{person.character}</p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default Cast;
