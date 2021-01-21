import { setAddTodoModal } from "../../modals/todo/add-todo-modal";
import { getUser } from "../../modules/auth";
import { getGroupsFromUser } from "../../modules/groups";
import { addTodo, getFilter, getTodos } from "../../modules/todo";
import { $todosPage, navigateTo } from "../../router";
import { $updateNavItems } from "./todo.nav";

import { $initialAddTodoForm } from "./todo/todo-add-form";
import { $updateTitle, $updateTodolist } from "./todo/todo-list";

let user: User | null;

export async function initTodoPage() {
  user = await getUser();

  if (!user) {
    navigateTo.login();
    return;
  }

  history.pushState({}, "", `?page=todos&user_id=${user.uid}`);
  $todosPage.classList.add("active");

  initTopbar();
  initFab();

  $updateView();
}

function initTopbar() {
  // init top bar
  const $menuButton = $todosPage.querySelector(
    "#todo-menu-button"
  ) as HTMLButtonElement;

  const $sideContainer = $todosPage.querySelector(
    "#side-container"
  ) as HTMLDivElement;

  $menuButton.onclick = () => {
    if (!$sideContainer.classList.contains("active")) {
      $sideContainer.classList.add("active");
    }
  };

  $sideContainer.querySelector(".empty")?.addEventListener("click", () => {
    $sideContainer.classList.remove("active");
  });
}

function initFab() {
  const $fabAddTodo = $todosPage.querySelector("#fab-add-todo") as HTMLElement;
  $fabAddTodo.onclick = () => {
    setAddTodoModal({
      handleCancel: async () => {},
      handleSubmit: async (request: AddTodoRequest) => {
        await addTodo(request);
        $updateView();
      },
    });
  };
}

// function $initialAccountState(user: User) {
//   (document.getElementById("todo-page") as HTMLElement).style.display = "flex";
//   const $accountContainer = document.getElementById(
//     "account-container"
//   ) as HTMLElement;
//   $renderAccountState({ $container: $accountContainer, user });
// }

async function $updateView() {
  if (!user) {
    navigateTo.todos();
    return;
  }

  const filter = getFilter(window.location.search);
  const [groups, todos] = await Promise.all([
    getGroupsFromUser(user.uid),
    getTodos(filter),
  ]);

  // $updateNavItems({
  //   groups,
  //   userId: user.uid,
  //   onUpdate: $updateView,
  // });

  $updateTodolist({ todos, onUpdate: $updateView });
  const group = groups.find((g) => g.group_id == filter.groupId);
  if (group) {
    $updateTitle({
      title: group.group_name,
      group: group,
      onUpdate: $updateView,
    });
  } else {
    $updateTitle({
      title: "All todos",
      onUpdate: $updateView,
    });
  }

  // $initialAddTodoForm({ onUpdate: $updateView });
}
