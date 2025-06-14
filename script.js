const toDoList = {
  textDate: document.querySelector(".textDate"),
  textHours: document.querySelector(".textHours"),
  containerInput: document.querySelector(".container-input"),
  button: document.querySelector(".button-add"),
  img: document.querySelector(".img-button-remove"),
  input: document.querySelector(".input-task"),
  ul: document.querySelector(".ul"),
  key: "toDoList",

  createDate() {
    const meses = [
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro",
    ];

    const date = new Date();
    const Day = date.getDate();
    const month = meses[date.getMonth()];
    const year = date.getFullYear();

    const total = `${Day} ${month} ${year}`;

    this.textDate.innerHTML = total;
  },

  createHours() {
    const date = new Date();

    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");

    const total = `${hours}:${minutes}:${seconds}`;
    this.textHours.innerHTML = total;
  },

  setSuccess(element) {
    element.classList.add("success");
    element.classList.remove("error");
  },
  setError(element) {
    element.classList.add("error");
    element.classList.remove("success");
  },

  inputValidator() {
    const inputValue = this.input.value.trim();
    if (!inputValue) {
      this.setError(this.input);
      return null;
    }
    this.setSuccess(this.input);
    return inputValue;
  },

  getLocalStorage(key) {
    const storageData = JSON.parse(localStorage.getItem(key)) || [];
    return storageData;
  },
  setLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  },
  taskValue() {
    const inputValue = this.inputValidator();
    if (!inputValue) return;
    const task = {
      value: inputValue,
      id: Date.now(),
    };
    this.input.value = "";
    return task;
  },

  saveLocalStorage() {
    const task = this.taskValue();
    if (!task) return;
    const storageData = this.getLocalStorage(this.key);
    storageData.push(task);
    this.setLocalStorage(this.key, storageData);
    this.renderTask(task);
  },

  renderTask(task) {
    const li = document.createElement("li");
    li.style.cursor = "pointer";
    const span = document.createElement("span");
    span.textContent = task.value;
    li.appendChild(span);
    this.ul.appendChild(li);

    const buttonEdit = document.createElement("button");
    li.appendChild(buttonEdit);
    this.renderEdit(buttonEdit, span, task);

    const buttonRemove = document.createElement("button");
    li.appendChild(buttonRemove);
    this.renderRemove(buttonRemove, task);

    li.addEventListener("click", (e) => {
      e.stopPropagation();
      span.classList.toggle("span");
    });
  },

  renderEdit(buttonEdit, span, task) {
    buttonEdit.textContent = `editar`;
    buttonEdit.classList.add("button-edit");

    buttonEdit.addEventListener("click", (e) => {
      e.stopPropagation();
      if (document.querySelector(".input-edit")) return;

      const inputDefault = this.input;
      inputDefault.style.display = "none";

      const inputEdit = document.createElement("input");
      inputEdit.classList.add("input-edit");
      inputEdit.addEventListener("input", () => {
        inputEdit.value = inputEdit.value.replace(/[^a-zA-ZÀ-ÿ\s]/g, "");
      });

      inputEdit.type = "text";
      inputEdit.placeholder = "editando...";
      inputEdit.value = span.textContent;
      inputEdit.maxLength = 28;

      inputDefault.parentElement.insertBefore(
        inputEdit,
        inputDefault.nextElementSibling
      );
      inputEdit.focus();
      const btnRemove = document.querySelector(".button-remove");
      btnRemove.disabled = true;

      const newTaskStorage = () => {
        const dataStorage = this.getLocalStorage(this.key);
        dataStorage.forEach((items) => {
          if (items.id === task.id) {
            items.value = inputEdit.value;
          }
        });
        this.setLocalStorage(this.key, dataStorage);
      };

      const saveEdit = () => {
        newTaskStorage();
        inputDefault.style.display = "block";
        inputEdit.remove();
        span.textContent = inputEdit.value;
        btnRemove.disabled = false;
        span.classList.remove("span");
      };

      inputEdit.addEventListener("blur", saveEdit);
      inputEdit.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          saveEdit();
        }
      });
    });
  },

  renderRemove(buttonRemove, task) {
    buttonRemove.textContent = `remover`;
    buttonRemove.classList.add("button-remove");
    buttonRemove.addEventListener("click", () => {
      const storageData = this.getLocalStorage(this.key);
      const storageDatafiltered = storageData.filter(
        (items) => items.id !== task.id
      );
      this.setLocalStorage(this.key, storageDatafiltered);
      buttonRemove.parentElement.remove();
    });
  },
  loadTaskLocalStorage() {
    const storageData = this.getLocalStorage(this.key);
    storageData.forEach((items) => this.renderTask(items));
  },
  regex() {
    this.input.addEventListener("input", () => {
      this.input.value = this.input.value.replace(/[^a-zA-ZÀ-ÿ\s]/g, "");
    });
  },

  load() {
    // fucntion executar data
    this.createDate();

    // executa a function createHours  a todo momento
    setInterval(() => {
      this.createHours();
    }, 1000);

    this.loadTaskLocalStorage();
    this.regex();
  },
};
toDoList.load();

const { button, input } = toDoList;
button.addEventListener("click", () => toDoList.saveLocalStorage());
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    toDoList.saveLocalStorage();
  }
});
