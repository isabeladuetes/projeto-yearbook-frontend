// ⚙️ CONFIGURAÇÃO DA API
const IP_DO_BACKEND = "10.88.200.157";
const PORTA = 3001;
const URL_BASE_API = `http://${IP_DO_BACKEND}:${PORTA}`;

// ====== SELEÇÃO DOS ELEMENTOS ======
const medalGold = document.querySelector(".medal-gold");
const medalSilver = document.querySelector(".medal-silver");
const medalBronze = document.querySelector(".medal-bronze");
const cards = document.querySelectorAll(".award-card");

// ====== LIMPAR OS CARDS ======
function limparCards() {
  cards.forEach(card => {
    card.innerHTML = "";
  });
}

// ====== EXIBIR PREMIAÇÃO NA TELA ======
function mostrarPremiados(lista) {
  limparCards();
  
  lista.forEach((pessoa, index) => {
    if (cards[index]) {
      cards[index].innerHTML = `
        <div class="card-content">
          <h3>${pessoa.nome}</h3>
          <p>${pessoa.titulo}</p>
        </div>
      `;
    }
  });
}

// ====== BUSCAR DA API ======
async function buscarPremiados(tipo) {
  try {
    const response = await fetch(`${URL_BASE_API}/premiados/${tipo}`);
    
    if (!response.ok) {
      throw new Error("Erro ao buscar premiados da API");
    }

    const data = await response.json();
    mostrarPremiados(data);
  } catch (erro) {
    console.error("Erro:", erro);
  }
}

// ====== EVENTOS DE CLIQUE ======
medalGold.addEventListener("click", () => buscarPremiados("gold"));
medalSilver.addEventListener("click", () => buscarPremiados("silver"));
medalBronze.addEventListener("click", () => buscarPremiados("bronze"));
