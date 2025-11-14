// Elementos do DOM
const lista = document.getElementById("lista");
const detalhes = document.getElementById("detalhes");
const inputBuscar = document.getElementById("inputBuscar");
const btnBuscar = document.getElementById("btnBuscar");
const btnReset = document.getElementById("btnResetar");

// Dados locais — região de Valinhos e Vinhedo (SP)
let pessoas = [
  // ---- Professores ----
  { id: 1, name: "Maria Silva", cargo: "Professora", email: "maria.silva@escola.com", phone: "19 99876-1234", address: { city: "Valinhos" } },
  { id: 2, name: "João Pereira", cargo: "Professor", email: "joao.pereira@escola.com", phone: "19 98765-4321", address: { city: "Vinhedo" } },
  { id: 3, name: "Ana Costa", cargo: "Professora", email: "ana.costa@escola.com", phone: "19 91234-5678", address: { city: "Campinas" } },
  { id: 4, name: "Carlos Mendes", cargo: "Professor", email: "carlos.mendes@escola.com", phone: "19 99888-7777", address: { city: "Louveira" } },
  { id: 5, name: "Fernanda Lima", cargo: "Professora", email: "fernanda.lima@escola.com", phone: "19 99999-1111", address: { city: "Itatiba" } },
  { id: 6, name: "Rafael Duarte", cargo: "Professor", email: "rafael.duarte@escola.com", phone: "19 98877-2222", address: { city: "Jundiaí" } },
  { id: 7, name: "Juliana Castro", cargo: "Professora", email: "juliana.castro@escola.com", phone: "19 99777-3333", address: { city: "Vinhedo" } },
  { id: 8, name: "Eduardo Rocha", cargo: "Professor", email: "eduardo.rocha@escola.com", phone: "19 99666-4444", address: { city: "Valinhos" } },
  { id: 9, name: "Patrícia Almeida", cargo: "Professora", email: "patricia.almeida@escola.com", phone: "19 99555-5555", address: { city: "Campinas" } },
  { id: 10, name: "Marcelo Gomes", cargo: "Professor", email: "marcelo.gomes@escola.com", phone: "19 99444-6666", address: { city: "Itatiba" } },

  // ---- Coordenadores ----
  { id: 11, name: "Luciana Ribeiro", cargo: "Coordenadora", email: "luciana.ribeiro@escola.com", phone: "19 99333-7777", address: { city: "Valinhos" } },
  { id: 12, name: "Roberto Tavares", cargo: "Coordenador", email: "roberto.tavares@escola.com", phone: "19 99222-8888", address: { city: "Vinhedo" } },
  { id: 13, name: "Tatiane Lopes", cargo: "Coordenadora", email: "tatiane.lopes@escola.com", phone: "19 99111-9999", address: { city: "Campinas" } },
  { id: 14, name: "Henrique Martins", cargo: "Coordenador", email: "henrique.martins@escola.com", phone: "19 99000-1010", address: { city: "Jundiaí" } },
  { id: 15, name: "Sônia Pires", cargo: "Coordenadora", email: "sonia.pires@escola.com", phone: "19 98989-2020", address: { city: "Itatiba" } },

  // ---- Diretores ----
  { id: 16, name: "Cláudio Nascimento", cargo: "Diretor", email: "claudio.nascimento@escola.com", phone: "19 98888-3030", address: { city: "Valinhos" } },
  { id: 17, name: "Helena Barbosa", cargo: "Diretora", email: "helena.barbosa@escola.com", phone: "19 98787-4040", address: { city: "Vinhedo" } },
];

// Exibir lista inicial
mostrarLista(pessoas);

// Mostrar lista (agora só o nome)
function mostrarLista(array) {
  lista.innerHTML = "";

  if (array.length === 0) {
    lista.innerHTML = "<p>Nenhum registro encontrado.</p>";
    return;
  }

  array.forEach((pessoa) => {
    const div = document.createElement("div");
    div.textContent = pessoa.name; // 👈 apenas o nome
    div.className = "professor";
    div.onclick = () => mostrarDetalhes(pessoa);
    lista.appendChild(div);
  });
}

// Buscar por nome
btnBuscar.onclick = () => {
  const termo = inputBuscar.value.toLowerCase();
  const filtrados = pessoas.filter((p) =>
    p.name.toLowerCase().includes(termo)
  );
  mostrarLista(filtrados);
};

// Resetar busca
btnReset.onclick = () => {
  inputBuscar.value = "";
  mostrarLista(pessoas);
};

// Mostrar detalhes ao clicar
function mostrarDetalhes(pessoa) {
  detalhes.innerHTML = `
    <h2>${pessoa.name}</h2>
    <p><strong>Cargo:</strong> ${pessoa.cargo}</p>
    <p><strong>Email:</strong> ${pessoa.email}</p>
    <p><strong>Telefone:</strong> ${pessoa.phone}</p>
    <p><strong>Cidade:</strong> ${pessoa.address.city}</p>
    <button id="voltar">Voltar</button>
  `;

  lista.style.display = "none";
  inputBuscar.style.display = "none";
  btnBuscar.style.display = "none";
  btnReset.style.display = "none";

  document.getElementById("voltar").onclick = voltar;
}

// Voltar à lista
function voltar() {
  detalhes.innerHTML = "";
  lista.style.display = "block";
  inputBuscar.style.display = "inline";
  btnBuscar.style.display = "inline";
  btnReset.style.display = "inline";
}
