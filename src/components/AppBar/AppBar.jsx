import { useState } from 'react';
import Logo from '../../shared/Logo/Logo';
import Navigation from '../Navigation/Navigation';
import s from './AppBar.module.scss';
import useMediaQuery from '../../shared/useMediaQuery/useMediaQuery';
import ModalMenu from '../../shared/ModalMenu/ModalMenu';
import FormButton from '../FormButton/FormButton';

export default function AppBar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isDesktop = useMediaQuery('(min-width: 1024px)');

  const toggleModal = () => setIsModalOpen((prev) => !prev);
  const closeModal = () => setIsModalOpen(false);
  return (
    <header className={s.header}>
      <div className={s.inner}>
        <Logo />

        {isDesktop ? (
          <Navigation />
        ) : (
          <>
            <button className={s.burgerBtn} onClick={toggleModal}>
              <svg
                width="24"
                height="24"
                aria-label="Open Modal"
                className={s.icon}
              >
                <use href="/icon/sprite.svg#icon-open" />
              </svg>
            </button>

            <ModalMenu isOpen={isModalOpen} onClose={closeModal}>
              <Navigation onClose={closeModal} />
              <FormButton />
            </ModalMenu>
          </>
        )}
      </div>
    </header>
  );
}
