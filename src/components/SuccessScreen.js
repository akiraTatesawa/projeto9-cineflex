import { Link } from "react-router-dom";
import styled from "styled-components";

export default function SuccessScreen({ ticketData }) {
  return (
    <main>
      <SuccessSection>
        <h2>
          Pedido feito
          <br />
          com sucesso!
        </h2>
        <div>
          <h3>Filme e Sessão</h3>
          <p>{ticketData.movieTitle}</p>
          <p>{`${ticketData.date} - ${ticketData.time}`}</p>
        </div>
        <div>
          <h3>Ingressos</h3>
          {ticketData.seats.map((seatId, index) => (
            <p key={index}>Assento {seatId}</p>
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
      </SuccessSection>
    </main>
  );
}

const SuccessSection = styled.section`
  h2 {
    color: #247a6b;
    font-weight: 700;
    line-height: 28px;
  }

  h3 {
    color: #293845;
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 7px;
  }

  div {
    margin-bottom: 30px;
  }

  p {
    font-size: 22px;
    color: #293845;
    margin-bottom: 5px;
  }

  button {
    margin: 0 auto;
    margin-top: 80px;
    width: 225px;
    height: 43px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #e8833a;
    padding: 10px 15px;
    border: none;
    border-radius: 3px;
    color: #ffffff;
    font-size: 18px;
  }
`;
