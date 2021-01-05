import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as moviesApi from '../services/services.js';

function Reviews() {
  const { movieId } = useParams();
  const [review, setReview] = useState(null);

  useEffect(() => {
    moviesApi.fetchgReview(movieId).then(reviews => setReview(reviews.results));
  }, [movieId]);

  return (
    <>
      {review && review.length > 0 ? (
        <ul>
          {review.map(review => (
            <li key={review.id}>
              <p>{review.author}</p>
              <p>{review.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        "We dont't have any reviews for this films"
      )}
    </>
  );
}

export default Reviews;

// setReview(reviews.results);

// useEffect(() => {
//   moviesApi.fetchgReview(movieId).then(reviews => {
//     if (reviews.results.length > 0) {
//       setReview(reviews.results);
//     }
//     return;
//   });
// }, [movieId]);
