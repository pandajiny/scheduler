import { $renderTemplate } from "../../modules/document";
import { getGroupsFromUid } from "../../modules/groups";
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
  $renderTemplate($page, `todo-page-template`);
  $updateView();
}

export async function $updateView() {
  if (!currentUser) {
    redirect.todos();
    return;
  }
  const filter: TodosFilter = {
    userId: currentUser.uid,
  };

  const [groups, todos] = await Promise.all([
    getGroupsFromUid(currentUser.uid),
    getTodos(filter),
  ]);

  updateSideBar({
    groups,
    user: currentUser,
  });
  updateNavBar(currentUser);
  updateTodolist(todos);
}
