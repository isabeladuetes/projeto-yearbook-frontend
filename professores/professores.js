// Dados locais (sem API externa)
const dados = [
  { "id": 1, "name": "Juliana Ramos", "email": "juliana.ramos@brightminds.com", "phone": "52 98122-3344", "materia": "português", "idade": 29 },
  { "id": 2, "name": "Carlos Nogueira", "email": "carlos.nogueira@brightminds.com", "phone": "52 98765-1122", "materia": "história", "idade": 41 },
  { "id": 3, "name": "Amanda Freitas", "email": "amanda.freitas@brightminds.com", "phone": "52 98214-7789", "materia": "geografia", "idade": 33 },
  { "id": 4, "name": "Marcos Tavares", "email": "marcos.tavares@brightminds.com", "phone": "52 98477-6655", "materia": "ciências", "idade": 36 },
  { "id": 5, "name": "Renata Oliveira", "email": "renata.oliveira@brightminds.com", "phone": "52 98653-2299", "materia": "inglês", "idade": 30 },
  { "id": 6, "name": "Thiago Martins", "email": "thiago.martins@brightminds.com", "phone": "52 98844-9077", "materia": "educação física", "idade": 35 },
  { "id": 7, "name": "Fernanda Lopes", "email": "fernanda.lopes@brightminds.com", "phone": "52 98119-4477", "materia": "artes", "idade": 28 },
  { "id": 8, "name": "Gabriel Souza", "email": "gabriel.souza@brightminds.com", "phone": "52 98900-5544", "materia": "física", "idade": 40 },
  { "id": 9, "name": "Patrícia Moreira", "email": "patricia.moreira@brightminds.com", "phone": "52 98334-6678", "materia": "química", "idade": 32 },
  { "id": 10, "name": "Eduardo Lima", "email": "eduardo.lima@brightminds.com", "phone": "52 98211-5533", "materia": "matemática", "idade": 37 },
  { "id": 11, "name": "Luciana Prado", "email": "luciana.prado@brightminds.com", "phone": "52 98100-1122", "cargo": "diretora pedagógica", "idade": 45 },
  { "id": 12, "name": "Roberto Almeida", "email": "roberto.almeida@brightminds.com", "phone": "52 98777-3344", "cargo": "coordenador de ensino médio", "idade": 42 },
  { "id": 13, "name": "Simone Ferreira", "email": "simone.ferreira@brightminds.com", "phone": "52 98666-4455", "cargo": "coordenadora de ensino fundamental", "idade": 39 },
  { "id": 14, "name": "Daniel Costa", "email": "daniel.costa@brightminds.com", "phone": "52 98999-7788", "cargo": "diretor administrativo", "idade": 47 },
  { "id": 15, "name": "Tatiana Rocha", "email": "tatiana.rocha@brightminds.com", "phone": "52 98221-8899", "cargo": "coordenadora geral", "idade": 43 }
];

// Elementos HTML
const lista = document.getElementById("lista");
const detalhes = document.getElementById("detalhes");
const inputBuscar = document.getElementById("inputBuscar");
const btnBuscar = document.getElementById("btnBuscar");
const btnReset = document.getElementById("btnReset");

let usuarios = dados; // Já começa com os dados locais

mostrarLista(usuarios);

// Mostra a lista
function mostrarLista(array) {
  lista.innerHTML = "";
  array.map((u) => {
    const div = document.createElement("div");
    div.textContent = u.name;
    div.className = "usuario";
    div.onclick = () => mostrarDetalhes(u);
    lista.appendChild(div);
  });
}

// Buscar por nome
btnBuscar.onclick = () => {
  const termo = inputBuscar.value.toLowerCase();
  const filtrados = usuarios.filter((u) => u.name.toLowerCase().includes(termo));
  mostrarLista(filtrados);
};

// Resetar busca
btnReset.onclick = () => {
  inputBuscar.value = "";
  mostrarLista(usuarios);
};

// Mostrar detalhes do usuário
function mostrarDetalhes(u) {
  detalhes.innerHTML = `
    <h2>${u.name}</h2>
    <p>Email: ${u.email}</p>
    <p>Telefone: ${u.phone}</p>
    <p>${u.materia ? `Matéria: ${u.materia}` : `Cargo: ${u.cargo}`}</p>
    <p>Idade: ${u.idade} anos</p>
    <button id="voltar">Voltar</button>
  `;
  lista.style.display = 'none';
  inputBuscar.style.display = 'none';
  btnBuscar.style.display = 'none';
  btnReset.style.display = 'none';
  document.getElementById('voltar').onclick = voltar;
}

// Voltar à lista
function voltar() {
  detalhes.innerHTML = "";
  lista.style.display = "block";
  inputBuscar.style.display = "inline";
  btnBuscar.style.display = "inline";
  btnReset.style.display = "inline";
}
