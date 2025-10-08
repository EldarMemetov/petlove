import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAll } from '../../../redux/news/operations';
import { selectNews, selectLoading } from '../../../redux/news/selectors';
import NewsItem from '../NewsItem/NewsItem';

export default function NewsList({ keyword, page, limit }) {
  const dispatch = useDispatch();
  const news = useSelector(selectNews);
  const loading = useSelector(selectLoading);

  useEffect(() => {
    dispatch(fetchAll({ keyword, page, limit }));
  }, [dispatch, keyword, page, limit]);

  if (loading) return <p>Loading...</p>;
  if (!news.length) return <p>No news available.</p>;

  return (
    <ul className="news-list">
      {news.map((item) => (
        <li key={item._id}>
          <NewsItem {...item} />
        </li>
      ))}
    </ul>
  );
}
