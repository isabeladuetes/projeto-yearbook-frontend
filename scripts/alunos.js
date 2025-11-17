const lista = document.querySelector(".grade-alunos");
const inputBuscar = document.getElementById("inputBuscar");
const btnBuscar = document.getElementById("btnBuscar");
const btnReset = document.getElementById("btnResetar");
const selectTurma = document.getElementById("selectTurma");

let detalhes = document.createElement("div");
detalhes.id = "detalhes";
document.body.appendChild(detalhes);
detalhes.style.display = "none";

let alunos = [];

const IP_DO_BACKEND = "10.88.199.143";
const PORTA = 3001;
const URL_BASE_API = `http://${IP_DO_BACKEND}:${PORTA}`;

async function buscarAlunosDaAPI() {
  lista.innerHTML = `<p>Carregando dados dos alunos...</p>`;
  try {
    const resposta = await fetch(`${URL_BASE_API}/alunos`);

    if (!resposta.ok) {
      throw new Error(`Erro HTTP: ${resposta.status} - ${resposta.statusText}`);
    }

    const data = await resposta.json();
    console.log(data);

    if (!Array.isArray(data.alunos)) {

      console.error("Dados recebidos não são um array:", data);
      throw new Error("A API não retornou dados no formato de array.");
    }

    alunos = data.alunos;
    mostrarLista(alunos);

    mostrarLista(alunos);
  } catch (error) {
    console.error("Erro ao buscar alunos da API:", error);
    lista.innerHTML = `<p style="color: red;">❌ Erro ao carregar dados. Verifique o IP, a conexão com o servidor e o console.</p>`;
  }
}

function mostrarLista(array) {
  lista.innerHTML = "";

  if (array.length === 0) {
    lista.innerHTML = "<p>Nenhum aluno encontrado.</p>";
    return;
  }

  array.forEach((aluno) => {
    const card = document.createElement("div");
    card.className = "aluno";

    const temFotos = aluno.fotos && aluno.fotos.length > 0;

    const urlFoto = temFotos
      ? aluno.fotos[0].url
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

function mostrarDetalhes(aluno) {

  const urlFoto = aluno.foto
    ? aluno.foto.fotos
    : "https://i.ibb.co/Lh0fxWFX/yearbook-photo-blue-textured-background-a-young-lightbrown-men-with-glasses-focused-expression-wear.png";

  detalhes.innerHTML = `
    <div class="detalhes-card">
        <h2>${aluno.nome}</h2>
        <img class="foto-detalhe" src="${urlFoto}" alt="Foto de ${aluno.nome}">
        
        <button id="voltar">Voltar</button>
    </div>
  `;

  lista.style.display = "none";
  detalhes.style.display = "block";
  document.getElementById("voltar").onclick = voltar;
}

btnBuscar.onclick = () => {
  filtrar();
};

btnReset.onclick = () => {
  inputBuscar.value = "";
  selectTurma.value = "todos";
  mostrarLista(alunos);
};

selectTurma.onchange = () => {
  filtrar();
};

function filtrar() {
  const termo = inputBuscar.value.toLowerCase();

  let filtrados = alunos.filter((a) => a.nome.toLowerCase().includes(termo));

  mostrarLista(filtrados);
}

function mostrarDetalhes(aluno) {
  detalhes.innerHTML = `
    <div class="detalhes-card">
        <h2>${aluno.nome}</h2>
        <img class="foto-detalhe" src="${aluno.foto}" alt="Foto de ${aluno.nome}">
        <p><strong>Email:</strong> ${aluno.email}</p>
        <p><strong>Mensagem:</strong> ${aluno.mensagem}</p>
        <button id="voltar">Voltar</button>
    </div>
  `;

  lista.style.display = "none";
  detalhes.style.display = "block";
  document.getElementById("voltar").onclick = voltar;
}

function voltar() {
  detalhes.style.display = "none";
  lista.style.display = "grid";
}

buscarAlunosDaAPI();

window.addEventListener("resize", () => {
  document.body.style.minHeight = window.innerHeight + "px";
});

