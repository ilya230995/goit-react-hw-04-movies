import { lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import AppBar from './components/AppBar';

const MainPage = lazy(() => import('./views/HomePage.js'));
const MoviesPage = lazy(() => import('./views/MoviesPage.js'));
const MovieDetailsPage = lazy(() => import('./views/MovieDetailsPage.js'));

function App() {
  return (
    <>
      <AppBar />

      <Suspense fallback={<Loader />}>
        <Switch>
          <Route path="/" exact>
            <MainPage />
          </Route>
          <Route path="/movies" exact>
            <MoviesPage />
          </Route>
          <Route path="/movies/:movieId">
            <MovieDetailsPage />
          </Route>
        </Switch>
      </Suspense>
    </>
  );
}

export default App;
