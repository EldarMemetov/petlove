// import { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useParams } from 'react-router-dom';
// import { fetchId } from '../../redux/news/operations';
// import { selectCurrentNews, selectLoading } from '../../redux/news/selectors';

// export default function NewsIdItem() {
//   const { id } = useParams();
//   const dispatch = useDispatch();
//   const news = useSelector(selectCurrentNews);
//   const loading = useSelector(selectLoading);

//   useEffect(() => {
//     dispatch(fetchId(id));
//   }, [dispatch, id]);

//   if (loading) return <p>Loading...</p>;
//   if (!news) return <p>No data found.</p>;

//   return (
//     <div>
//       <img src={news.imgUrl} alt={news.title} />
//       <h1>{news.title}</h1>
//       <p>{news.text}</p>
//       <a href={news.url} target="_blank" rel="noopener noreferrer">
//         Read original article
//       </a>
//     </div>
//   );
// }
