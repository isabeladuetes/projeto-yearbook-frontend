// Arquivo: alunos.js

// 1. FUNÇÃO DE UTILIDADE PARA NORMALIZAÇÃO
function normalizarString(str) {
  if (!str) return "";
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

// 2. ACESSO AO DOM E VARIÁVEIS DE ESTADO
const mainElement = document.querySelector("main");
const lista = document.getElementById("lista");
const inputBuscar = document.getElementById("inputBuscar");
const btnBuscar = document.getElementById("btnBuscar");
const btnReset = document.getElementById("btnResetar");
const selectTurma = document.getElementById("selectTurma"); // Usado para filtro Feminino/Masculino

let alunos = [];
let htmlInicialMain = ""; // Variável para salvar o estado inicial (lista + filtros)

// Configuração da API e Foto Padrão
const IP_DO_BACKEND = "10.88.200.159";
const PORTA = 3001;
const URL_BASE_API = `http://${IP_DO_BACKEND}:${PORTA}`;
const FOTO_PADRAO =
  "https://i.ibb.co/Lh0fxWFX/yearbook-photo-blue-textured-background-a-young-lightbrown-men-with-glasses-focused-expression-wear.png";

// 3. FUNÇÃO DE RESTAURAÇÃO DE TELA
function restaurarLista() {
  mainElement.innerHTML = htmlInicialMain; // Reatribuir os listeners

  document.getElementById("btnBuscar").onclick = () => filtrar();
  document.getElementById("btnResetar").onclick = () => {
    document.getElementById("inputBuscar").value = "";
    document.getElementById("selectTurma").value = "todos";
    mostrarLista(alunos);
  };
  document.getElementById("selectTurma").onchange = () => filtrar();

  mostrarLista(alunos);
}

// 4. FUNÇÃO PARA BUSCAR DADOS DA API
async function buscarAlunosDaAPI() {
  if (htmlInicialMain === "") {
    htmlInicialMain = mainElement.innerHTML;
    const listaContainer = document.getElementById("lista");
    if (listaContainer) {
      listaContainer.innerHTML = `<p>Carregando dados dos alunos...</p>`;
    }
  }

  try {
    const resposta = await fetch(`${URL_BASE_API}/alunos`);

    if (!resposta.ok) {
      throw new Error(`Erro HTTP: ${resposta.status} - ${resposta.statusText}`);
    }

    const data = await resposta.json();

    if (!Array.isArray(data.alunos)) {
      console.error("Dados recebidos não são um array:", data);
      throw new Error("A API não retornou dados no formato de array.");
    }

    alunos = data.alunos;

    if (mainElement.querySelector("#lista")) {
      mostrarLista(alunos);
    }
  } catch (error) {
    console.error("Erro ao buscar alunos da API:", error);
    if (mainElement.querySelector("#lista")) {
      document.getElementById(
        "lista"
      ).innerHTML = `<p style="color: red;">❌ Erro ao carregar dados. Verifique o IP, a conexão com o servidor e o console.</p>`;
    }
  }
}

// 5. FUNÇÃO DE UTILIDADE PARA DETERMINAR O GÊNERO
function obterGenero(aluno) {
  if (aluno.matricula && typeof aluno.matricula === "string") {
    const matricula = aluno.matricula.trim().toUpperCase(); // Verifica se a string tem pelo menos 5 caracteres (2025 + M/F)

    if (matricula.length >= 5) {
      // A letra M ou F está no índice 4 (quinta posição)
      const generoLetra = matricula[4];

      if (generoLetra === "M") {
        return "Masculino";
      }
      if (generoLetra === "F") {
        return "Feminino";
      }
    }
  } // Retorna "Gênero N/A" se a matricula não estiver no formato esperado
  return "Gênero N/A";
}

// 5.5. FUNÇÃO DE UTILIDADE PARA OBTER O TEXTO DA MENSAGEM (CORRIGIDA PARA CAMPO 'conteudo')
function obterMensagemTexto(aluno) {
  const mensagensArray = aluno.mensagens;

  // Verifica se mensagens é um array e se tem pelo menos um item
  if (
    mensagensArray &&
    Array.isArray(mensagensArray) &&
    mensagensArray.length > 0
  ) {
    // AGORA BUSCA NA PROPRIEDADE 'conteudo'
    return (
      mensagensArray[0].conteudo || "Mensagem encontrada, mas conteúdo vazio."
    );
  }

  // Retorna a mensagem padrão se o array estiver ausente ou vazio.
  return "Mensagem indisponível.";
}

// 6. FUNÇÃO PARA EXIBIR A LISTA
function mostrarLista(array) {
  const listaContainer = document.getElementById("lista");
  if (!listaContainer) return;

  listaContainer.innerHTML = "";

  if (array.length === 0) {
    listaContainer.innerHTML = "<p>Nenhum aluno encontrado.</p>";
    return;
  }

  array.forEach((aluno) => {
    const card = document.createElement("div");
    card.className = "aluno";
    const temFotos = aluno.fotos && aluno.fotos.length > 0;
    const urlFoto = temFotos ? aluno.fotos[0].url : FOTO_PADRAO; // Determina o texto do gênero/matricula
    const genero = obterGenero(aluno);

    card.innerHTML = `
            <img class="foto" src="${urlFoto}" alt="Foto de ${aluno.nome}">
            <h3>${aluno.nome}</h3>
            <p>${genero}</p> 
        `;

    card.onclick = () => mostrarDetalhes(aluno);
    listaContainer.appendChild(card);
  });
}

// 7. FUNÇÃO PARA MOSTRAR DETALHES (USA A FUNÇÃO CORRIGIDA)
function mostrarDetalhes(aluno) {
  const temFotos = aluno.fotos && aluno.fotos.length > 0;
  const urlFoto = temFotos ? aluno.fotos[0].url : FOTO_PADRAO;
  const genero = obterGenero(aluno);

  // Puxa o texto da primeira mensagem do array 'mensagens' usando o campo 'conteudo'
  const mensagemTexto = obterMensagemTexto(aluno);

  const detalhesHTML = `
        <div id="detalhesFuncionario" class="detalhes-card">
            <h2>${aluno.nome}</h2>
            <img class="foto-detalhe" src="${urlFoto}" alt="Foto de ${
    aluno.nome
  }">
            <p><strong>Gênero:</strong> ${genero}</p>
            <p><strong>Matrícula:</strong> ${aluno.matricula || "N/A"}</p>
            <p><strong>Email:</strong> ${aluno.email || "N/A"}</p>
            <p><strong>Mensagem:</strong> ${mensagemTexto}</p>
            <button id="voltar">Voltar à Lista</button>
        </div>
    `;

  mainElement.innerHTML = detalhesHTML;

  document.getElementById("voltar").onclick = () => {
    restaurarLista();
  };
}

// 8. FUNÇÃO DE FILTRAGEM
function filtrar() {
  const termoNome = normalizarString(inputBuscar.value);
  const generoSelecionado = selectTurma.value; // 'todos', 'Feminino', 'Masculino'

  let filtrados = alunos.filter((aluno) => {
    const nomeNormalizado = normalizarString(aluno.nome); // 1. Filtro por nome

    const passaNoNome = nomeNormalizado.includes(termoNome); // 2. Filtro por Gênero

    if (generoSelecionado === "todos") {
      return passaNoNome;
    } else {
      const generoAluno = obterGenero(aluno);
      const passaNoGenero = generoAluno === generoSelecionado;

      return passaNoNome && passaNoGenero;
    }
  });

  mostrarLista(filtrados);
}

// 9. LISTENERS INICIAIS
btnBuscar.onclick = () => filtrar();
btnReset.onclick = () => {
  inputBuscar.value = "";
  selectTurma.value = "todos";
  mostrarLista(alunos);
};
selectTurma.onchange = () => filtrar();

// 10. INICIALIZAÇÃO
buscarAlunosDaAPI();
