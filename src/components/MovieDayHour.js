function MovieData() {
  return (
    <>
      <h3>Quinta-feira - 24/06/2021</h3>
      <div className="hour-buttons">
        <button>15:00</button>
        <button>19:00</button>
        <button>19:00</button>
        <button>19:00</button>
        <button>19:00</button>
      </div>
    </>
  );
}

export default function MovieDayHour() {
  return (
    <>
      <h2>Selecione o horário</h2>
      <section className="date-selection">
        <MovieData />
        <MovieData />
        <MovieData />
      </section>
    </>
  );
}
