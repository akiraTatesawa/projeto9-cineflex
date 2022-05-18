export default function SuccessScreen() {
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
          <p>2067</p>
          <p>24/06/2021 15:00</p>
        </div>
        <div>
          <h3>Ingressos</h3>
          <p>Assento 15</p>
          <p>Assento 16</p>
        </div>
        <div>
          <h3>Comprador</h3>
          <p>Nome: Arthur</p>
          <p>CPF: 123.123.432-12</p>
        </div>
        <button>Voltar para Home</button>
      </section>
    </main>
  );
}
