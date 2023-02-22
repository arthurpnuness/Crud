let loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
let welcomeUser = document.querySelector("#welcomeUser");
document.querySelector("#logout").addEventListener("click", logoutUser);
const modal = document.querySelector(".modal-container");
const tbody = document.querySelector("tbody");
const saveTitulo = document.querySelector("#m-titulo");
const saveMensagem = document.querySelector("#m-mensagem");
const btnSalvar = document.querySelector("#btnSalvar");

if (localStorage.getItem("token") == null) {
  alert("Realize o login para acessar a página!");
  document.querySelector("#hideall").style.visibility = "hidden";
  setTimeout(function () {
    window.location.href = "../index.html";
  }, 2000);
}
welcomeUser.innerHTML = `Olá, ${loggedUser.nome}!`;

function logoutUser() {
  localStorage.removeItem("token");
  localStorage.removeItem("loggedUser");
  window.location.href = "../index.html";
}

let itens;
let id;

function openModal(edit = false, index = 0) {
  modal.classList.add("active");

  modal.onclick = (e) => {
    if (e.target.className.indexOf("modal-container") !== -1) {
      modal.classList.remove("active");
    }
  };

  if (edit) {
    saveTitulo.value = itens[index].titulo;
    saveMensagem.value = itens[index].mensagem;

    id = index;
  } else {
    saveTitulo.value = "";
    saveMensagem.value = "";
  }
}

function editItem(index) {
  openModal(true, index);
}

function deleteItem(index) {
  itens.splice(index, 1);
  setItensBD();
  loadItens();
}

function insertItem(item, index) {
  let tr = document.createElement("tr");

  tr.innerHTML = `
    <td>${item.titulo}</td>
    <td>${item.mensagem}</td>
    <td class="acao">
      <button onclick="editItem(${index})"><i class='bx bx-edit' ></i></button>
    </td>
    <td class="acao">
      <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
    </td>
  `;
  tbody.appendChild(tr);
}

btnSalvar.onclick = (e) => {
  if (saveTitulo.value == "" || saveMensagem.value == "") {
    return;
  }

  e.preventDefault();

  if (id !== undefined) {
    itens[id].titulo = saveTitulo.value;
    itens[id].mensagem = saveMensagem.value;
  } else {
    itens.push({ titulo: saveTitulo.value, mensagem: saveMensagem.value });
  }

  setItensBD();

  modal.classList.remove("active");
  loadItens();
  id = undefined;
};

function loadItens() {
  itens = getItensBD();
  tbody.innerHTML = "";
  itens.forEach((item, index) => {
    insertItem(item, index);
  });
}

const getItensBD = () => JSON.parse(localStorage.getItem("dbfunc")) ?? [];
const setItensBD = () => localStorage.setItem("dbfunc", JSON.stringify(itens));

loadItens();
