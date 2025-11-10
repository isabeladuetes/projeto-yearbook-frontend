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

// Funções auxiliares
function gerarEmail(nome) {
  return nome.toLowerCase().replaceAll(" ", ".") + "@escola.com";
}

function idadeAleatoria() {
  return Math.floor(Math.random() * 3) + 17; // 17 a 19
}

function turmaAleatoria() {
  const turmas = ["3º A", "3º B", "3º C", "3º D"];
  return turmas[Math.floor(Math.random() * turmas.length)];
}

// Dados base
const nomesBase = [
  "Ana", "Beatriz", "Bruno", "Camila", "Carlos", "Clara", "Daniel", "Diego", "Eduarda", "Enzo",
  "Fernanda", "Felipe", "Gabriela", "Gustavo", "Helena", "Isabela", "João", "Juliana", "Lucas", "Larissa",
  "Marcelo", "Mariana", "Nicolas", "Natália", "Otávio", "Paula", "Pedro", "Patrícia", "Rafael", "Raquel",
  "Sofia", "Samuel", "Tiago", "Tatiane", "Victor", "Vanessa", "William", "Yasmin", "Luiza", "Mateus",
  "Bianca", "Caio", "Cláudia", "Davi", "Elisa", "Flávia", "Heitor", "Igor", "Joana", "Karen",
  "Leonardo", "Letícia", "Marta", "Murilo", "Natanael", "Olívia", "Pietro", "Rafaela", "Sabrina", "Thiago",
  "Vinícius", "Valéria", "Wesley", "André", "Alice", "Amanda", "Arthur", "Breno", "Carla", "Cecília",
  "Danilo", "Débora", "Eduardo", "Elaine", "Felipe", "Fabiana", "Giovanna", "Henrique", "Ingrid", "Isaque",
  "Jonas", "Kelly", "Leandro", "Lívia", "Matheus", "Nicole", "Paulo", "Rebeca", "Renan", "Simone",
  "Tatiana", "Ursula", "Vitor", "Wellington", "Yago", "Zuleica", "Anderson", "Julio", "Rosana", "Tânia"
];

const sobrenomes = [
  "Silva", "Souza", "Oliveira", "Pereira", "Costa", "Santos", "Rodrigues", "Almeida", "Lima", "Gomes",
  "Azevedo", "Barbosa", "Fernandes", "Martins", "Rocha", "Carvalho", "Teixeira", "Dias", "Freitas", "Melo"
];

// Cria os alunos simulados
let alunos = [];
for (let i = 0; i < 100; i++) {
  const nome = `${nomesBase[i]} ${sobrenomes[Math.floor(Math.random() * sobrenomes.length)]}`;
  alunos.push({
    id: i + 1,
    nome,
    ano: "3º Ano",
    idade: idadeAleatoria(),
    email: gerarEmail(nome),
    turma: turmaAleatoria(),
  });
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
    card.className = "aluno";

    // Card do aluno (sem imagem por enquanto)
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
  selectTurma.value = "todos";
  mostrarLista(alunos);
};

// Filtro por turma
selectTurma.onchange = () => {
  filtrar();
};

// Função combinada de filtro (nome + turma)
function filtrar() {
  const termo = inputBuscar.value.toLowerCase();
  const turmaSelecionada = selectTurma.value;

  let filtrados = alunos.filter((a) =>
    a.nome.toLowerCase().includes(termo)
  );

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

// Inicializa
mostrarLista(alunos);

// Garante que o footer fique fixo ao final
window.addEventListener("resize", () => {
  document.body.style.minHeight = window.innerHeight + "px";
});
