// Arquivo: funcionarios.js (Linhas 2 a 5)

// Antes: const lista = document.querySelector(".grade-funcionarios"); // OK após a correção do HTML
const inputBuscar = document.getElementById("inputBuscar");
const btnBuscar = document.getElementById("btnBuscar");
const btnReset = document.getElementById("btnResetar");
// Antes: const selectSetor = document.getElementById("selectSetor"); // ESTE ID NÃO EXISTE NO HTML
// Correção: Use o ID real que está no HTML
const selectSetor = document.getElementById("selectTurma"); // CORRIGIDO PARA selectTurma

let funcionarios = [];
// Função para buscar dados dos funcionários na API
async function buscarFuncionariosDaAPI() {
  lista.innerHTML = `<p>Carregando dados dos funcionários...</p>`;
  
  try {
    const resposta = await fetch("http://10.88.199.137:3001/funcionarios");

    if (!resposta.ok) {
      throw new Error(`Erro HTTP: ${resposta.status} - ${resposta.statusText}`);
    }

    const data = await resposta.json();
    funcionarios = data.funcionarios;  // Armazena os dados dos funcionários
    mostrarLista(funcionarios);
  } catch (error) {
    console.error("Erro ao buscar dados da API:", error);
    lista.innerHTML = `<p style="color: red;">❌ Erro ao carregar dados. Verifique o IP, a conexão com o servidor e o console.</p>`;
  }
}

// Função para exibir a lista de funcionários
function mostrarLista(array) {
  lista.innerHTML = "";

  if (array.length === 0) {
    lista.innerHTML = "<p>Nenhum funcionário encontrado.</p>";
    return;
  }

  array.forEach((funcionario) => {
    const card = document.createElement("div");
    card.className = "funcionario";

    // Verificando se o funcionário tem fotos e usando uma foto padrão se necessário
    const temFotos = funcionario.fotos && funcionario.fotos.length > 0;
    const urlFoto = temFotos
      ? funcionario.fotos[0].url
      : "https://i.ibb.co/8gkc15cn/foto-de-anurio-de-um-funcionrio-da-escola-o-indivduo-tem-entre-30-e-40-anos-a-foto-um-retrato-de-b-5.png";  // Foto padrão

    card.innerHTML = `
      <img class="foto" src="${urlFoto}" alt="Foto de ${funcionario.nome}">
      <h3>${funcionario.nome}</h3>
      <p>${funcionario.cargo}</p>
    `;

    // Ao clicar, exibe os detalhes do funcionário
    card.onclick = () => mostrarDetalhes(funcionario);
    lista.appendChild(card);
  });
}

// Função para mostrar os detalhes do funcionário
function mostrarDetalhes(funcionario) {
  const urlFoto = funcionario.fotos && funcionario.fotos.length > 0
    ? funcionario.fotos[0].url
    : "https://i.ibb.co/8gkc15cn/foto-de-anurio-de-um-funcionrio-da-escola-o-indivduo-tem-entre-30-e-40-anos-a-foto-um-retrato-de-b-5.png";

  const detalhes = document.createElement("div");
  detalhes.innerHTML = `
    <div class="detalhes-card">
        <h2>${funcionario.nome}</h2>
        <img class="foto-detalhe" src="${urlFoto}" alt="Foto de ${funcionario.nome}">
        <p><strong>Cargo:</strong> ${funcionario.cargo}</p>
        <p><strong>Email:</strong> ${funcionario.email}</p>
        <button id="voltar">Voltar</button>
    </div>
  `;

  document.body.appendChild(detalhes);
  
  document.getElementById("voltar").onclick = () => {
    detalhes.style.display = "none";
    lista.style.display = "grid";
  };
}

// Função de filtro
btnBuscar.onclick = () => filtrar();

btnReset.onclick = () => {
  inputBuscar.value = "";
  selectSetor.value = "todos";
  mostrarLista(funcionarios);
};

selectSetor.onchange = () => filtrar();

function filtrar() {
  const termo = inputBuscar.value.toLowerCase();
  const setorSelecionado = selectSetor.value;

  let filtrados = funcionarios.filter((f) => f.nome.toLowerCase().includes(termo));

  if (setorSelecionado !== "todos") {
    filtrados = filtrados.filter((f) => f.cargo === setorSelecionado);
  }

  mostrarLista(filtrados);
}

// Inicializa a aplicação buscando os dados da API
buscarFuncionariosDaAPI();
