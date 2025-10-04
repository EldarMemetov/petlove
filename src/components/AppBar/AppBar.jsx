import Logo from '../../shared/Logo/Logo';
import Navigation from '../Navigation/Navigation';
import s from './AppBar.module.scss';
export default function AppBar() {
  return (
    <header className={s.header}>
      <div>
        <Logo />
        <Navigation />
      </div>
    </header>
  );
}
