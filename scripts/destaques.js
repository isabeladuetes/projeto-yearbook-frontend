const modal = document.getElementById("modal");
const modalNome = document.getElementById("modal-nome");
const modalMedalha = document.getElementById("modal-medalha");
const modalNota = document.getElementById("modal-nota");
const modalDesc = document.getElementById("modal-desc");
const closeBtn = document.querySelector(".close");

document.querySelectorAll(".award-card").forEach(card => {
  card.addEventListener("click", () => {
    modalNome.textContent = card.dataset.nome;
    modalMedalha.textContent = card.dataset.medalha;
    modalNota.textContent = card.dataset.nota;
    modalDesc.textContent = card.dataset.desc;

    modal.style.display = "flex";
  });
});

closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", e => {
  if (e.target === modal) modal.style.display = "none";
});
