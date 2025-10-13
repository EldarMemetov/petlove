import s from './NewsItem.module.scss';
import noImage from '../../../../public/image/image.png';

export default function NewsItem({ imgUrl, title, text, date, url }) {
  const formattedDate =
    date && !isNaN(new Date(date))
      ? new Date(date).toLocaleDateString()
      : 'Date not available';

  return (
    <article className={s.articles}>
      <img
        className={s.image}
        src={imgUrl || noImage}
        alt={title || 'News image'}
        onError={(e) => {
          e.currentTarget.onerror = null;
          e.currentTarget.src = noImage;
        }}
      />
      <h2 className={s.title}>{title || 'Untitled'}</h2>
      <p className={s.text}>{text || 'No description available.'}</p>
      <div className={s.containerLink}>
        <div className={s.containerDate}>
          <p className={s.date}>{formattedDate}</p>
          <a
            href={url || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className={s.link}
          >
            Read More
          </a>
        </div>
      </div>
    </article>
  );
}
