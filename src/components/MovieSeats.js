import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
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
      [inputName]: inputValue.toString(),
      ids: selectedSeats.seatsIds,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

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
        <SeatsSelection>
          <Seats
            seatsArray={seats}
            setSelectedSeats={setSelectedSeats}
            selectedSeats={selectedSeats}
          />
        </SeatsSelection>
        <SeatsCaption>
          <div>
            <button className="selected"></button>
            <span>Selecionado</span>
          </div>
          <div>
            <button className="available"></button>
            <span>Disponível</span>
          </div>
          <div>
            <button className="taken"></button>
            <span>Indisponível</span>
          </div>
        </SeatsCaption>
        <Inputs>
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">Nome do comprador:</label>
            <Input
              type="text"
              name="name"
              id="name"
              value={selectedSeats.seatsIds.length === 0 ? "" : inputs.name}
              onChange={handleChange}
              placeholder="Digite o seu nome..."
              disabled={selectedSeats.seatsIds.length === 0}
              required
            ></Input>
            <label htmlFor="cpf">CPF do comprador:</label>
            <Input
              type="number"
              name="cpf"
              id="cpf"
              value={selectedSeats.seatsIds.length === 0 ? "" : inputs.cpf}
              onChange={handleChange}
              placeholder="Digite seu CPF..."
              disabled={selectedSeats.seatsIds.length === 0}
              required
            ></Input>
            <SubmitInput
              type="submit"
              value="Reservar assento(s)"
              disabled={selectedSeats.seatsIds.length === 0}
            ></SubmitInput>
          </form>
        </Inputs>
      </main>
      <Footer
        movieTitle={movieData.title}
        moviePoster={movieData.posterURL}
        date={`${movieData.weekday} - ${movieData.time}`}
      />
    </>
  );
}

const SeatsSelection = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  button {
    flex: 0 0 26px;
    width: 26px;
    height: 26px;
    border-radius: 12px;
    margin-bottom: 18px;
    margin-right: 5px;
    padding: 7px;
    color: #293845;
    font-size: 11px;
  }
`;

const SeatsCaption = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  margin-bottom: 40px;

  button {
    flex: 0 0 26px;
    width: 26px;
    height: 26px;
    border-radius: 12px;
    margin-bottom: 18px;
    margin-right: 5px;
    padding: 7px;
    color: #293845;
    font-size: 11px;
  }

  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #4e5a65;
  }
`;

const Inputs = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;

  form {
    display: flex;
    flex-direction: column;
    width: 327px;
  }

  label {
    color: #293845;
    font-size: 18px;
    margin-bottom: 3px;
  }
`;

const Input = styled.input`
  width: 100%;
  height: 51px;
  background-color: #ffffff;
  border: 1px solid #d5d5d5;
  border-radius: 3px;
  margin-bottom: 10px;
  padding-left: 10px;
  font-size: 18px;
  outline: none;
  color: #293845;

  &::placeholder {
    font-size: 18px;
    font-style: italic;
  }

  &:disabled {
    background-color: #f3f3f3;
  }
`;

const SubmitInput = styled(Input)`
  height: 43px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #e8833a;
  padding: 10px 15px;
  border: none;
  color: #ffffff;
  margin-top: 50px;
  margin-bottom: 30px;

  &:disabled {
    background-color: #b8afaf;
  }
`;
