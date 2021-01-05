import { NavLink } from 'react-router-dom';
import s from './Navigation.module.css';

export default function Navigation() {
  return (
    <nav>
      <NavLink
        exact
        to="/"
        className={s.navigationItem}
        activeClassName={s.activeNavigationItem}
      >
        Home
      </NavLink>
      <NavLink
        to="/movies"
        className={s.navigationItem}
        activeClassName={s.activeNavigationItem}
      >
        Movies
      </NavLink>
    </nav>
  );
}
