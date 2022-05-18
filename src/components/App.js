import { BrowserRouter, Route, Routes } from "react-router-dom";
import "../assets/styles/reset.css";
import "../assets/styles/styles.css";
import SuccessScreen from "./SuccessScreen";
import MovieSeats from "./MovieSeats";
import MovieDateShowtimes from "./MovieDateShowtimes";
import MoviesSection from "./MoviesSection";

export default function App() {
  return (
    <BrowserRouter>
      <header>
        <h1>CINEFLEX</h1>
      </header>
      <Routes>
        <Route path="/" element={<MoviesSection />} />
        <Route path="/sessoes/:idMovie" element={<MovieDateShowtimes />} />
        <Route path="/assentos/:idSessao" element={<MovieSeats />} />
        <Route path="/sucesso" element={<SuccessScreen />} />
      </Routes>
    </BrowserRouter>
  );
}
