import { $TodoItem } from "../../components/todo/todo-item";
import { getGroupsFromUser } from "../../modules/groups";
import { getTodos } from "../../modules/todo";
import { $pages, redirect } from "../../router";
import { initNavBar as updateNavBar } from "./nav-bar";
import { updateSideBar } from "./side-bar";
import { updateTodolist } from "./todolist";

let currentUser: User | null;
const $page = $pages.todos;
export async function startTodoPage(user: User) {
  currentUser = user;
  $page.classList.add("active");
  $page.innerHTML = ``;
  const $template = document.getElementById(
    "todo-page-template"
  ) as HTMLTemplateElement;
  $page.appendChild($template.content.cloneNode(true));

  $updateView();
}

export async function $updateView() {
  if (!currentUser) {
    redirect.todos();
    return;
  }
  const groups = await getGroupsFromUser(currentUser.uid);
  const filter: TodosFilter = {
    userId: currentUser.uid,
  };
  const todos = await getTodos(filter);

  updateSideBar({
    groups,
    user: currentUser,
  });
  updateNavBar(currentUser);
  updateTodolist(todos);
}
