import { SideBarElement as SideBar } from "../../components/side-bar";
import { $template } from "../../modules/document";
import { getGroupsFromUid } from "../../modules/groups";
import { getTodos } from "../../modules/todo";
import { $pages, updatePage } from "../../router";
import { initNavBar as updateNavBar } from "./nav-bar";
import { TodoList } from "../../components/todo/todo-list";
import { TopBar } from "../../components/top-bar";

let currentUser: User | null;
const $todosPage = $pages.todos;
export async function startTodoPage(user: User) {
  currentUser = user;
  $todosPage.classList.add("active");
  $todosPage.innerHTML = "";
  $todosPage.append($template("todo-page-template"));
  $updateView();
}

export async function $updateView() {
  if (!currentUser) {
    updatePage("/welcome");
    return;
  }
  const groupId = new URLSearchParams(location.search).get("groupId");
  const filter: TodosFilter = {
    userId: currentUser.uid,
    groupId: groupId || undefined,
  };

  const [groups, todos] = await Promise.all([
    getGroupsFromUid(currentUser.uid),
    getTodos(filter),
  ]);

  const title = getTitle(groupId, groups);
  updateTopBar(title);
  updateSideBar(groups);
  updateNavBar(currentUser);
  updateTodolist(todos);
}

function getTitle(groupId: string | null, groups: Group[]): string | undefined {
  return (
    (groupId &&
      groups.find((group) => group.group_id == groupId)!.group_name) ||
    undefined
  );
}

async function updateTopBar(title?: string) {
  if (title) {
    const $container = $todosPage.querySelector(".top-bar-container");
    $container!.innerHTML = ``;
    const $topbar = new TopBar(title);
    $container!.append($topbar);
  }
}

async function updateSideBar(groups: Group[]) {
  const $container = $todosPage.querySelector(
    ".side-bar-container"
  ) as HTMLDivElement;
  $container.onclick = (ev) => {
    ev.stopPropagation();
  };
  $container.innerHTML = ``;
  $container.append(
    new SideBar({
      user: currentUser,
      groups,
    })
  );
}

let scrollTop = 0;
function updateTodolist(todos: Todo[]) {
  const $container = $todosPage.querySelector(
    ".todolist-container"
  ) as HTMLElement;
  const $todolist = new TodoList(todos, $updateView);
  $todolist.onscroll = () => {
    scrollTop = $todolist.scrollTop;
  };
  $todolist.scrollTop = scrollTop;
  $container.innerHTML = ``;
  $container.append($todolist);
}
