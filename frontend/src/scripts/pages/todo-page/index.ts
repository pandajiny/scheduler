import { getUser } from "../../modules/auth";
import { getGroupsFromUser } from "../../modules/groups";
import { getFilter, getTodos } from "../../modules/todo";
import { $todosPage, navigateTo } from "../../router";
import { initNavBar as updateNavBar } from "./nav-bar";
import { updateSideBar } from "./side-bar";
import { updateTodolist } from "./todolist";

let user: User | null;

export async function initTodoPage() {
  user = await getUser();

  if (!user) {
    navigateTo.login();
    return;
  }

  history.pushState({}, "", `?page=todos&user_id=${user.uid}`);
  $todosPage.classList.add("active");

  $updateView();
}

export async function $updateView() {
  if (!user) {
    navigateTo.todos();
    return;
  }

  const groups = await getGroupsFromUser(user.uid);
  const filter = getFilter(location.search);
  const todos = await getTodos(filter);

  updateSideBar({
    groups,
    user,
  });
  updateNavBar();
  updateTodolist(todos);
}
