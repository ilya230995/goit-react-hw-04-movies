const BASE_URL = 'https://api.themoviedb.org/3';

async function fetchWithErrorHandling(url = '', config = {}) {
  const response = await fetch(url, config);
  return response.ok
    ? await response.json()
    : Promise.reject(new Error('Not found'));
}

export function fetchTrendingMovies() {
  return fetchWithErrorHandling(
    `${BASE_URL}/trending/all/day?api_key=11cfd27d70f63ac789ba413b2504f7de`,
  );
}

export function fetchgMovies(querry) {
  return fetchWithErrorHandling(
    `${BASE_URL}/search/movie?api_key=11cfd27d70f63ac789ba413b2504f7de&language=en-US&query=${querry}&page=1&include_adult=false`,
  );
}
export function fetchgMovieDetails(movieId) {
  return fetchWithErrorHandling(
    `${BASE_URL}/movie/${movieId}?api_key=11cfd27d70f63ac789ba413b2504f7de&language=en-US`,
  );
}
export function fetchgCast(movieId) {
  return fetchWithErrorHandling(
    `${BASE_URL}/movie/${movieId}/credits?api_key=11cfd27d70f63ac789ba413b2504f7de&language=en-US`,
  );
}
export function fetchgReview(movieId) {
  return fetchWithErrorHandling(
    `${BASE_URL}/movie/${movieId}/reviews?api_key=11cfd27d70f63ac789ba413b2504f7de&language=en-US&page=1`,
  );
}
