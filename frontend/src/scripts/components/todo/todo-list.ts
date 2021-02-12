import { $template } from "../../modules/document";
import { getMonthString } from "../../modules/time";
import { TodoItem } from "./todo-item";

export class TodoList extends HTMLElement {
  private readonly isDateChanged = (
    prev: number | null,
    now: number | null
  ): boolean => {
    if (prev == now) {
      return false;
    } else if (!prev) {
      return true;
    } else if (!now) {
      return true;
    }

    return new Date(prev).toDateString() != new Date(now).toDateString();
  };

  constructor(todos: Todo[], handleUpdate: () => void) {
    super();

    todos.forEach((todo, index) => {
      if (index == 0) {
        // $todolist.append($dateDivider(todo.limit_datetime));
      } else if (
        this.isDateChanged(todo.limit_datetime, todos[index - 1].limit_datetime)
      ) {
        this.appendChild($DateDivider(todo.limit_datetime));
      }

      const $todo = new TodoItem(todo);
      $todo.onUpdate = handleUpdate;
      this.appendChild($todo);
    });
  }
}

const $DateDivider = (datetime: number | null): HTMLElement => {
  const $divider = document.createElement("div");
  $divider.className = "date-divider";

  if (datetime) {
    const date = new Date(datetime);
    $divider.innerHTML = `
      <div class="container">
      <h3>${date.getDate()}</h3>
      <p>${getMonthString(date.getMonth(), true)}</p>
      </div>
      `;
  }
  return $divider;
};

customElements.define("todo-list", TodoList);
