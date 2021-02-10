import { $DateDivider } from "./date-divider";
import { TodoItem } from "./todo-item";

export function $Todolist(
  todos: Todo[],
  handleUpdate: () => void
): HTMLElement {
  const $todolist = document.createElement("div");
  $todolist.className = "todolist";

  todos.forEach((todo, index) => {
    if (index == 0) {
      // $todolist.append($dateDivider(todo.limit_datetime));
    } else if (
      isDateChanged(todo.limit_datetime, todos[index - 1].limit_datetime)
    ) {
      $todolist.appendChild($DateDivider(todo.limit_datetime));
    }

    const $todo = new TodoItem(todo);
    $todo.onUpdate = handleUpdate;
    $todolist.appendChild($todo);
  });

  return $todolist;
}

const isDateChanged = (prev: number | null, now: number | null): boolean => {
  if (prev == now) {
    return false;
  } else if (!prev) {
    return true;
  } else if (!now) {
    return true;
  }

  return new Date(prev).toDateString() != new Date(now).toDateString();
};
