import { $template } from "../../modules/document";
import { $DateDivider } from "./date-divider";
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
    this.style.display = "block";

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

customElements.define("todo-list", TodoList);
