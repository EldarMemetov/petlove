import clsx from 'clsx';
import { NavLink } from 'react-router-dom';
import s from './Navigation.module.scss';

export default function Navigation() {
  const makeNavLinkClass = ({ isActive }) =>
    clsx(s.link, isActive && s.active, s.textStyle);

  return (
    <nav className={s.nav}>
      <NavLink to="/news" className={makeNavLinkClass}>
        News
      </NavLink>
      <NavLink to="/find-pet" className={makeNavLinkClass}>
        Find pet
      </NavLink>
      <NavLink to="/friends" className={makeNavLinkClass}>
        Our friends
      </NavLink>
    </nav>
  );
}
