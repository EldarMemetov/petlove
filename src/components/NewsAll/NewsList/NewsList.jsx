import NewsItem from '../NewsItem/NewsItem';
import noImage from '../../../../public/image/image.png';
import Loading from '../../../shared/Loading/Loading';
import Container from '../../../shared/container/Container';
import s from './NewsList.module.scss';
export default function NewsList({ news, loading }) {
  if (loading) return <Loading />;
  if (!news.length) return <p>No news available.</p>;

  return (
    <section>
      <Container>
        <div>
          <ul className={s.ulList}>
            {news.map((item) => {
              const headline = item.headline?.main ?? 'Untitled';
              const text =
                item.lead_paragraph ||
                item.snippet ||
                'No description available.';
              const date = item.pub_date ?? null;
              const url = item.web_url ?? '#';
              const imgUrl = item.multimedia?.length
                ? item.multimedia[0].url.startsWith('http')
                  ? item.multimedia[0].url
                  : `https://static01.nyt.com/${item.multimedia[0].url}`
                : noImage;

              return (
                <li key={item._id} className={s.list}>
                  <NewsItem
                    title={headline}
                    text={text}
                    date={date}
                    url={url}
                    imgUrl={imgUrl}
                  />
                </li>
              );
            })}
          </ul>
        </div>
      </Container>
    </section>
  );
}
