import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import Footer from "./Footer";
import { Loader } from "./MoviesSection";
import loader from "../assets/img/loader.gif";

const MovieDateOptions = ({ weekday, date, showtimes }) => {
  return (
    <>
      <h3>{`${weekday} - ${date}`}</h3>
      <HourButtons>
        {showtimes.map(({ id, name }, index) => (
          <Link key={index} to={`/assentos/${id}`}>
            <button>{name}</button>
          </Link>
        ))}
      </HourButtons>
    </>
  );
};

export default function MovieDateShowtimes() {
  const { idMovie } = useParams();
  const [movieDays, setMovieDays] = useState([]);
  const [movieData, setMovieData] = useState({});

  useEffect(() => {
    const promise = axios.get(
      `https://mock-api.driven.com.br/api/v5/cineflex/movies/${idMovie}/showtimes`
    );

    promise.then((response) => {
      setMovieDays([...response.data.days]);
      setMovieData({ ...response.data });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <main>
        <h2>Selecione o horário</h2>
        <Section alignment={movieDays.length === 0 ? "center" : "flex-start"} >
          {movieDays.length === 0 ? (
            <Loader src={loader} alt="loading animation" />
          ) : (
            movieDays.map(({ weekday, date, showtimes }, index) => (
              <MovieDateOptions
                key={index}
                weekday={weekday}
                date={date}
                showtimes={showtimes}
              />
            ))
          )}

        </Section>
      </main>
      <Footer moviePoster={movieData.posterURL} movieTitle={movieData.title} />
    </>
  );
}

const Section = styled.section`
  display: flex;
  flex-direction: column;
  align-items: ${props => props.alignment};
`;

const HourButtons = styled.div`
  display: flex;
  flex-flow: row wrap;
  margin: 22px 0;

  button {
    height: 43px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #e8833a;
    padding: 10px 15px;
    border: none;
    border-radius: 3px;
    color: #ffffff;
    font-size: 18px;
    margin-bottom: 10px;
    margin-right: 8px;
  }
`;
