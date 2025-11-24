const cards = document.querySelectorAll(".award-card");
const modal = document.getElementById("modal");
const closeBtn = document.querySelector(".close");

const modalNome = document.getElementById("modal-nome");
const modalNota = document.getElementById("modal-nota");
const modalDesc = document.getElementById("modal-desc");
const modalMedalha = document.getElementById("modal-medalha");

cards.forEach(card => {
  card.addEventListener("click", () => {
    modalNome.textContent = card.dataset.nome;
    modalNota.textContent = card.dataset.nota;
    modalDesc.textContent = card.dataset.desc;
    modalMedalha.textContent = card.dataset.medalha;

    modal.style.display = "flex";
  });
});

closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target === modal) modal.style.display = "none";
});
