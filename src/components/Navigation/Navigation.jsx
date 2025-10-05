import clsx from 'clsx';
import { NavLink } from 'react-router-dom';
import s from './Navigation.module.scss';

export default function Navigation({ onClose }) {
  const makeNavLinkClass = ({ isActive }) =>
    clsx(s.link, isActive && s.active, s.textStyle);
  const handleClick = () => {
    if (onClose) onClose();
  };
  return (
    <nav className={s.nav}>
      <NavLink to="/news" className={makeNavLinkClass} onClick={handleClick}>
        News
      </NavLink>
      <NavLink
        to="/find-pet"
        className={makeNavLinkClass}
        onClick={handleClick}
      >
        Find pet
      </NavLink>
      <NavLink to="/friends" className={makeNavLinkClass} onClick={handleClick}>
        Our friends
      </NavLink>
    </nav>
  );
}
