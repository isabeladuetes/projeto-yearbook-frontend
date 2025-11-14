// Seleciona os elementos principais
const lista = document.querySelector(".grade-alunos"); // grade dos cards
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
const IP_DO_BACKEND = "10.88.200.157";
const PORTA = 3001; // A porta do seu server.js
const URL_BASE_API = `http://${IP_DO_BACKEND}:${PORTA}`;
// Fim da Configuração

// 🆕 FUNÇÃO PARA BUSCAR DADOS DA API (COM VERIFICAÇÃO DE ERROS)
async function buscarAlunosDaAPI() {
  lista.innerHTML = `<p>Carregando dados dos alunos...</p>`;
  try {
    const resposta = await fetch(`${URL_BASE_API}/alunos`);

    // CORREÇÃO 1: Verifica se a resposta HTTP foi um sucesso (ex: 200)
    if (!resposta.ok) {
      throw new Error(`Erro HTTP: ${resposta.status} - ${resposta.statusText}`);
    }

    // ...
    const data = await resposta.json();

    // ⬇️ Mude esta linha
    if (!Array.isArray(data.alunos)) {
      // Verifique data.data
      console.error("Dados recebidos não são um array:", data);
      throw new Error("A API não retornou dados no formato de array.");
    }

    alunos = data.alunos; // ⬅️ Pegue o array de dentro do objeto
    mostrarLista(alunos);
    // ...
    // Atualiza a lista exibida no DOM
    mostrarLista(alunos);
  } catch (error) {
    console.error("Erro ao buscar alunos da API:", error);
    lista.innerHTML = `<p style="color: red;">❌ Erro ao carregar dados. Verifique o IP, a conexão com o servidor e o console.</p>`;
  }
}

// Mostrar lista de alunos como cards
// ⬇️ FUNÇÃO CORRIGIDA ⬇️
// Mostrar lista de alunos como cards
function mostrarLista(array) {
  lista.innerHTML = "";

  if (array.length === 0) {
    lista.innerHTML = "<p>Nenhum aluno encontrado.</p>";
    return;
  }

  array.forEach((aluno) => {
    const card = document.createElement("div");
    card.className = "aluno";

    // ⬇️ CORREÇÃO IMPORTANTE AQUI ⬇️
    // 1. Verificamos se 'aluno.foto' existe (não é null)
    // 2. Se existir, usamos 'aluno.foto.url_da_foto' (VERIFIQUE O NOME DA COLUNA)
    // 3. Se não existir, usamos uma imagem padrão
    const temFotos = aluno.fotos && aluno.fotos.length > 0;

    // 2. Se existir, pegamos a URL da PRIMEIRA foto (índice [0])
    //    Troque 'url' pelo nome da sua coluna de link (do schema 'Foto')
    const urlFoto = temFotos
      ? aluno.fotos[0].url // <-- Pegando a [0] do array 'fotos'
      : "https://i.ibb.co/Lh0fxWFX/yearbook-photo-blue-textured-background-a-young-lightbrown-men-with-glasses-focused-expression-wear.png";
    card.innerHTML = `
        <img class="foto" src="${urlFoto}" alt="Foto de ${aluno.nome}">
        <h3>${aluno.nome}</h3>
        <p>${aluno.turma}</p>
    `;

    card.onclick = () => mostrarDetalhes(aluno);
    lista.appendChild(card);
  });
}

// ... (Restante do código) ...

// Mostrar detalhes do aluno
function mostrarDetalhes(aluno) {
  // ⬇️ MESMA CORREÇÃO AQUI ⬇️
  const urlFoto = aluno.foto
    ? aluno.foto.fotos // <-- TROQUE 'url_da_foto' pelo nome da sua coluna de URL
    : "https://i.ibb.co/Lh0fxWFX/yearbook-photo-blue-textured-background-a-young-lightbrown-men-with-glasses-focused-expression-wear.png"; // <-- Coloque uma foto padrão

  detalhes.innerHTML = `
    <div class="detalhes-card">
        <h2>${a.nome}</h2>
        <img class="foto-detalhe" src="${urlFoto}" alt="Foto de ${a.nome}">
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
        <img class="foto-detalhe" src="${a.foto}" alt="Foto de ${a.nome}">
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
