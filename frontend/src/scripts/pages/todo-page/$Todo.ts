import { keyInputListener } from "../../App";
import { convertTimestampToString } from "../../modules/TimeModules";
import {
  editTodo,
  deleteTodoItem,
  completeTodos,
} from "../../modules/TodoModules";

export function $TodoItem(todo: TodoItem, onUpdate: () => void): HTMLElement {
  const $todoItem = document.createElement("div");
  $todoItem.id = `todo-${todo.id}`;
  $todoItem.className = `todo`;
  $todoItem.innerHTML = `
    <label class="todo-content-container" class="${
      todo.isComplete ? "done" : ""
    }">
      <p class="date">
        ${todo.end_time ? convertTimestampToString(todo.end_time) : "-"}
      </p>
      <p class="content">${todo.content}</p>
      <div class="content-edit-container unactive">
        <p class="icon">✎ </p>
        <input class="content-edit" value="${
          todo.content
        }" placeholder="...content here" />
      </div>
    </label>
    <div class="action-buttons" class="${todo.isComplete ? "done" : ""}">
      <button class="edit-button text-button">✎</button>
      <button class="done-button text-button">✓</button>
      <button class="delete-button text-button">✖</button>
    </div>
  `;

  // content
  const $content = $todoItem.querySelector("#content") as HTMLElement;
  const $contentEditContainer = $todoItem.querySelector(
    ".content-edit-container"
  ) as HTMLElement;
  const $contentEdit = $todoItem.querySelector(
    ".content-edit"
  ) as HTMLInputElement;
  $contentEdit.onblur = unsetContentEditMode;
  $contentEdit.addEventListener("keypress", (ev) => {
    keyInputListener(ev, () => {
      if (todo.content != $contentEdit.value) {
        todo.content = $contentEdit.value;
        editTodo(todo).then(onUpdate);
      } else {
        unsetContentEditMode();
      }
    });
  });

  // delete button
  const $deleteButton = $todoItem.querySelector(
    ".delete-button"
  ) as HTMLButtonElement;

  $deleteButton.addEventListener("click", () =>
    handleDeleteButtonClick(todo.id!)
  );

  // edit button
  const $editButton = $todoItem.querySelector(
    ".edit-button"
  ) as HTMLButtonElement;

  $editButton.addEventListener("click", () => {
    handleEditButtonClick();
  });

  const $doneButton = $todoItem.querySelector(
    `.done-button`
  ) as HTMLButtonElement;
  $doneButton.addEventListener("click", handleDoneButtonClick);

  function handleDeleteButtonClick(id: string) {
    deleteTodoItem({ id }).then(onUpdate);
  }

  function handleEditButtonClick() {
    setContentEditMode();
  }

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

  function handleDoneButtonClick() {
    if (todo.id) {
      completeTodos([todo.id]).then(onUpdate);
    }
  }
  return $todoItem;
}
