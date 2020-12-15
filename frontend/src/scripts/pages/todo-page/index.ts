import { $renderAccountState } from "../../App";
import { getUser } from "../../modules/AuthModules";
import {
  getTodos,
  getGroupsFromUser,
  getFilter,
} from "../../modules/TodoModules";
import { updatePage } from "../../navigate-page";
import { $initialNavContainer, $updateNavItems } from "./nav";

import { $initialAddTodoForm } from "./todo/todo.add-form";
import { $updateTodolist } from "./todo/todo.list";

let user: User | null;

export async function initTodoPage() {
  user = await getUser();

  if (user) {
    history.pushState({}, "", `?page=todos&user_id=${user.uid}`);

    $initialAccountState(user);
    $initialNavContainer({ onUpdate: $updateView });

    $updateView();
  } else {
    updatePage("login-require");
  }
}

function $initialAccountState(user: User) {
  (document.getElementById("main-page") as HTMLElement).style.display = "flex";
  const $accountContainer = document.getElementById(
    "account-container"
  ) as HTMLElement;
  $renderAccountState({ $container: $accountContainer, user });
}

async function $updateView() {
  if (!user) {
    updatePage("login-require");
    return;
  }

  const groups = await getGroupsFromUser(user.uid);
  $updateNavItems({
    groups,
    userId: user.uid,
    onUpdate: $updateView,
  });

  const filter = getFilter(window.location.search);
  const todos = await getTodos(filter);
  $updateTodolist({ todos, onUpdate: $updateView });
  $initialAddTodoForm({ onUpdate: $updateView });
}

export function getUserIdFromUrl(): string | null {
  return new URL(location.href).searchParams.get("user_id");
}

export function getGroupIdFromUrl(): string | null {
  return new URL(location.href).searchParams.get("group_id");
}

const $alertMessage = document.getElementById(
  "alert-message"
) as HTMLParagraphElement;

export function $setAlertMessage(message: string) {
  $alertMessage.textContent = message;
}
