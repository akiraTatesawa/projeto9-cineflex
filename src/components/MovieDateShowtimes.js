import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Footer from "./Footer";

function MovieData({ weekday, date, showtimes }) {
  return (
    <>
      <h3>{`${weekday} - ${date}`}</h3>
      <div className="hour-buttons">
        {showtimes.map((showtime, index) => (
          <Link key={index} to={`/assentos/${showtime.id}`}>
            <button>{showtime.name}</button>
          </Link>
        ))}
      </div>
    </>
  );
}

export default function MovieDateShowtimes() {
  const { idMovie } = useParams();
  const [movieDays, setMovieDays] = useState([]);
  const [movie, setMovie] = useState({});

  useEffect(() => {
    const promise = axios.get(
      `https://mock-api.driven.com.br/api/v5/cineflex/movies/${idMovie}/showtimes`
    );
    promise.then((response) => {
      setMovieDays([...response.data.days]);
      setMovie({ ...response.data });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <main>
        <h2>Selecione o horário</h2>
        <section className="date-selection">
          {movieDays.map((day, index) => (
            <MovieData
              key={index}
              weekday={day.weekday}
              date={day.date}
              showtimes={day.showtimes}
            />
          ))}
        </section>
      </main>
      <Footer moviePoster={movie.posterURL} movieTitle={movie.title} />
    </>
  );
}
