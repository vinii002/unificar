// jsscript.js
// Script completo para carrinho de compras da DonutLand

// Recupera carrinho salvo (se houver)
let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

// Função para adicionar item ao carrinho
function adicionarAoCarrinho(nome, preco) {
  const itemExistente = carrinho.find(item => item.nome === nome);
  if (itemExistente) {
    itemExistente.quantidade++;
  } else {
    carrinho.push({ nome, preco, quantidade: 1 });
  }
  atualizarCarrinho();
}

// Função para remover item do carrinho
function removerItem(nome) {
  const index = carrinho.findIndex(item => item.nome === nome);
  if (index !== -1) {
    carrinho.splice(index, 1);
  atualizarCarrinho();
}
}

// Função para alterar quantidade
function alterarQuantidade(nome, novaQtd) {
  novaQtd = parseInt(novaQtd);
  const item = carrinho.find(item => item.nome === nome);
  if (item && novaQtd >= 1) {
    item.quantidade = novaQtd;
  }
  atualizarCarrinho();
}

// Função para calcular total
function calcularTotal() {
  return carrinho.reduce((total, item) => total + item.preco * item.quantidade, 0);
}

// Função para atualizar o carrinho na tela
function atualizarCarrinho() {
  const divCarrinho = document.getElementById("carrinho");
  if (!divCarrinho) return;

  let html = "<h2>🛒 Seu Pedido</h2>";

  if (carrinho.length === 0) {
    html += "<p>Seu carrinho está vazio.</p>";
  } else {
    html += carrinho.map(item => `
      <div class="item-carrinho">
        <strong>${item.nome}</strong><br>
        R$ ${item.preco.toFixed(2)} x 
        <input type="number" min="1" value="${item.quantidade}" 
               onchange="alterarQuantidade('${item.nome}', this.value)" 
               class="quantidade">
        <button onclick="removerItem('${item.nome}')">🗑</button>
      </div>
    `).join("");

    html += `<p><strong>Total: R$ ${calcularTotal().toFixed(2)}</strong></p>`;

    html += `
      <label>Forma de Pagamento:</label><br>
      <select id="pagamento">
        <option value="Dinheiro">Dinheiro</option>
        <option value="Pix">Pix</option>
        <option value="Cartão">Cartão</option>
      </select>
      <br><br>
      <button onclick="finalizarPedido()">Finalizar Pedido</button>
    `;
  }

  divCarrinho.innerHTML = html;
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
}

// Função para salvar e ir para a página de pedido
function finalizarPedido() {
  const pagamento = document.getElementById("pagamento").value;
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
  localStorage.setItem("pagamento", pagamento);
  window.location.href = "pedido.html";
}

// Executado assim que a página carrega
window.addEventListener("DOMContentLoaded", () => {
  // Conecta os botões dos produtos
  document.querySelectorAll(".produto button").forEach(btn => {
    btn.addEventListener("click", () => {
      const produto = btn.closest(".produto");
      const nome = produto.querySelector("h2").innerText;
      const preco = parseFloat(produto.querySelector("span").innerText.replace("R$", "").replace(",", "."));
      adicionarAoCarrinho(nome, preco);
    });
  });

  // Exibe o carrinho se estiver na página do cardápio
  atualizarCarrinho();
});

// ====== MENU HAMBURGUER (mobile) ======
const menu = document.getElementById("menu");
const menuToggle = document.querySelector(".menu-toggle");

function toggleMenu() {
  menu.classList.toggle("show");
}

// Fecha o menu ao clicar em um item da lista
document.querySelectorAll('#menu a').forEach(link => {
  link.addEventListener('click', () => {
    menu.classList.remove("show");
  });
});

// Fecha o menu ao clicar fora do menu
document.addEventListener('click', function(event) {
  const isClickInsideMenu = menu.contains(event.target);
  const isClickOnToggle = menuToggle.contains(event.target);
  if (!isClickInsideMenu && !isClickOnToggle) {
    menu.classList.remove('show');
  }
});
