export default function Footer({ movieTitle, moviePoster }) {
  return (
    <footer>
      <figure className="movie-poster">
        <img src={moviePoster} alt="movie poster" />
      </figure>
      <div>
        <p>{movieTitle}</p>
        <p>Quinta-feira - 15:00</p>
      </div>
    </footer>
  );
}
