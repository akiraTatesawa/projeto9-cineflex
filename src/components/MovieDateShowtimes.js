import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import Footer from "./Footer";

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
        <section>
          {movieDays.map(({ weekday, date, showtimes }, index) => (
            <MovieDateOptions
              key={index}
              weekday={weekday}
              date={date}
              showtimes={showtimes}
            />
          ))}
        </section>
      </main>
      <Footer moviePoster={movieData.posterURL} movieTitle={movieData.title} />
    </>
  );
}

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
