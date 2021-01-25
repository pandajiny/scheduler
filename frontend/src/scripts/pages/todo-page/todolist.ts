import { $updateView } from ".";
import { $Todolist } from "../../components/todo/todo-list";
import { $pages } from "../../router";

const $todosPage = $pages.todos;

export function updateTodolist(todos: Todo[]) {
  const $todolist = $todosPage.querySelector(
    ".todolist-container"
  ) as HTMLElement;
  $todolist.append($Todolist(todos, $updateView));
}
