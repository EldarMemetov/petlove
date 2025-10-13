import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SearchField from '../../components/SearchField/SearchField';
import NewsList from '../../components/NewsAll/NewsList/NewsList';
import Pagination from '../../components/Pagination/Pagination';
import { fetchAll } from '../../redux/news/operations';
import {
  selectTotalPages,
  selectNews,
  selectLoading,
} from '../../redux/news/selectors';

export default function News() {
  const dispatch = useDispatch();
  const [keyword, setKeyword] = useState('');
  const [page, setPage] = useState(1);
  const [limit] = useState(6);

  const news = useSelector(selectNews);
  const loading = useSelector(selectLoading);
  const totalPages = useSelector(selectTotalPages);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      dispatch(fetchAll({ keyword, page, limit }));
    }, 700);

    return () => clearTimeout(timeoutId);
  }, [dispatch, keyword, page, limit]);

  const handleSearch = (value) => {
    setKeyword(value.trim());
    setPage(1);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <div className="news-page">
      <SearchField onSearch={handleSearch} />
      <NewsList news={news} loading={loading} />

      {totalPages > 1 && (
        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}
