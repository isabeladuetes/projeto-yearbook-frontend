// Seleciona os elementos principais
const lista = document.querySelector("grade-alunos"); // grade dos cards
const inputBuscar = document.getElementById("inputBuscar");
const btnBuscar = document.getElementById("btnBuscar");
const btnReset = document.getElementById("btnResetar");
const selectTurma = document.getElementById("selectTurma"); // <select> das turmas

// Cria um contêiner para detalhes
let detalhes = document.createElement("div");
detalhes.id = "detalhes";
document.body.appendChild(detalhes);
detalhes.style.display = "none";

// Variável para armazenar os dados da API
let alunos = [];

// ⚙️ CONFIGURAÇÃO DA API
const IP_DO_BACKEND = "10.88.200.157"; // ⬅️ SEU IP JÁ ESTÁ AQUI
const PORTA = 3001; // ⬅️ A porta do seu server.js (confirme se é 3001)
const URL_BASE_API = `http://${IP_DO_BACKEND}:${PORTA}`;
// Fim da Configuração

// 🆕 FUNÇÃO PARA BUSCAR DADOS DA API (SIMPLIFICADA)
async function buscarAlunosDaAPI() {
  lista.innerHTML = "<p>Carregando dados dos alunos...</p>";
  try {
    // Usa 'resposta' em vez de 'response'
    const resposta = await fetch(`${URL_BASE_API}/alunos`);

    // Continua usando .json() para transformar a resposta
    const data = await resposta.json();

    // Armazena os dados na variável global 'alunos'
    alunos = data;

    // Atualiza a lista exibida no DOM
    mostrarLista(alunos);
  } catch (error) {
    console.error("Erro ao buscar alunos da API:", error);
    lista.innerHTML = `<p style="color: red;">❌ Erro ao carregar dados. Verifique a conexão com o servidor.</p>`;
  }
}

// Mostrar lista de alunos como cards
function mostrarLista(array) {
  lista.innerHTML = "";

  if (array.length === 0) {
    lista.innerHTML = "<p>Nenhum aluno encontrado.</p>";
    return;
  }

  array.forEach((aluno) => {
    const card = document.createElement("div");
    card.className = "aluno"; // Card do aluno (sem imagem por enquanto)

    card.innerHTML = `
      <div class="foto-fake"></div>
      <h3>${aluno.nome}</h3>
      <p>${aluno.turma}</p>
    `;

    card.onclick = () => mostrarDetalhes(aluno);
    lista.appendChild(card);
  });
}

// Buscar por nome
btnBuscar.onclick = () => {
  filtrar();
};

// Resetar
btnReset.onclick = () => {
  inputBuscar.value = "";
  selectTurma.value = "todos"; // O reset agora usa a lista global 'alunos' populada pela API
  mostrarLista(alunos);
};

// Filtro por turma
selectTurma.onchange = () => {
  filtrar();
};

// Função combinada de filtro (nome + turma)
function filtrar() {
  const termo = inputBuscar.value.toLowerCase();
  const turmaSelecionada = selectTurma.value; // Filtra a lista 'alunos' que veio da API

  let filtrados = alunos.filter((a) => a.nome.toLowerCase().includes(termo));

  if (turmaSelecionada !== "todos") {
    filtrados = filtrados.filter((a) => a.turma === turmaSelecionada);
  }

  mostrarLista(filtrados);
}

// Mostrar detalhes do aluno
function mostrarDetalhes(a) {
  detalhes.innerHTML = `
    <div class="detalhes-card">
      <h2>${a.nome}</h2>
      <p><strong>Ano:</strong> ${a.ano}</p>
      <p><strong>Idade:</strong> ${a.idade} anos</p>
      <p><strong>Email:</strong> ${a.email}</p>
      <p><strong>Turma:</strong> ${a.turma}</p>
      <button id="voltar">Voltar</button>
    </div>
  `;

  lista.style.display = "none";
  detalhes.style.display = "block";
  document.getElementById("voltar").onclick = voltar;
}

// Voltar para lista
function voltar() {
  detalhes.style.display = "none";
  lista.style.display = "grid";
}

// 🚀 Inicializa a aplicação buscando os dados da API
buscarAlunosDaAPI();

// Garante que o footer fique fixo ao final
window.addEventListener("resize", () => {
  document.body.style.minHeight = window.innerHeight + "px";
});
