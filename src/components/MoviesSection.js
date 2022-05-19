import { Link } from "react-router-dom";
import { useEffect, useState } from "react/";
import axios from "axios";

export function Movie({ idMovie, moviePoster, movieTitle }) {
  return (
    <Link to={`/sessoes/${idMovie}`}>
      <figure className="movie-poster">
        <img src={moviePoster} alt={`${movieTitle} poster`} />
      </figure>
    </Link>
  );
}

export default function MoviesSection() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const promise = axios.get(
      "https://mock-api.driven.com.br/api/v5/cineflex/movies"
    );

    promise.then((response) => {
      setMovies([...response.data]);
    });
  }, []);

  return (
    <main>
      <h2>Selecione o filme</h2>
      <section className="movies-section">
        {movies.map((movie, index) => (
          <Movie
            idMovie={movie.id}
            key={index}
            moviePoster={movie.posterURL}
            movieTitle={movie.title}
          />
        ))}
      </section>
    </main>
  );
}
