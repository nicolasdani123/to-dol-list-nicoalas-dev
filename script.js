// Seleção de elementos
const button = document.querySelector(".button");
const input = document.querySelector(".input");
const dataContainer = document.querySelector(".data-container");
const ul = document.querySelector(".list");

// Lista completa de meses
const meses = [
    "janeiro", "fevereiro", "março", "abril", "maio", "junho",
    "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"
];

// Função para exibir a data
function date() {
    const dataNewDate = new Date();
    const day = dataNewDate.getDate();
    const month = meses[dataNewDate.getMonth()];
    const year = dataNewDate.getFullYear();

    const p = document.createElement("p");
    p.textContent = `${day} ${month} ${year}`;

    console.log(p);
    dataContainer.appendChild(p);
}

// Função para exibir o horário atualizado
function hours() {
    const p = document.createElement("p");
    dataContainer.appendChild(p);

    setInterval(() => {
        const data = new Date();
        const hours = data.getHours().toString().padStart(2, "0");
        const minutes = data.getMinutes().toString().padStart(2, "0");
        const seconds = data.getSeconds().toString().padStart(2, "0");

        p.textContent = `${hours}:${minutes}:${seconds}`;
    }, 1000);
}

// Função para adicionar itens à lista
function list() {
    if (input.value.trim() !== "") { // Evita adicionar itens vazios
        const li = document.createElement("li");
        const checkbox = document.createElement("input");
        const label = document.createElement("label");

        checkbox.type = "checkbox";
        checkbox.classList.add("checkbox");

        label.textContent = input.value;

        li.appendChild(checkbox);
        li.appendChild(label);
        ul.appendChild(li);

        label.addEventListener("click", () => {
            checkbox.checked = !checkbox.checked
        });

        input.value = ""; // Limpa o campo de entrada após adicionar o item
    }
}

// Função de inicialização
function init() {
    hours();
    date();
}

init();

// Evento de clique no botão para alternar visibilidade do input
button.addEventListener("click", () => {
    input.classList.toggle("hidden");
});

// Evento para adicionar item à lista quando o input mudar
input.addEventListener("change", () => {
    list();
});
