import { group } from "console";
import { stringify } from "querystring";
import { $renderAccountState } from "../../App";
import { getUser } from "../../modules/auth";
import { getTodos } from "../../modules/todo";
import { getGroupsFromUser, getFilter } from "../../modules/TodoModules";
import { updatePage } from "../../navigate-page";
import { $initialNavContainer, $updateNavItems } from "./nav";

import { $initialAddTodoForm } from "./todo/todo.add-form";
import { $updateTitle, $updateTodolist } from "./todo/todo.list";

let user: User | null;

export async function initTodoPage() {
  user = await getUser();

  if (user) {
    history.pushState({}, "", `?page=todos&user_id=${user.uid}`);

    $initialAccountState(user);
    $initialNavContainer({ userId: user.uid, onUpdate: $updateView });

    $updateView();
  } else {
    updatePage("login-require");
  }
}

function $initialAccountState(user: User) {
  (document.getElementById("todo-page") as HTMLElement).style.display = "flex";
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

  const filter = getFilter(window.location.search);
  const [groups, todos] = await Promise.all([
    getGroupsFromUser(user.uid),
    getTodos(filter),
  ]);

  $updateNavItems({
    groups,
    userId: user.uid,
    onUpdate: $updateView,
  });

  $updateTodolist({ todos, onUpdate: $updateView });
  const group = groups.find((g) => g.group_id == filter.groupId);
  if (group) {
    $updateTitle({
      title: group.group_name,
      groupId: group.group_id,
    });
  } else {
    $updateTitle({
      title: "All todos",
    });
  }

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
