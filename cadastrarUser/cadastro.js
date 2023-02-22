let btnSenha = document.querySelector("#peekPass");
btnSenha.addEventListener("click", () => {
  let inputSenha = document.querySelector("#password");

  if (inputSenha.getAttribute("type") === "password") {
    inputSenha.setAttribute("type", "text");
  } else {
    inputSenha.setAttribute("type", "password");
  }
});

let btnSenha2 = document.querySelector("#peekPass2");
btnSenha2.addEventListener("click", () => {
  let inputSenha2 = document.querySelector("#password2");

  if (inputSenha2.getAttribute("type") === "password") {
    inputSenha2.setAttribute("type", "text");
  } else {
    inputSenha2.setAttribute("type", "password");
  }
});

document.querySelector("#btn_cadastro").addEventListener("click", cadastroUser);

username.addEventListener("keyup", () => {
  if (username.value.length <= 4) {
    labelUserName.setAttribute("style", "color: #ff715b");
  } else {
    labelUserName.setAttribute("style", "color: #7f73a1");
  }
});

password.addEventListener("keyup", () => {
  if (password.value.length <= 5) {
    labelPassword.setAttribute("style", "color: #ff715b");
  } else {
    labelPassword.setAttribute("style", "color: #7f73a1");
  }
});

password2.addEventListener("keyup", () => {
  if (password2.value !== password.value) {
    labelPassword2.setAttribute("style", "color: #ff715b");
    labelPassword2.innerHTML = "Senhas não combinam";
  } else {
    labelPassword2.setAttribute("style", "color: #7f73a1");
    labelPassword2.innerHTML = "Senhas combinam!";
  }
});

function cadastroUser(event) {
  event.preventDefault();

  const usuarioInput = document.getElementById("username");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const password2Input = document.getElementById("password2");
  let labelUserName = document.querySelector("#labelUserName");

  if (passwordInput.value <= 5) {
    labelPassword.setAttribute("style", "color: #ff715b");
  }
  if (usuarioInput.value <= 4) {
    labelUserName.setAttribute("style", "color: #ff715b");
  }
  if (emailInput.value <= 4) {
    labelEmailUser.setAttribute("style", "color: #ff715b");
  }
  if (passwordInput.value !== password2Input.value) {
    let labelPassword2 = document.querySelector("#labelPassword2");
    labelPassword2.setAttribute("style", "color: #ff715b");
    labelPassword2.innerHTML = "Senhas não combinam";
    return;
  }

  //verifica se todos os campos estao preenchidos
  if (
    !(usuarioInput.value !== "") ||
    !(emailInput.value !== "") ||
    !(passwordInput.value !== "") ||
    !(password2Input.value !== "")
  ) {
    modalTitle.innerHTML = "Existem campos em branco!";
    modalText.innerHTML =
      "O preenchimento de todos os campos são obrigatórios!";
    modalTitle.setAttribute("style", "color: #ff715b");
    modalText.setAttribute("style", "color: #2a225a");
    openModal();
    return;
  }

  // pega usuarios do localstorage
  let users_bd = pegaUsers();

  // verifica se ja existe um user com o email cadastrado
  let usersFiltrado = users_bd.filter(
    (user) => user.email_bd == emailInput.value
  );

  if (usersFiltrado.length > 0) {
    labelEmailUser.innerHTML = "Este email já está cadastrado!";

    modalTitle.innerHTML = "Este email já se encontra cadastrado!";
    modalText.innerHTML =
      "Este email já está cadastrado, utilize um email diferente!";
    modalTitle.setAttribute("style", "color: #ff715b");
    modalText.setAttribute("style", "color: #2a225a");
    openModal();
    return;
  }

  // cria um objeto do usuario
  const usuario = {
    nome_bd: usuarioInput.value,
    email_bd: emailInput.value,
    senha_bd: passwordInput.value,
    mensagens_bd: [],
  };

  // adiciona ao array de usuarios
  users_bd.push(usuario);
  // salva no local storage
  localStorage.setItem("users_bd", JSON.stringify(users_bd));
  modalTitle.innerHTML = "Usuário criado com sucesso!";
  modalText.innerHTML = "Seja bem vindo ao sistema de recados!";
  modalTitle.setAttribute("style", "color: #2a225a");
  modalText.setAttribute("style", "color: #2a225a");
  openModal();
  setTimeout(function () {
    window.location.href = "../index.html";
  }, 2000);
}

function pegaUsers() {
  let usuarios = localStorage.getItem("users_bd");
  if (!usuarios) {
    usuarios = [];
  } else {
    usuarios = JSON.parse(usuarios);
  }
  return usuarios;
}

//------------------------------------------------------------------------------
//Removendo alerts da janela do usuário e trocando por modal
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const closeModalBtn = document.querySelector(".btnModal");
const modalTitle = document.querySelector("#modalTitle");
const modalText = document.querySelector("#modalText");

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

closeModalBtn.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

const openModal = function () {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};
