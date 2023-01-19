//Elements
const input = document.getElementById("input-value");
const button = document.getElementById("add-button");
const ul = document.getElementById("space-list");

let todoList = JSON.parse(localStorage.getItem("todoList")) || [];

window.addEventListener("load", () => {
  getTodoListFromLocalStorage();
});

//Get TodoList from localStorage and load to ul
const getTodoListFromLocalStorage = () => {
  todoList.forEach((todo) => {
    createTodo(todo);
  });
};

const error = document.getElementById("space-error");

button.addEventListener("click", function (e) {
  e.preventDefault();
  if (input.value.trim() === "") {
    alert("Please add new todo text!");
    return;
  }
  const newTodo = {
    id: new Date().getTime(), //unique id with ms of now
    completed: false, //status
    text: input.value, //userInput
  };
  createTodo(newTodo);

  //Update todo array
  todoList.push(newTodo);
  //localStorage todoList Update
  //Stringify!
  localStorage.setItem("todoList", JSON.stringify(todoList));
  e.target.closest("form").reset(); //form içindeki inputları siler
});

const createTodo = (newTodo) => {
  //item creation
  //obj. destr.
  const { id, completed, text } = newTodo;

  const li = document.createElement("li");
  li.setAttribute("id", id);

  //add class with completed(status)
  completed ? li.classList.add("checked") : "";

  //create check icon

  const icon = document.createElement("i");
  icon.setAttribute("class", "fas fa-check");
  li.append(icon);

  //create item text
  const p = document.createElement("p");
  p.innerText = text;
  li.appendChild(p);

  //create remove icon
  const removeIcon = document.createElement("i");
  removeIcon.setAttribute("class", "fas fa-trash");
  li.append(removeIcon);

  ul.prepend(li);
};

ul.addEventListener("click", (e) => {
  const idAttr = e.target.closest("li").getAttribute("id");
  if (e.target.className === ("fas fa-check") ){
    e.target.parentElement.classList.toggle("checked");
    todoList.map((todo) => {
      if (todo.id == idAttr) {
        todo.competed = !todo.completed;
      }
    });
    localStorage.setItem("todoList", JSON.stringify(todoList));

  } else if (e.target.className === "fas fa-trash") {
    e.target.parentElement.remove();
    todoList = todoList.filter((todo) => todo.id != idAttr);
    localStorage.setItem("todoList", JSON.stringify(todoList));
  } else {
    alert("other element clicked");
  }
});
