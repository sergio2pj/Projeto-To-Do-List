// Configurações Iniciais
let xpAtual = 0;
const xpMaximo = 100;
const xpPorTarefa = 20;

// Captura de Elementos
const form = document.getElementById("form-tarefa");
const inputTarefa = document.getElementById("input-tarefa");
const lista = document.getElementById("lista-tarefas");
const barraProgresso = document.getElementById("barra-progresso-fill");
const subtitulo = document.getElementById("xp-texto");

function atualizarBarraProgresso() {
  xpAtual = Math.min(xpAtual, xpMaximo);
  subtitulo.textContent = `XP: ${xpAtual} / ${xpMaximo}`;
  let porcentagem = (xpAtual / xpMaximo) * 100;
  barraProgresso.style.width = `${porcentagem}%`;
}

function criarTarefa(texto) {
  const item = document.createElement("li");
  item.classList.add("task-item");
  item.textContent = texto;

  const btnConcluir = document.createElement("button");
  btnConcluir.textContent = "Concluir";
  btnConcluir.classList.add("btn-concluir");
  btnConcluir.addEventListener("click", function () {
    btnConcluir.disabled = true;
    item.classList.add("concluida");
    xpAtual += xpPorTarefa;
    atualizarBarraProgresso();
  });

  item.appendChild(btnConcluir);
  lista.appendChild(item);
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const texto = inputTarefa.value;

  // Bloqueia tarefas vazias
  if (texto.trim() === "") return;

  criarTarefa(texto);
  inputTarefa.value = "";
  inputTarefa.focus();
});
