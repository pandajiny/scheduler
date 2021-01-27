import { $updateView } from ".";
import { $Todolist } from "../../components/todo/todo-list";
import { $pages } from "../../router";

const $todosPage = $pages.todos;

let scrollTop = 0;
export function updateTodolist(todos: Todo[]) {
  const $container = $todosPage.querySelector(
    ".todolist-container"
  ) as HTMLElement;
  $container.innerHTML = ``;

  const $todolist = $Todolist(todos, $updateView);

  $todolist.onscroll = () => {
    scrollTop = $todolist.scrollTop;
  };
  $container.append($todolist);
  $todolist.scrollTop = scrollTop;
}
