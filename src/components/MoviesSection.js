import { Link } from "react-router-dom";
import { useEffect, useState } from "react/";
import styled from "styled-components";
import axios from "axios";

export function Movie({ idMovie, moviePoster, movieTitle }) {
  return (
    <Link to={`/sessoes/${idMovie}`}>
      <MoviePoster>
        <img src={moviePoster} alt={`${movieTitle} poster`} />
      </MoviePoster>
    </Link>
  );
}

export default function MoviesSection({ setIsHomepage }) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const promise = axios.get(
      "https://mock-api.driven.com.br/api/v5/cineflex/movies"
    );

    promise.then((response) => {
      setMovies([...response.data]);
    });

    setIsHomepage(true)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main>
      <h2>Selecione o filme</h2>
      <Section>
        {movies.map(({ id, posterURL, title }) => (
          <Movie
            idMovie={id}
            key={id}
            moviePoster={posterURL}
            movieTitle={title}
          />
        ))}
      </Section>
    </main>
  );
}

const Section = styled.section`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: space-between;
`;

const MoviePoster = styled.figure`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 145px;
  height: 209px;
  background-color: #ffffff;
  box-shadow: 0px 2px 4px 2px rgba(0, 0, 0, 0.1);
  border-radius: 3px;
  margin-bottom: 11px;

  img {
    width: 129px;
    height: 193px;
  }
`;
