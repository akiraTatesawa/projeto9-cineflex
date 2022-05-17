function Seat({ seatNumber }) {
  return <button className="available">{seatNumber}</button>;
}

function Seats() {
  const array = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 91, 2, 3, 4, 5, 6, 7, 8, 9, 91, 2, 3, 4, 5, 6, 7,
    8, 9, 9, 1, 2, 3, 4, 5, 6, 7, 8, 9, 91, 2, 3, 4, 5, 6, 7, 8, 9, 9, 1, 2, 3,
  ];
  console.log(array);

  return (
    <div className="seats">
      {array.map((item, index) => (
        <Seat key={index} seatNumber={index + 1}></Seat>
      ))}
    </div>
  );
}

export default function MovieSeats() {
  return (
    <>
      <h2>Selecione o(s) assento(s)</h2>
      <section className="seats-selection">
        <Seats />
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
            <input type="text" name="buyers-name" placeholder="Digite o seu nome..."></input>
            <label htmlFor="buyers-cpf">CPF do comprador:</label>
            <input type="text" name="buyers-cpf" placeholder="Digite seu CPF..."></input>
            <input type="submit" value="Reservar assento(s)" disabled></input>
        </form>
      </section>
    </>
  );
}
