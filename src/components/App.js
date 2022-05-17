import "../assets/styles/reset.css";
import "../assets/styles/styles.css";
import Footer from "./Footer";
import MovieDayHour from "./MovieDayHour";
// import MoviesSection from "./MoviesSection";

export default function App() {
  return (
    <>
      <header>
        <h1>CINEFLEX</h1>
      </header>
      <main>
        {/* <MoviesSection /> */}
        <MovieDayHour />
      </main>
      <Footer />
    </>
  );
}