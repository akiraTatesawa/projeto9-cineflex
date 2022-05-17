import moviePoster from "../assets/img/movie_poster.png";

export function Movie() {
  return (
    <figure className="movie-poster">
      <img src={moviePoster} alt="movie poster" />
    </figure>
  );
}

export default function MoviesSection() {
  return (
    <>
      <h2>Selecione o filme</h2>
      <section className="movies-section">
        <Movie />
        <Movie />
        <Movie />
        <Movie />
        <Movie />
        <Movie />
      </section>
    </>
  );
}
