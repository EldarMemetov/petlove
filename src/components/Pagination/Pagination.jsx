import s from './Pagination.module.scss';

export default function Pagination({ page, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const getPages = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (page <= 3) pages.push(1, 2, 3, '...', totalPages);
      else if (page >= totalPages - 2)
        pages.push(1, '...', totalPages - 2, totalPages - 1, totalPages);
      else pages.push(1, '...', page - 1, page, page + 1, '...', totalPages);
    }
    return pages;
  };

  return (
    <div className={s.pagination}>
      <button
        className={s.button}
        onClick={() => onPageChange(1)}
        disabled={page === 1}
      >
        {'<<'}
      </button>

      <button
        className={s.button}
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
      >
        {'<'}
      </button>

      {getPages().map((p, idx) => (
        <button
          key={idx}
          disabled={p === '...'}
          className={`${s.button} ${p === page ? s.active : ''}`}
          onClick={() => typeof p === 'number' && onPageChange(p)}
        >
          {p}
        </button>
      ))}

      <button
        className={s.button}
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
      >
        {'>'}
      </button>

      <button
        className={s.button}
        onClick={() => onPageChange(totalPages)}
        disabled={page === totalPages}
      >
        {'>>'}
      </button>
    </div>
  );
}
