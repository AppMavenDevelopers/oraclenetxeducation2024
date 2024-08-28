// Utility functions
const getElement = (id) => document.getElementById(id);
const createElement = (tag, id = "", classes = []) => {
  const el = document.createElement(tag);
  if (id) el.id = id;
  if (classes.length) el.classList.add(...classes);
  return el;
};
const appendChildren = (parent, ...children) => {
  children.forEach((child) => parent.appendChild(child));
};

// Function to show alert
const showAlert = (message) => {
  const alertOverlay = createElement("div", "alertOverlay", ["alert-overlay"]);
  const alertBox = createElement("div", "alert", ["alert"]);
  const alertMessage = createElement("p", "", ["alert__message"]);
  const closeButton = createElement("button", "", ["alert__close-button"]);

  alertMessage.textContent = `! ${message} ¡`;
  closeButton.innerHTML = "&times;";
  closeButton.addEventListener("click", () => alertOverlay.remove());

  appendChildren(alertBox, closeButton, alertMessage);
  appendChildren(alertOverlay, alertBox);
  document.body.appendChild(alertOverlay);
};

const encriptacion = (cadena) => {
  const desplazamiento = 3;
  return cadena
    .split("")
    .map((caracter) => {
      const codigo = caracter.charCodeAt(0);
      const nuevoCodigo = ((codigo - 97 + desplazamiento) % 26) + 97;
      return String.fromCharCode(nuevoCodigo);
    })
    .join("");
};

const desencriptar = (cadena) => {
  const desplazamiento = 3;
  return cadena
    .split("")
    .map((caracter) => {
      const codigo = caracter.charCodeAt(0);
      const nuevoCodigo = ((codigo - 97 - desplazamiento + 26) % 26) + 97;
      return String.fromCharCode(nuevoCodigo);
    })
    .join("");
};

// Replacement matrix for encryption and decryption
const replacements = [
  ["u", "ufat"],
  ["o", "ober"],
  ["i", "imes"],
  ["e", "enter"],
  ["a", "ai"],
];

// Function to process text with replacements
const processText = (input, mode) => {
  const regex = new RegExp(
    replacements.map(([_, replacement]) => replacement).join("|") +
      "|" +
      replacements.map(([original]) => original).join("|"),
    "g"
  );

  return input.replace(regex, (match) => {
    const replacement =
      mode === "encrypt"
        ? replacements.find(([original]) => original === match)?.[1]
        : replacements.find(([_, repl]) => repl === match)?.[0];
    return replacement || match;
  });
};

// Function to encrypt text
const encryptText = () => {
  const input = getElement("challange__input").value;
  if (!validateInput(input)) return;
  const encrypted = processText(input.toLowerCase(), "encrypt");
  getElement("challange__output").value = encrypted;
  showAlert("Successfully encrypted text.");
};

// Function to decrypt text
const decryptText = () => {
  const output = getElement("challange__output").value;
  if (output === "") {
    showAlert("The output field is empty. Please encrypt text first.");
    return;
  }
  const decrypted = processText(output, "decrypt");
  getElement("challange__output").value = decrypted;
  showAlert("Text successfully decrypted.");
};

// Function to copy text to clipboard
const copyText = () => {
  const output = getElement("challange__output").value;
  if (output === "") {
    showAlert("The output field is empty. Nothing to copy.");
    return;
  }
  const outputField = getElement("challange__output");
  outputField.select();
  document.execCommand("copy");
  showAlert("Text copied successfully.");
};

// Function Clear text

const clearText = () => {
  getElement("challange__input").value = "";
  getElement("challange__output").value = "";
};

// Function to clear both textareas
const clearTextAreas = () => {
  const input = getElement("challange__input").value;
  const output = getElement("challange__output").value;

  if (input === "" && output === "") {
    showAlert("Both fields are already empty.");
  } else {
    clearText();
    showAlert("Both fields have been cleared.");
  }
};

// Function to validate the input
const validateInput = (input) => {
  const regex = /^[a-z0-9\s]+$/;
  if (input === "") {
    showAlert("The field cannot be empty.");
    return false;
  }
  if (!regex.test(input)) {
    clearText();
    showAlert("Only lowercase letters and without accents");
    return false;
  }
  return true;
};

// Event listeners
getElement("challange__encrypt").addEventListener("click", encryptText);
getElement("challange__decrypt").addEventListener("click", decryptText);
getElement("challange__copy").addEventListener("click", copyText);
getElement("challange__reboot").addEventListener("click", clearTextAreas);
