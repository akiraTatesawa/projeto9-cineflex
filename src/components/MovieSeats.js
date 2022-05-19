import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Footer from "./Footer";
import Seats from "./Seats";

export default function MovieSeats({ ticketData, setTicketData }) {
  const { idSessao } = useParams();
  const [selectedSeats, setSelectedSeats] = useState({
    seatsIds: [],
    seatsNumbers: [],
  });
  const [movieData, setMovieData] = useState({});
  const [seats, setSeats] = useState([]);
  const [inputs, setInputs] = useState({ ids: [], name: "", cpf: "" });
  let navigate = useNavigate();

  function handleChange(event) {
    const inputName = event.target.name;
    const inputValue = event.target.value;

    setInputs({
      ...inputs,
      [inputName]: inputValue,
      ids: selectedSeats.seatsIds,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (
      inputs.ids.length === 0 ||
      inputs.name.length === 0 ||
      inputs.cpf.length === 0
    ) {
      alert("Preencha os campos corretamente!");
      return;
    }

    const promise = axios.post(
      "https://mock-api.driven.com.br/api/v5/cineflex/seats/book-many",
      inputs
    );
    promise
      .then(() => {
        setTicketData({
          ...ticketData,
          name: inputs.name,
          cpf: inputs.cpf,
          date: movieData.date,
          time: movieData.time,
          movieTitle: movieData.title,
          seats: selectedSeats.seatsNumbers.sort((a, b) => a - b),
        });

        navigate("/sucesso");
      })
      .catch(() => {
        alert("Preencha os campos corretamente!");
      });
  }

  useEffect(() => {
    const promise = axios.get(
      `https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${idSessao}/seats`
    );

    promise.then((response) => {
      setMovieData({
        ...response.data.movie,
        time: response.data.name,
        weekday: response.data.day.weekday,
        date: response.data.day.date,
      });

      setSeats([...response.data.seats]);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setInputs({ ...inputs, ids: [...selectedSeats.seatsIds] });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedSeats.seatsIds]);

  return (
    <>
      <main>
        <h2>Selecione o(s) assento(s)</h2>
        <section className="seats-selection">
          <Seats
            seatsArray={seats}
            setSelectedSeats={setSelectedSeats}
            selectedSeats={selectedSeats}
          />
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
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">Nome do comprador:</label>
            <input
              type="text"
              name="name"
              value={selectedSeats.seatsIds.length === 0 ? "" : inputs.name}
              onChange={handleChange}
              placeholder="Digite o seu nome..."
              disabled={selectedSeats.seatsIds.length === 0}
            ></input>
            <label htmlFor="cpf">CPF do comprador:</label>
            <input
              type="text"
              name="cpf"
              value={selectedSeats.seatsIds.length === 0 ? "" : inputs.cpf}
              onChange={handleChange}
              placeholder="Digite seu CPF..."
              disabled={selectedSeats.seatsIds.length === 0}
            ></input>
            <input
              type="submit"
              value="Reservar assento(s)"
              disabled={selectedSeats.seatsIds.length === 0}
            ></input>
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
