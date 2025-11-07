const lista = document.getElementById("lista");
const detalhes = document.getElementById("detalhes");
const inputBuscar = document.getElementById("inputBuscar");
const btnBuscar = document.getElementById("btnBuscar");
const btnReset = document.getElementById("btnResetar");

// Função auxiliar para gerar e-mails e idades
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

// Lista de nomes simulados
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

// Sobrenomes variados
const sobrenomes = [
  "Silva", "Souza", "Oliveira", "Pereira", "Costa", "Santos", "Rodrigues", "Almeida", "Lima", "Gomes",
  "Azevedo", "Barbosa", "Fernandes", "Martins", "Rocha", "Carvalho", "Teixeira", "Dias", "Freitas", "Melo"
];

// Gera os 100 alunos
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

// Exibe lista
mostrarLista(alunos);

function mostrarLista(array) {
  lista.innerHTML = "";

  if (array.length === 0) {
    lista.innerHTML = "<p>Nenhum aluno encontrado.</p>";
    return;
  }

  array.forEach((aluno) => {
    const div = document.createElement("div");
    div.textContent = aluno.nome; // só o nome
    div.className = "aluno";
    div.onclick = () => mostrarDetalhes(aluno);
    lista.appendChild(div);
  });
}

// Buscar por nome
btnBuscar.onclick = () => {
  const termo = inputBuscar.value.toLowerCase();
  const filtrados = alunos.filter((a) => a.nome.toLowerCase().includes(termo));
  mostrarLista(filtrados);
};

// Resetar
btnReset.onclick = () => {
  inputBuscar.value = "";
  mostrarLista(alunos);
};

// Detalhes
function mostrarDetalhes(a) {
  detalhes.innerHTML = `
    <h2>${a.nome}</h2>
    <p><strong>Ano:</strong> ${a.ano}</p>
    <p><strong>Idade:</strong> ${a.idade} anos</p>
    <p><strong>Email:</strong> ${a.email}</p>
    <p><strong>Turma:</strong> ${a.turma}</p>
    <button id="voltar">Voltar</button>
  `;

  lista.style.display = "none";
  inputBuscar.style.display = "none";
  btnBuscar.style.display = "none";
  btnReset.style.display = "none";

  document.getElementById("voltar").onclick = voltar;
}

function voltar() {
  detalhes.innerHTML = "";
  lista.style.display = "block";
  inputBuscar.style.display = "inline";
  btnBuscar.style.display = "inline";
  btnReset.style.display = "inline";
}