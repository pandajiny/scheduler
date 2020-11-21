import { $renderAccountState, keyInputListener } from "../App";
import { getUser } from "../Modules/AuthModules";
import {
  addGroup,
  deleteTodoItem,
  editTodo,
  getEndTimeListFromTodos,
  getGroupList,
  getTodoItemsFromLoggedInUser,
} from "../Modules/TodoModules";

import "../../pages/index.html";
import { LOGIN_PATH, navigateTo, SIGNUP_PATH } from "../../constants/paths";
import { convertTimestampToString } from "../Modules/TimeModules";
import { group } from "console";

initialPage();

async function initialPage() {
  const user = await getUser();
  if (user) {
    $initialAccountState(user);

    const todoItems = await getTodoItemsFromLoggedInUser();
    $initialTodolist(todoItems);

    const groups = await getGroupList();
    const endTimes = getEndTimeListFromTodos(todoItems);
    $initialNavs({ endTimes, groups });
  } else {
    displayWelcomePage();
  }
}

async function $updateView() {
  // getDateStringListFromTodoItems(todoItems).forEach((strDate) => {
  //   navItems.push({
  //     title: strDate,
  //     pathname: strDate.split("/").join("").toLowerCase(),
  //   });
  // });
  const todoItems = await getTodoItemsFromLoggedInUser();

  const groups = await getGroupList();
  const endTimes = getEndTimeListFromTodos(todoItems);
  // $updateNavItems(navItems);

  console.log(groups, endTimes);
  // (document.getElementById(`nav-${currentNavPath}`) as HTMLElement).className =
  //   "selected";

  $updateTodolist(todoItems);
}

function $initialAccountState(user: User) {
  (document.getElementById("content-container") as HTMLElement).style.display =
    "flex";
  const $accountContainer = document.getElementById(
    "account-container"
  ) as HTMLElement;
  $renderAccountState({ $container: $accountContainer, user });
}

// const $createGroupButton = document.getElementById(
//   "create-group-button"
// ) as HTMLButtonElement;
// $createGroupButton.addEventListener("click", () => {
//   console.log(`create Groupd`);
// });

function $initialNavs(props: {
  groups: Group[];
  endTimes: Array<number | null>;
}) {
  const { endTimes, groups } = props;

  const $createGroupButton = document.getElementById(
    "create-group-button"
  ) as HTMLButtonElement;

  $createGroupButton.addEventListener("click", () => {
    const groupName = prompt(`new group name`, `GROUP NAME`);
    console.log(groupName);
    if (groupName) {
      addGroup({ groupName }).then($updateView);
    }
  });

  $updateNavItems({ groups, endTimes });
}

function $updateNavItems(props: {
  groups: Group[];
  endTimes: Array<number | null>;
}) {
  const navItems: NavItem[] = [];
  const { endTimes, groups } = props;

  endTimes.forEach((endTime) => {
    const navItem: NavItem = {
      type: "TIME",
      title: endTime ? convertTimestampToString(endTime) : `Date Not Selected`,
      pathname: endTime ? `${endTime}` : `null`,
    };
    navItems.push(navItem);
  });

  groups.forEach((group) => {
    const navItem: NavItem = {
      type: "GROUP",
      pathname: group.group_id,
      title: group.group_name,
    };
    navItems.push(navItem);
  });

  const $navList = document.getElementById("nav-list") as HTMLDListElement;
  $navList.innerHTML = ``;

  navItems.forEach((navItem) => {
    const $navItem = document.createElement("li") as HTMLElement;
    $navItem.id = `nav-${navItem.pathname}`;
    $navItem.textContent = navItem.title;
    $navItem.addEventListener("click", () => {
      switch (navItem.type) {
        case "GROUP":
          window.location.search = `?group=${navItem.pathname}`;
          return;
        case "TIME":
          window.location.search = `?time=${navItem.pathname}`;
          return;
      }
    });
    $navList.appendChild($navItem);
  });
}

async function $initialTodolist(todoItems: TodoItem[]) {
  const $createGroupButton = document.getElementById(
    "create-group-button"
  ) as HTMLButtonElement;
  $createGroupButton.addEventListener("click", () => {
    console.log(`create Groupd`);
  });

  $updateTodolist(todoItems);
}

async function $updateTodolist(todoItems: TodoItem[]) {
  const $todolist = document.getElementById("todolist") as HTMLDivElement;
  $todolist.innerHTML = "";
  todoItems.forEach((todoItem) => {
    const $todo = $createTodoItem(todoItem);
    $todolist.appendChild($todo);
  });
}

function $createTodoItem(todo: TodoItem): HTMLElement {
  const $todoItem = document.createElement("div");
  $todoItem.id = `todo-${todo.id}`;
  $todoItem.className = `todo`;
  $todoItem.innerHTML = `
    <div id="todo-content-container">
      <p id="date">
        ${
          todo.end_time
            ? convertTimestampToString(todo.end_time)
            : "not selected"
        }
      </p>
      <p id="content">${todo.content}</p>
      <div id="content-edit-container" class="unactive">
        <p class="icon">✎ </p>
        <input id="content-edit" value="${
          todo.content
        }" placeholder="...content here" />
      </div>
    </div>
    <div id="action-buttons">
      <button id="edit-button" class="text-button">✎</button>
      <button id="done-button" class="text-button">✓</button>
      <button id="delete-button" class="text-button">✖</button>
    </div>
  `;

  // content
  const $content = $todoItem.querySelector("#content") as HTMLElement;
  const $contentEditContainer = $todoItem.querySelector(
    "#content-edit-container"
  ) as HTMLElement;
  const $contentEdit = $todoItem.querySelector(
    "#content-edit"
  ) as HTMLInputElement;
  $contentEdit.addEventListener("keypress", (ev) => {
    keyInputListener(ev, () => {
      todo.content = $contentEdit.value;
      editTodo(todo).then();
    });
  });

  // delete button
  const $deleteButton = $todoItem.querySelector(
    "#delete-button"
  ) as HTMLButtonElement;

  $deleteButton.addEventListener("click", () =>
    handleDeleteButtonClick(todo.id!)
  );

  // edit button
  const $editButton = $todoItem.querySelector(
    "#edit-button"
  ) as HTMLButtonElement;

  $editButton.addEventListener("click", () => {
    handleEditButtonClick($content, $contentEditContainer);
  });

  function handleDeleteButtonClick(id: string) {
    deleteTodoItem({ id }).then($updateView);
  }

  function handleEditButtonClick(
    $content: HTMLElement,
    $contentEditContainer: HTMLElement
  ) {
    $contentEditContainer.className = "active";
    $contentEditContainer.style.display = "flex";
    $content.className = "unactive";
  }

  // function handleDoneButtonClick(id: string) {}
  return $todoItem;
}

function displayWelcomePage() {
  const $introduce = document.getElementById("introduce") as HTMLElement;
  $introduce.style.display = "flex";

  const $signupButton = document.getElementById(
    "signup-button"
  ) as HTMLButtonElement;
  $signupButton.addEventListener("click", handleSignupButtonClick);

  const $loginButton = document.getElementById(
    "login-button"
  ) as HTMLButtonElement;
  $loginButton.addEventListener("click", handleLoginButtonClick);

  function handleLoginButtonClick() {
    navigateTo(LOGIN_PATH);
  }
  function handleSignupButtonClick() {
    navigateTo(SIGNUP_PATH);
  }
}
