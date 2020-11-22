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
import {
  HOME_PATH,
  LOGIN_PATH,
  navigateTo,
  SIGNUP_PATH,
} from "../../constants/paths";
import { convertTimestampToString } from "../Modules/TimeModules";
import { title } from "process";

$initialPage();

async function $initialPage() {
  const user = await getUser();

  if (user) {
    $initialAccountState(user);

    const todoItems = await getTodoItemsFromLoggedInUser();
    const groups = await getGroupList();
    const endTimes = getEndTimeListFromTodos(todoItems);

    $initialTodoContainer(todoItems, groups);

    $initialNavContainer({ endTimes, groups });
  } else {
    $displayWelcomePage();
  }
}

async function $updateView() {
  const todoItems = await getTodoItemsFromLoggedInUser();

  const groups = await getGroupList();
  const endTimes = getEndTimeListFromTodos(todoItems);
  $updateNavItems({
    endTimes,
    groups,
  });

  const filter = getCurrentFilterFromUrl();

  $updateTodolist(todoItems, filter);
}

function $initialAccountState(user: User) {
  (document.getElementById("content-container") as HTMLElement).style.display =
    "flex";
  const $accountContainer = document.getElementById(
    "account-container"
  ) as HTMLElement;
  $renderAccountState({ $container: $accountContainer, user });
}

function $initialNavContainer(props: {
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
      title: endTime ? convertTimestampToString(endTime) : `Not Selected`,
      pathname: endTime ? `${endTime}` : `NONE`,
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

  const $navAllTodo = document.createElement(`li`);
  $navAllTodo.id = `nav-all`;
  $navAllTodo.textContent = `All Todos`;
  $navAllTodo.addEventListener(`click`, () => {
    navigateTo(HOME_PATH);
    window.location.search = ``;
  });
  $navList.appendChild($navAllTodo);

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

  $highlightNavItemFromUrl();
}

function $highlightNavItemFromUrl() {
  const searchQuery = window.location.search;

  const path =
    searchQuery
      .split("")
      .splice(searchQuery.indexOf(`=`) + 1)
      .join("") || "all";

  const navItem = document.getElementById(`nav-${path}`) as HTMLElement;
  navItem.className = `selected`;
}

interface Filter {
  groupId: string | null;
  endTime: number | "NONE" | null;
}

function getCurrentFilterFromUrl(): Filter {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const groupId = urlParams.get("group");
  const endTimeString = urlParams.get(`time`);
  if (endTimeString == `NONE`) {
    return {
      endTime: "NONE",
      groupId: groupId,
    };
  } else {
    const endTime = endTimeString ? parseInt(endTimeString) : null;
    return {
      endTime,
      groupId,
    };
  }
}

async function $initialTodoContainer(todoItems: TodoItem[], groups: Group[]) {
  const filter = getCurrentFilterFromUrl();
  const $title = document.getElementById(`todo-container-title`) as HTMLElement;

  let title: string = "Todo title not recognized ";
  if (filter.endTime) {
    if (filter.endTime == "NONE") {
      title = `Date Not Selected Todos`;
    } else {
      title = convertTimestampToString(filter.endTime);
    }
  } else if (filter.groupId) {
    const group = groups.find((group) => group.group_id == filter.groupId);
    console.log(group);
    if (group) {
      title = group.group_name;
    } else {
      title = `unrecognized Group`;
    }
  } else {
    title = `All Todos`;
  }
  $title.textContent = title;

  $updateTodolist(todoItems, filter);
}

async function $updateTodolist(todoItems: TodoItem[], filter: Filter) {
  const $todolist = document.getElementById("todolist") as HTMLDivElement;
  $todolist.innerHTML = "";
  console.log(filter);
  todoItems
    .filter((todoItem) => {
      let filterd = true;
      if (filterd && filter.groupId) {
        filterd = filter.groupId == todoItem.group_id;
      }

      if (filter.endTime) {
        filterd = filter.endTime == todoItem.end_time;
      }
      return filterd;
    })
    .forEach((todoItem) => {
      const $todo = $createTodoItemElement(todoItem);
      $todolist.appendChild($todo);
    });
}

function $createTodoItemElement(todo: TodoItem): HTMLElement {
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

function $displayWelcomePage() {
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
