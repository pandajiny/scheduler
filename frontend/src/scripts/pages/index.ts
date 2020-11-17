import { $renderAccountState, keyInputListener } from "../App";
import { getUser } from "../Modules/AuthModules";
import {
  addTodoItem,
  deleteTodoItem,
  editTodo,
  getTodoItems,
} from "../Modules/TodoModules";

import "../../pages/index.html";
import { LOGIN_PATH, navigateTo, SIGNUP_PATH } from "../../constants/paths";
import {
  convertStringToTimestamp,
  convertTimestampToString,
} from "../Modules/TimeModules";

initialPage();

async function initialPage() {
  const user = await getUser();

  if (user) {
    (document.getElementById(
      "content-container"
    ) as HTMLElement).style.display = "flex";
    const $accountContainer = document.getElementById(
      "account-container"
    ) as HTMLElement;
    $renderAccountState({ $container: $accountContainer, user });
    $initialAddingForm();

    updateView();
  } else {
    displayWelcomePage();
  }
}

async function updateView() {
  const todoItems = await getTodoItems();

  const navItems: NavItem[] = [{ title: "All todos", pathname: "all" }];

  getDateStringListFromTodoItems(todoItems).forEach((strDate) => {
    navItems.push({
      title: strDate,
      pathname: strDate
        .replace("/", "")
        .replace("/", "")
        .replace(" ", "")
        .toLowerCase(),
    });
  });

  $updateNavList(navItems);
  console.log(navItems);
  const navPath = getNavPath();

  (document.getElementById(`nav-${navPath}`) as HTMLElement).className =
    "selected";

  $updateTodolist(todoItems, navPath);
}

type NavPath = "all" | "notselected" | string;
function getNavPath(): NavPath {
  let path = window.location.search.replace("?path=", "");
  if (path == `` || path == `all`) {
    return "all";
  } else if (path == `notselected`) {
    return "notselected";
  } else {
    return path;
  }
}

function $updateNavList(navItems: NavItem[]) {
  const $navList = document.getElementById("nav-list") as HTMLDListElement;
  $navList.innerHTML = ``;

  navItems.forEach((navItem) => {
    const $navItem = document.createElement("li") as HTMLElement;
    $navItem.id = `nav-${navItem.pathname}`;
    $navItem.textContent = navItem.title;
    $navItem.addEventListener("click", () => {
      window.location.search = `?path=${navItem.pathname}`;
    });
    $navList.appendChild($navItem);
  });
}

function getDateStringListFromTodoItems(todoItems: TodoItem[]): string[] {
  const dateSet = new Set(todoItems.map((todoItem) => todoItem.endTime));
  const stringDateList: string[] = [];
  dateSet.forEach((timestamp) => {
    if (timestamp == null) {
      stringDateList.push("Not selected");
    } else {
      stringDateList.push(convertTimestampToString(timestamp));
    }
  });
  return stringDateList;
}

async function $updateTodolist(todoItems: TodoItem[], path: NavPath) {
  const $todolist = document.getElementById("todolist") as HTMLDivElement;
  $todolist.innerHTML = "";
  todoItems
    .filter((todoItem) => {
      return (
        todoItem.parentId == null && isWillDisplayed(path, todoItem.endTime)
      );
    })
    .forEach((todoItem) => {
      const $todo = $createTodoItem(todoItem);
      $todolist.appendChild($todo);
    });

  function isWillDisplayed(navPath: NavPath, endTime: number | null): boolean {
    if (navPath == "all") {
      return true;
    }
    if (navPath == "notselected") {
      return endTime == null;
    } else {
      console.log(endTime, navPathToTimestamp(navPath));
      return endTime == navPathToTimestamp(navPath);
    }
  }
}

function $initialAddingForm() {
  const $addingForm = document.getElementById(
    "add-todo-container"
  ) as HTMLElement;

  const $dateSelect = $addingForm.querySelector(
    "#date-select"
  ) as HTMLInputElement;

  const $addTodoInput = document.getElementById(
    "add-todo-input"
  ) as HTMLInputElement;

  $addTodoInput.addEventListener("keypress", handleAddTodoInputKeypress);
  function handleAddTodoInputKeypress(ev: KeyboardEvent) {
    if (ev.key == "Enter") {
      const content = $addTodoInput.value;
      const endTime =
        $dateSelect.value != ""
          ? convertStringToTimestamp($dateSelect.value)
          : null;

      addTodoItem({ content, endTime }).then((result) => {
        if (result.ok) {
          $addTodoInput.value = "";
          updateView();
        } else {
          throw result.error_message;
        }
      });
    }
  }
}

function $createTodoItem(todo: TodoItem): HTMLElement {
  const $todoItem = document.createElement("div");
  $todoItem.id = `todo-${todo.id}`;
  $todoItem.className = `todo`;
  $todoItem.innerHTML = `
    <div id="todo-content-container">
      <p id="date">
        ${
          todo.endTime ? convertTimestampToString(todo.endTime) : "not selected"
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
      editTodo(todo).then(updateView);
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
    deleteTodoItem({ id }).then(updateView);
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

function navPathToTimestamp(path: string): number {
  console.log(path);
  if (path == "all" || path == "notselected") {
    return 0;
  } else {
    const year = path.slice(0, 4);
    const month = path.slice(4, 6);
    const date = path.slice(6, 8);
    return convertStringToTimestamp(`${year}/${month}/${date}`);
  }
}
