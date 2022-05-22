import { Route, Routes, useNavigate } from "react-router-dom";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { IconContext } from "react-icons";
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
  const [isHomepage, setIsHomepage] = useState(true);
  const navigate = useNavigate();

  return (
    <>
      <Header>
        {!isHomepage ? (
          <IconContext.Provider value={{ color: "#e8833a", size: "2em", style: { position: "absolute", left: "5%" },}}>
            <BsFillArrowLeftCircleFill onClick={() => navigate(-1)} />
          </IconContext.Provider>
        ) : undefined}
        <h1>CINEFLEX</h1>
      </Header>
      <Routes>
        <Route
          path="/"
          element={<MoviesSection setIsHomepage={setIsHomepage} />}
        />
        <Route
          path="/sessoes/:idMovie"
          element={<MovieDateShowtimes setIsHomepage={setIsHomepage} />}
        />
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
    </>
  );
}

const Header = styled.header`
  position: fixed;
  top: 0%;
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
