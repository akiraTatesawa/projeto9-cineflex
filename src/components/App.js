import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";
import styled from "styled-components";
import SuccessScreen from "./SuccessScreen";
import MovieSeats from "./MovieSeats";
import MovieDateShowtimes from "./MovieDateShowtimes";
import MoviesSection from "./MoviesSection";
import "../assets/styles/reset.css";
import "../assets/styles/styles.css";

export default function App() {
  const [ticketData, setTicketData] = useState({
    seats: [],
    name: "",
    cpf: "",
    movieTitle: "",
    date: "",
    time: "",
  });

  return (
    <BrowserRouter>
      <Header>
        <h1>CINEFLEX</h1>
      </Header>
      <Routes>
        <Route path="/" element={<MoviesSection />} />
        <Route path="/sessoes/:idMovie" element={<MovieDateShowtimes />} />
        <Route
          path="/assentos/:idSessao"
          element={
            <MovieSeats ticketData={ticketData} setTicketData={setTicketData} />
          }
        />
        <Route
          path="/sucesso"
          element={<SuccessScreen ticketData={ticketData} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 67px;
  background-color: #c3cfd9;

  h1 {
    color: #e8833a;
    font-size: 34px;
  }
`;
