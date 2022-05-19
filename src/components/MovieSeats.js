import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Footer from "./Footer";

function Seat({
  seatNumber,
  isAvailable,
  seatId,
  setSelectedSeats,
  selectedSeats,
}) {
  const [isSelected, setIsSelected] = useState(false);

  function clickSeat() {
    if (isSelected) {
      setIsSelected(false);
      const array = selectedSeats.filter((id) => id !== seatId);
      setSelectedSeats([...array]);
    } else if (!isAvailable) {
      alert("Esse assento não está disponível");
    } else {
      setIsSelected(true);
      setSelectedSeats([...selectedSeats, seatId]);
    }
  }

  return (
    <button
      className={`${isAvailable ? "available" : "taken"} ${
        isSelected && isAvailable ? "selected" : ""
      }`}
      onClick={clickSeat}
    >
      {seatNumber}
    </button>
  );
}

function Seats({ seatsArray, setSelectedSeats, selectedSeats }) {
  return (
    <div className="seats">
      {seatsArray.map((seat, index) => (
        <Seat
          key={index}
          seatId={seat.id}
          seatNumber={seat.name}
          isAvailable={seat.isAvailable}
          setSelectedSeats={setSelectedSeats}
          selectedSeats={selectedSeats}
        ></Seat>
      ))}
    </div>
  );
}

export default function MovieSeats() {
  const { idSessao } = useParams();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [movieData, setMovieData] = useState({});
  const [seats, setSeats] = useState([]);
  const [inputs, setInputs] = useState({ ids: [], name: "", cpf: "" });
  let navigate = useNavigate();

  const handleChange = (event) => {
    const inputName = event.target.name;
    const inputValue = event.target.value;
    setInputs({ ...inputs, [inputName]: inputValue, ids: selectedSeats });
  };

  useEffect(() => {
    setInputs({ ...inputs, ids: [...selectedSeats] });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedSeats]);

  const handleSubmit = (event) => {
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
      .then((response) => {
        // navigate("/sucesso");
      })
      .catch((error) => {
        alert("Preencha os campos corretamente!");
      });
  };

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
              value={selectedSeats.length === 0 ? "" : inputs.name}
              onChange={handleChange}
              placeholder="Digite o seu nome..."
              disabled={selectedSeats.length === 0}
            ></input>
            <label htmlFor="cpf">CPF do comprador:</label>
            <input
              type="text"
              name="cpf"
              value={selectedSeats.length === 0 ? "" : inputs.cpf}
              onChange={handleChange}
              placeholder="Digite seu CPF..."
              disabled={selectedSeats.length === 0}
            ></input>
            <input
              type="submit"
              value="Reservar assento(s)"
              disabled={selectedSeats.length === 0}
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
