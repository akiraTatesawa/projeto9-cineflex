import "../assets/styles/reset.css";
import "../assets/styles/styles.css";
import MoviesSection from "./MoviesSection";

export default function App() {
  return (
    <>
      <header>
        <h1>CINEFLEX</h1>
      </header>
      <div className="container">
        <MoviesSection />
      </div>
    </>
  );
}
