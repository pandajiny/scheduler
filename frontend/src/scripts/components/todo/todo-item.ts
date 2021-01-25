import { keyInputListener } from "../../app";
import { updateTodo, deleteTodo } from "../../modules/todo";

export function $TodoItem(todo: Todo, handleUpdate: () => void): HTMLElement {
  const $todo = document.createElement("div");
  $todo.id = `todo-${todo.todo_id}`;
  $todo.className = `todo-item ${todo.complete_datetime ? "done" : ""}`;

  const $todoTemplate = document.getElementById(
    "todo-item-template"
  ) as HTMLTemplateElement;
  $todo.appendChild($todoTemplate.content.cloneNode(true));

  // content
  const $content = $todo.querySelector(".content") as HTMLElement;
  const $contentEditContainer = $todo.querySelector(
    ".content-edit-container"
  ) as HTMLElement;
  const $contentEdit = $todo.querySelector(".content-edit") as HTMLInputElement;

  // actions
  const $actions = $todo.querySelector(".actions") as HTMLDivElement;
  const $deleteButton = $todo.querySelector(
    ".delete-button"
  ) as HTMLButtonElement;
  const $editButton = $todo.querySelector(".edit-button") as HTMLButtonElement;
  const $doneButton = $todo.querySelector(`.done-button`) as HTMLButtonElement;

  // content
  $content.textContent = todo.content;
  $contentEdit.onblur = unsetContentEditMode;
  $contentEdit.onkeypress = (ev) => {
    keyInputListener(ev, () => {
      if (todo.content != $contentEdit.value) {
        todo.content = $contentEdit.value;
        updateTodo(todo).then(handleUpdate);
      } else {
        unsetContentEditMode();
      }
    });
  };

  // actions
  $todo.onclick = () => {
    const isActivated = () => {
      return $actions.classList.contains("active");
    };

    if (isActivated()) {
      $actions.classList.remove("active");
    } else {
      $actions.classList.add("active");
    }
  };

  $deleteButton.onclick = () => {
    deleteTodo(todo.todo_id).then(handleUpdate);
  };
  $editButton.onclick = () => {
    setContentEditMode();
  };

  function setContentEditMode() {
    $contentEditContainer.className = "active";
    $contentEditContainer.style.display = "flex";
    $content.className = "unactive";
    $contentEdit.value = todo.content;
    $contentEdit.focus();
  }

  function unsetContentEditMode() {
    $contentEditContainer.className = "unactive";
    $contentEditContainer.style.display = "none";
    $content.className = "active";
  }

  $doneButton.addEventListener("click", () => {
    todo.complete_datetime = new Date().getTime();
    updateTodo(todo).then(handleUpdate);
  });

  return $todo;
}
