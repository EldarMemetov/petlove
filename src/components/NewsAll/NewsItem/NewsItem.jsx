export default function NewsItem({ imgUrl, title, text, date, url }) {
  return (
    <div className="news-item">
      <img src={imgUrl} alt={title} />
      <h2>{title}</h2>
      <p>{text}</p>
      <p>{new Date(date).toLocaleDateString()}</p>
      <a href={url} target="_blank" rel="noopener noreferrer">
        Read More
      </a>
    </div>
  );
}
