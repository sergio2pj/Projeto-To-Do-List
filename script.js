let xpAtual = 0;
let level = 1;
let xpMaximo = 100;
const xpPorTarefa = 20;

const form = document.getElementById("form-tarefa");
const inputTarefa = document.getElementById("input-tarefa");
const lista = document.getElementById("lista-tarefas");
const barraProgresso = document.getElementById("barra-progresso-fill");
const subtitulo = document.getElementById("xp-texto");

const tarefas = [];

const salvarEstado = () => {
  localStorage.setItem("tarefas", JSON.stringify(tarefas));
  localStorage.setItem("xpAtual", xpAtual);
  localStorage.setItem("level", level);
  localStorage.setItem("xpMaximo", xpMaximo);
};

const subirNivel = () => {
  while (xpAtual > xpMaximo) {
    level += 1;
    xpAtual -= xpMaximo;
    xpMaximo += 50;
  }
};

const atualizarBarraProgresso = () => {
  if (xpAtual > xpMaximo) {
    subirNivel();
  }
  subtitulo.textContent = `Level ${level} • XP: ${xpAtual} / ${xpMaximo}`;
  barraProgresso.style.width = `${(xpAtual * 100) / xpMaximo}%`;
};
const criarTarefa = (texto, concluida = false) => {
  const tarefa = { texto, concluida };
  tarefas.push(tarefa);

  const item = document.createElement("li");
  item.classList.add("task-item");

  const span = document.createElement("span");
  span.textContent = texto;
  item.appendChild(span);

  const btn = document.createElement("button");
  btn.classList.add("btn-concluir");
  btn.textContent = "Concluir";
  if (concluida) item.classList.add("concluida");
  btn.disabled = concluida;
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    if (btn.disabled) return;
    xpAtual += xpPorTarefa;
    tarefa.concluida = true;
    btn.disabled = true;
    item.classList.add("concluida");
    atualizarBarraProgresso();
    salvarEstado();
  });
  item.appendChild(btn);
  lista.appendChild(item);
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  texto = inputTarefa.value;
  if (texto.trim() === "") return;
  criarTarefa(texto);
  salvarEstado();
  inputTarefa.value = "";
  inputTarefa.focus();
});

window.addEventListener("load", (e) => {
  e.preventDefault();
  const tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
  tarefas.forEach((tarefa) => criarTarefa(tarefa.texto, tarefa.concluida));
  xpAtual = Number(localStorage.getItem("xpAtual")) || 0;
  level = Number(localStorage.getItem("level")) || 1;
  xpMaximo = Number(localStorage.getItem("xpMaximo")) || 100;
  atualizarBarraProgresso();
});
