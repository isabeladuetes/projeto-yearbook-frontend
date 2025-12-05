
function normalizarString(str) {
  if (!str) return '';
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}


const mainElement = document.querySelector("main");
const lista = document.getElementById("lista"); 
const inputBuscar = document.getElementById("inputBuscar");
const btnBuscar = document.getElementById("btnBuscar");
const btnReset = document.getElementById("btnResetar");
const selectSetor = document.getElementById("selectTurma"); 

let funcionarios = [];
let htmlInicialMain = ""; 

const FOTO_PADRAO = "https://i.ibb.co/8gkc15cn/foto-de-anurio-de-um-funcionrio-da-escola-o-indivduo-tem-entre-30-e-40-anos-a-foto-um-retrato-de-b-5.png"; 

//  FUNÇÃO DE RESTAURAÇÃO DE TELA
function restaurarLista() {
  // Restaura o HTML de filtros e lista
  mainElement.innerHTML = htmlInicialMain;
  
  // É essencial reatribuir os listeners após reescrever o DOM
  document.getElementById("btnBuscar").onclick = () => filtrar();
  document.getElementById("btnResetar").onclick = () => {
      document.getElementById("inputBuscar").value = "";
      document.getElementById("selectTurma").value = "todos";
      mostrarLista(funcionarios);
  };
  document.getElementById("selectTurma").onchange = () => filtrar();
  
  // Repopula o grid com os dados atuais
  mostrarLista(funcionarios);
}

// FUNÇÃO PARA BUSCAR DADOS DA API
async function buscarFuncionariosDaAPI() {
  // Salva o HTML inicial do <main> na primeira execução
  if (htmlInicialMain === "") {
      htmlInicialMain = mainElement.innerHTML;
      lista.innerHTML = `<p>Carregando dados dos funcionários...</p>`;
  }
  
  try {
      const resposta = await fetch("http://10.88.200.163:3001/funcionarios");

      if (!resposta.ok) {
          throw new Error(`Erro HTTP: ${resposta.status} - ${resposta.statusText}`);
      }

      const data = await resposta.json();
      funcionarios = data.funcionarios || [];
      
      // Se a lista estiver na tela, mostra os dados
      if (mainElement.querySelector('#lista')) {
           mostrarLista(funcionarios);
      }
     
  } catch (error) {
      console.error("Erro ao buscar dados da API:", error);
      if (mainElement.querySelector('#lista')) {
          lista.innerHTML = `<p style="color: red;">❌ Erro ao carregar dados. Verifique o IP, a conexão com o servidor e o console.</p>`;
      }
  }
}

// 5. FUNÇÃO PARA EXIBIR A LISTA
function mostrarLista(array) {
  const listaContainer = document.getElementById("lista");
  if (!listaContainer) return;

  listaContainer.innerHTML = "";
  
  if (array.length === 0) {
      listaContainer.innerHTML = "<p>Nenhum funcionário encontrado.</p>";
      return;
  }

  array.forEach((funcionario) => {
      const card = document.createElement("div");
      card.className = "funcionario";
      const urlFoto = (funcionario.fotos && funcionario.fotos.length > 0) ? funcionario.fotos[0].url : FOTO_PADRAO;

      card.innerHTML = `
          <img class="foto" src="${urlFoto}" alt="Foto de ${funcionario.nome}">
          <h3>${funcionario.nome}</h3>
          <p>${funcionario.cargo}</p>
      `;

      card.onclick = () => mostrarDetalhes(funcionario);
      listaContainer.appendChild(card);
  });
}

// 6. FUNÇÃO PARA MOSTRAR DETALHES (Oculta a lista)
function mostrarDetalhes(funcionario) {
  const urlFoto = (funcionario.fotos && funcionario.fotos.length > 0)
      ? funcionario.fotos[0].url
      : FOTO_PADRAO;

  const detalhesHTML = `
      <div id="detalhesFuncionario" class="detalhes-card">
          <h2>${funcionario.nome}</h2>
          <img class="foto-detalhe" src="${urlFoto}" alt="Foto de ${funcionario.nome}">
          <p><strong>Cargo:</strong> ${funcionario.cargo}</p>
          <p><strong>Email:</strong> ${funcionario.email}</p>
          <button id="voltar">Voltar à Lista</button>
      </div>
  `;

  // Substitui todo o conteúdo do <main>
  mainElement.innerHTML = detalhesHTML;
  
  // Atribui o evento "Voltar"
  document.getElementById("voltar").onclick = () => {
      restaurarLista(); 
  };
}


// FUNÇÃO DE FILTRAGEM (CORRIGIDA)
function filtrar() {

  const termoNormalizado = normalizarString(inputBuscar.value);
  const setorSelecionado = selectSetor.value; // 'todos', 'Professor', 'coordenador', 'Diretor'

  let filtrados = funcionarios.filter((f) => {
      // Normaliza o nome do funcionário para comparação
      const nomeNormalizado = normalizarString(f.nome);
      
      // 1. Filtro por nome: O nome deve incluir o termo digitado
      const passaNoNome = nomeNormalizado.includes(termoNormalizado);

      if (setorSelecionado === "todos") {
          return passaNoNome;
      } else {
          // 2. Filtro por setor: O cargo deve INCLUIR o valor selecionado
          const cargoNormalizado = normalizarString(f.cargo);
          const setorNormalizado = normalizarString(setorSelecionado);

          const passaNoSetor = cargoNormalizado.includes(setorNormalizado);

          // Retorna apenas se passar no nome E passar no setor
          return passaNoNome && passaNoSetor; 
      }
  });

  mostrarLista(filtrados);
}

// LISTENERS INICIAIS
btnBuscar.onclick = () => filtrar();
btnReset.onclick = () => {
  inputBuscar.value = "";
  selectSetor.value = "todos";
  mostrarLista(funcionarios);
};
selectSetor.onchange = () => filtrar();

// INICIALIZAÇÃO
buscarFuncionariosDaAPI();