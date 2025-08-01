// pedido.js

window.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-pedido");
  const mensagemDiv = document.getElementById("mensagem");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const telefone = document.getElementById("telefone").value.trim();
    const endereco = document.getElementById("endereco").value.trim().toLowerCase();

    // Reforço opcional de campos obrigatórios
    if (!nome || !telefone || !endereco) {
      mensagemDiv.style.color = "red";
      mensagemDiv.textContent = "Por favor, preencha todos os campos obrigatórios.";
      return;
    }

    // Lista de bairros ou indicações de que o endereço é no RJ
    const indiciosDeRJ = [
      "rio de janeiro",
      "rj",
      "barra da tijuca",
      "copacabana",
      "ipanema",
      "madureira",
      "leblon",
      "botafogo",
      "recreio",
      "méier",
      "engenho de dentro",
      "bangu",
      "lapa",
      "flamengo",
      "glória",
      "ilha do governador",
      "jacarepaguá",
      "tijuca",
      "maracanã"
    ];

    const enderecoValido = indiciosDeRJ.some(bairro => endereco.includes(bairro));

    if (!enderecoValido) {
      mensagemDiv.style.color = "#b00020";
      mensagemDiv.innerHTML = `
        <img src="img/erro.png" alt="Carinha triste" style="width: 100px; display: block; margin: 0 auto;" />
        <p style="text-align:center; font-weight:bold; margin-top: 10px;">
          Não foi possível realizar sua entrega 😢<br>
          Infelizmente não atendemos nessa região.
        </p>
      `;
      return;
    }

    // Tempo de entrega entre 60 e 120 minutos
    const tempoEntrega = Math.floor(Math.random() * (120 - 60 + 1)) + 60;

    mensagemDiv.style.color = "#7b2cbf";
    mensagemDiv.innerHTML = `
      <p><strong>Obrigado pelo seu pedido, ${nome}!</strong></p>
      <p>Seu pedido será entregue em até <strong>${tempoEntrega} minutos</strong>.</p>
      <p>Entraremos em contato pelo telefone <strong>${telefone}</strong>.</p>
    `;

    // Limpa campos e carrinho
    form.reset();
    localStorage.removeItem("carrinho");
    localStorage.removeItem("pagamento");
  });
});
