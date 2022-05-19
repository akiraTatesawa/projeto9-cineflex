export default function Footer({ movieTitle, moviePoster, ...otherProps }) {
  return (
    <footer>
      {movieTitle === undefined && moviePoster === undefined ? undefined : (
        <>
          <figure className="movie-poster">
            <img src={moviePoster} alt="movie poster" />
          </figure>
          <div>
            <p>{movieTitle}</p>
            <p>{otherProps.date}</p>
          </div>
        </>
      )}
    </footer>
  );
}
