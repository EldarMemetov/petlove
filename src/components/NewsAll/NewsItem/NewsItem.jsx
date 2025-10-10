import noImage from '../../../../public/image/image.png';

export default function NewsItem({ imgUrl, title, text, date, url }) {
  const formattedDate =
    date && !isNaN(new Date(date))
      ? new Date(date).toLocaleDateString()
      : 'Date not available';

  return (
    <div className="news-item">
      <img
        src={imgUrl || noImage}
        alt={title || 'News image'}
        onError={(e) => {
          e.currentTarget.onerror = null;
          e.currentTarget.src = noImage;
        }}
      />

      <h2>{title ?? 'Untitled'}</h2>
      <p>{text ?? 'No description available.'}</p>
      <p>{formattedDate}</p>
      <a href={url ?? '#'} target="_blank" rel="noopener noreferrer">
        Read More
      </a>
    </div>
  );
}
