let inputEmail = document.querySelector("#email");
let labelEmailUser = document.querySelector("#labelEmailUser");
let inputPassword = document.querySelector("#password");
let labelPasswordUser = document.querySelector("#labelPasswordUser");
let labelErrorMsg = document.querySelector("#labelErrorMsg");
let btnSenha = document.querySelector(".fa-eye");
let loader = document.querySelector(".loader");
document.querySelector("#button_entrar").addEventListener("click", loginUser);
// document.querySelector('.loader').style.display = 'block'

function loginUser(event) {
  event.preventDefault();

  //verifica se todos os campos estao preenchidos
  if (!(inputEmail.value !== "") || !(inputPassword.value !== "")) {
    labelErrorMsg.innerHTML = "Preencha todos os campos!";
    labelErrorMsg.setAttribute("style", "color: #ff715b;");
    modalTitle.innerHTML = "Existem campos em branco!";
    modalText.innerHTML =
      "O preenchimento de todos os campos são obrigatórios!";
    modalTitle.setAttribute("style", "color: #ff715b");
    modalText.setAttribute("style", "color: #2a225a");
    inputEmail.focus();
    openModal();
    return;
  }

  let users_bd = [];
  let userValidator = {
    nome: "",
    email: "",
    senha: "",
    mensagem: "",
  };

  users_bd = JSON.parse(localStorage.getItem("users_bd"));

  users_bd.forEach((getbd) => {
    if (
      inputEmail.value == getbd.email_bd &&
      inputPassword.value == getbd.senha_bd
    ) {
      userValidator = {
        nome: getbd.nome_bd,
        email: getbd.email_bd,
        senha: getbd.senha_bd,
        mensagem: getbd.mensagem_bd,
      };
    }
  });

  if (
    inputEmail.value != userValidator.email &&
    inputPassword.value != userValidator.senha
  ) {
    labelErrorMsg.innerHTML = "Email ou senha incorretos!";
    labelErrorMsg.setAttribute("style", "color: #ff715b;");

    modalTitle.innerHTML = "Email ou senha incorretos!";
    modalText.innerHTML = "O email ou senha que você digitou estão incorretos!";
    modalTitle.setAttribute("style", "color: #ff715b");
    modalText.setAttribute("style", "color: #2a225a");
    inputEmail.focus();
    openModal();
    return;
  } else {
    labelErrorMsg.innerHTML = "";
    loader.setAttribute("style", "display: block");
    setTimeout(function () {
      window.location.href = "../recadosUser/recados.html";
    }, 1500);
    let token = Math.random().toString(22).substring(2);
    localStorage.setItem("token", token);
    localStorage.setItem("loggedUser", JSON.stringify(userValidator));
  }
}

//------------------------------------------------------------------------------
//Altera cores da label como alerta visual @EMAIL INPUT
inputEmail.addEventListener("keyup", () => {
  if (inputEmail.value.length <= 4) {
    labelEmailUser.setAttribute("style", "color: #ff715b");
  } else {
    labelEmailUser.setAttribute("style", "color: #7f73a1");
  }
});
//Altera cores da label como alerta visual @Password INPUT
inputPassword.addEventListener("keyup", () => {
  if (password.value.length <= 5) {
    labelPasswordUser.setAttribute("style", "color: #ff715b");
  } else {
    labelPasswordUser.setAttribute("style", "color: #7f73a1");
  }
});
//Mostrar password
btnSenha.addEventListener("click", () => {
  if (inputPassword.getAttribute("type") === "password") {
    inputPassword.setAttribute("type", "text");
  } else {
    inputPassword.setAttribute("type", "password");
  }
});
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
