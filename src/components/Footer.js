export default function Footer({ movieTitle, moviePoster, ...otherProps }) {
  return (
    <footer>
      <figure className="movie-poster">
        <img src={moviePoster} alt="movie poster" />
      </figure>
      <div>
        <p>{movieTitle}</p>
        <p>{otherProps.date}</p>
      </div>
    </footer>
  );
}
