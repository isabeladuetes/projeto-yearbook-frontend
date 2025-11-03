const API = "./alunos.json";

const lista = document.getElementById("lista");
const detalhes = document.getElementById("detalhes");
const inputBuscar = document.getElementById("inputBuscar");
const btnBuscar = document.getElementById("btnBuscar");
const btnReset = document.getElementById("btnResetar");

let alunos = [];

async function carregaralunos() {
    try {
        const resposta = await fetch(API);
        const dados = await resposta.json();
        alunos = dados;
        mostrarLista(alunos);
    } catch (error) {
        console.error("Erro ao carregar alunos", error);
        lista.innerHTML = "<p> Erro ao carregar alunos. </p>"
    }
}

carregaralunos();

function mostrarLista(array) {
    lista.innerHTML = "";
    array.map((u) => {
        const div = document.createElement("div");
        div.textContent = u.name;
        div.className = "aluno";
        div.onclick = () => mostrarDetalhes(u);
        lista.appendChild(div);
    })
}

btnBuscar.onclick = () => {
    const termo = inputBuscar.value.toLowerCase();
    const filtrados = alunos.filter((u) => u.name.toLowerCase().includes(termo));
    mostrarLista(filtrados);
}

btnReset.onclick = () => {
    inputBuscar.value = "";
    mostrarLista(alunos);
}

function mostrarDetalhes(u) {
  // Recebe o usuário como parâmetro
  detalhes.innerHTML = `
    <h2>${u.name}</h2>
    <p>Email: ${u.email}</p>
    <p>Telefone: ${u.phone}</p>
    <button id="voltar">Voltar</button>
  `; // Define o conteúdo HTML dos detalhes do usuário
  // display é uma propriedade CSS que define como um elemento é exibido na página
  // none esconde o elemento da página
  lista.style.display = 'none'; // Esconde a lista de usuários
  inputBuscar.style.display = 'none'; // Esconde o input de busca
  btnBuscar.style.display = 'none'; // Esconde o botão buscar
  btnReset.style.display = 'none'; // Esconde o botão reset
  document.getElementById('voltar').onclick = voltar; // Adiciona o evento de clique ao botão voltar
}

function voltar() {
    detalhes.innerHTML = "";
    lista.style.display = "block";
    inputBuscar.style.display = "inline"
    btnBuscar.style.display = "inline"
    btnReset.style.display = "inline"
}