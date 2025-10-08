import { useState } from 'react';
import SearchField from '../../components/SearchField/SearchField';
import NewsList from '../../components/NewsAll/NewsList/NewsList';
import Pagination from '../../components/Pagination/Pagination';

export default function News() {
  const [keyword, setKeyword] = useState('');
  const [page, setPage] = useState(1);
  const [limit] = useState(6);

  const [totalPages, setTotalPages] = useState(10);

  const handleSearch = (value) => {
    setKeyword(value);
    setPage(1);
  };

  return (
    <div className="news-page">
      <SearchField onSearch={handleSearch} />
      <NewsList keyword={keyword} page={page} limit={limit} />
      {totalPages > 1 && (
        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      )}
    </div>
  );
}
