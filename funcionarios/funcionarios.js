const funcionarios = [
    { nome: "Ana Paula", cargo: "Professor", email: "ana.paula@escola.com" },
    { nome: "Carlos Souza", cargo: "Coordenador", email: "carlos.souza@escola.com" },
    { nome: "Fernanda Lima", cargo: "Professor", email: "fernanda.lima@escola.com" },
    { nome: "João Ribeiro", cargo: "Diretor", email: "joao.ribeiro@escola.com" },
    { nome: "Mariana Santos", cargo: "Professor", email: "mariana.santos@escola.com" },
    { nome: "Ricardo Alves", cargo: "Coordenador", email: "ricardo.alves@escola.com" }
];

const lista = document.getElementById("lista");
const inputBuscar = document.getElementById("inputBuscar");
const selectCargo = document.getElementById("selectCargo");
const btnBuscar = document.getElementById("btnBuscar");
const btnResetar = document.getElementById("btnResetar");

function exibirFuncionarios(filtroLista) {
    lista.innerHTML = "";

    filtroLista.forEach(func => {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <h3>${func.nome}</h3>
            <p><strong>Cargo:</strong> ${func.cargo}</p>
            <p><strong>Email:</strong> ${func.email}</p>
        `;

        lista.appendChild(card);
    });
}

function filtrar() {
    const texto = inputBuscar.value.toLowerCase();
    const cargoSelecionado = selectCargo.value;

    const filtrados = funcionarios.filter(func => {
        const matchNome = func.nome.toLowerCase().includes(texto);
        const matchCargo = cargoSelecionado === "todos" || func.cargo === cargoSelecionado;
        return matchNome && matchCargo;
    });

    exibirFuncionarios(filtrados);
}

btnBuscar.addEventListener("click", filtrar);
btnResetar.addEventListener("click", () => {
    inputBuscar.value = "";
    selectCargo.value = "todos";
    exibirFuncionarios(funcionarios);
});

// Exibir ao abrir a página
exibirFuncionarios(funcionarios);
