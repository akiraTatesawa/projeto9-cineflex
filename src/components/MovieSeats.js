import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Footer from "./Footer";

function Seat({ seatNumber, isAvailable }) {
  return (
    <button className={isAvailable ? "available" : "taken"}>
      {seatNumber}
    </button>
  );
}

function Seats({ seatsArray }) {
  return (
    <div className="seats">
      {seatsArray.map((seat, index) => (
        <Seat key={index} seatNumber={seat.name} isAvailable={seat.isAvailable}></Seat>
      ))}
    </div>
  );
}

export default function MovieSeats() {
  const { idSessao } = useParams();
  const [movieData, setMovieData] = useState({});
  const [seats, setSeats] = useState([]);

  useEffect(() => {
    const promise = axios.get(
      `https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${idSessao}/seats`
    );
    promise.then((response) => {
      setMovieData({
        ...response.data.movie,
        time: response.data.name,
        weekday: response.data.day.weekday,
      });
      setSeats([...response.data.seats]);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <main>
        <h2>Selecione o(s) assento(s)</h2>
        <section className="seats-selection">
          <Seats seatsArray={seats} />
        </section>
        <div className="seats-caption">
          <div className="caption-item">
            <button className="selected"></button>
            <span>Selecionado</span>
          </div>
          <div className="caption-item">
            <button className="available"></button>
            <span>Disponível</span>
          </div>
          <div className="caption-item">
            <button className="taken"></button>
            <span>Indisponível</span>
          </div>
        </div>
        <section className="buyer-data-inputs">
          <form>
            <label htmlFor="buyers-name">Nome do comprador:</label>
            <input
              type="text"
              name="buyers-name"
              placeholder="Digite o seu nome..."
            ></input>
            <label htmlFor="buyers-cpf">CPF do comprador:</label>
            <input
              type="text"
              name="buyers-cpf"
              placeholder="Digite seu CPF..."
            ></input>
            <input type="submit" value="Reservar assento(s)" disabled></input>
          </form>
        </section>
      </main>
      <Footer
        movieTitle={movieData.title}
        moviePoster={movieData.posterURL}
        date={`${movieData.weekday} - ${movieData.time}`}
      />
    </>
  );
}
