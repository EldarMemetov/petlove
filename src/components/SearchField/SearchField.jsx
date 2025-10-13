import { useState } from 'react';
import s from './SearchField.module.scss';
import Container from '../../shared/container/Container';

export default function SearchField({ onSearch }) {
  const [value, setValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(value.trim());
  };

  const handleClear = () => {
    setValue('');
    onSearch('');
  };

  return (
    <section>
      <Container>
        <div className={s.containerSearch}>
          <h1 className={s.title}>News</h1>
          <form onSubmit={handleSubmit} className={s.form}>
            <input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Search"
              className={s.input}
            />

            {value && (
              <button
                type="button"
                onClick={handleClear}
                className={s.clearBtn}
              >
                <svg className={s.icon}>
                  <use href="/icon/sprite.svg#icon-close" />
                </svg>
              </button>
            )}

            <button type="submit" className={s.searchBtn}>
              <svg className={s.icon}>
                <use href="/icon/sprite.svg#icon-search" />
              </svg>
            </button>
          </form>
        </div>
      </Container>
    </section>
  );
}
