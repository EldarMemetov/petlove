export default function Pagination({ page, totalPages, onPageChange }) {
  const getPages = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1, 2, 3, '...', totalPages);
    }
    return pages;
  };

  return (
    <div className="pagination">
      <button onClick={() => onPageChange(1)} disabled={page === 1}>
        {'<<'}
      </button>
      <button onClick={() => onPageChange(page - 1)} disabled={page === 1}>
        {'<'}
      </button>

      {getPages().map((p, i) =>
        p === '...' ? (
          <span key={i}>...</span>
        ) : (
          <button
            key={i}
            className={p === page ? 'active' : ''}
            onClick={() => onPageChange(p)}
          >
            {p}
          </button>
        )
      )}

      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
      >
        {'>'}
      </button>
      <button
        onClick={() => onPageChange(totalPages)}
        disabled={page === totalPages}
      >
        {'>>'}
      </button>
    </div>
  );
}
