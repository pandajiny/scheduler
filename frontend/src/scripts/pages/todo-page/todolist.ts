import { $updateView } from ".";
import { $Todolist } from "../../components/todo/todo-list";
import { $todosPage } from "../../router";

export function updateTodolist(todos: Todo[]) {
  const $todolist = $todosPage.querySelector(
    ".todolist-container"
  ) as HTMLElement;
  $todolist.append($Todolist(todos, $updateView));
}
