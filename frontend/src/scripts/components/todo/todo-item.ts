import { dbService } from "../../modules/store";
import { $template } from "../../modules/document";
import * as todoService from "../../modules/todo";
import { todosFilter } from "../../pages/todos";

export class TodoItem extends HTMLElement {
  async updateTodos() {
    todoService.getTodos(await todosFilter()).then(dbService.updateTodos);
  }

  constructor(todo: Todo) {
    super();
    this.id = `todo-${todo.todo_id}`;
    this.className = `${todo.complete_datetime ? "done" : ""}`;
    this.append($template("todo-item-template"));

    // content
    const $content = this.querySelector(".content") as HTMLElement;
    const $contentEditContainer = this.querySelector(
      ".content-edit-container"
    ) as HTMLElement;
    const $contentEdit = this.querySelector(
      ".content-edit"
    ) as HTMLInputElement;

    // actions
    const $actions = this.querySelector(".actions") as HTMLDivElement;

    const $deleteButton = this.querySelector<HTMLButtonElement>(
      ".delete-button"
    );
    $deleteButton!.onclick = () => {
      todoService.deleteTodo(todo.todo_id).then(this.updateTodos);
    };

    const $editButton = this.querySelector(".edit-button") as HTMLButtonElement;
    const $doneButton = this.querySelector(`.done-button`) as HTMLButtonElement;

    // content
    $content.textContent = todo.content;
    $contentEdit.onblur = unsetContentEditMode;
    // $contentEdit.onkeypress = (ev) => {
    //   keyInputListener(ev, () => {
    //     if (todo.content != $contentEdit.value) {
    //       todo.content = $contentEdit.value;
    //       // updateTodo(todo).then(handleUpdate);
    //     } else {
    //       unsetContentEditMode();
    //     }
    //   });
    // };

    // actions
    this.onclick = () => {
      const isActivated = () => {
        return $actions.classList.contains("active");
      };

      if (isActivated()) {
        $actions.classList.remove("active");
      } else {
        $actions.classList.add("active");
      }
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
      // updateTodo(todo).then(handleUpdate);
    });
  }
}

customElements.define("todo-item", TodoItem);
