import { Link } from "react-router-dom";
import { useEffect, useState } from "react/";
import styled from "styled-components";
import axios from "axios";
import loader from "../assets/img/loader.gif"

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
        {movies.length === 0 ? <Loader src={loader} alt="loading animation" /> : movies.map(({ id, posterURL, title }) => (
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

export const Loader = styled.img`
  width: 90px;
  height: 90px;
  margin-bottom: 60px;
`;

const Section = styled.section`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: space-evenly;
  max-width: 525px;
  margin: 0 auto;
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
