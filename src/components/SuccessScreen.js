import { Link } from "react-router-dom";

export default function SuccessScreen({ ticketData }) {
  return (
    <main>
      <section className="success-screen">
        <h2 className="success-title">
          Pedido feito
          <br />
          com sucesso!
        </h2>
        <div>
          <h3>Filme e Sessão</h3>
          <p>{ticketData.movieTitle}</p>
          <p>{`${ticketData.date} ${ticketData.time}`}</p>
        </div>
        <div>
          <h3>Ingressos</h3>
          {ticketData.seats.map((seatId, index) => (
            <p key={index}>Assentos {seatId}</p>
          ))}
        </div>
        <div>
          <h3>Comprador</h3>
          <p>Nome: {ticketData.name}</p>
          <p>CPF: {ticketData.cpf}</p>
        </div>
        <Link to="/">
          <button>Voltar para Home</button>
        </Link>
      </section>
    </main>
  );
}
