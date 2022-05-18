import axios from "axios";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react/";

export function Movie({ idMovie, moviePoster }) {
  return (
    <Link to={`/sessoes/${idMovie}`}>
      <figure className="movie-poster">
        <img src={moviePoster} alt="movie poster" />
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
            idMovie={index + 1}
            key={index}
            moviePoster={movie.posterURL}
          />
        ))}
      </section>
    </main>
  );
}
