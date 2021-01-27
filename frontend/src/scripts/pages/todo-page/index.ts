import { getGroupsFromUser } from "../../modules/groups";
import { getTodos } from "../../modules/todo";
import { $pages, redirect } from "../../router";
import { initNavBar as updateNavBar } from "./nav-bar";
import { updateSideBar } from "./side-bar";
import { updateTodolist } from "./todolist";

let currentUser: User | null;
const $todosPage = $pages.todos;
export async function startTodoPage(user: User) {
  $todosPage.classList.add("active");
  currentUser = user;
  $updateView();
}

export async function $updateView() {
  if (!currentUser) {
    redirect.todos();
    return;
  }

  console.log(currentUser);
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
