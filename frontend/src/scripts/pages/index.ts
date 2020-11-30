import { $renderAccountState, keyInputListener } from "../App";
import { getUser } from "../Modules/AuthModules";
import {
  addGroup,
  addTodoItem,
  completeTodos,
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
import {
  convertStringToTimestamp,
  convertTimestampToString,
} from "../Modules/TimeModules";

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

  // update group items
  if (groups) {
    const $groupList = document.getElementById("group-list") as HTMLElement;
    $groupList.innerHTML = ``;
    $groupList.style.display = `block`;

    const $groupNavMessage = document.querySelector(
      "#nav-group-container > .nav-message"
    ) as HTMLParagraphElement;
    $groupNavMessage.textContent = "";
    $groupNavMessage.style.display = `none`;

    groups.forEach((group) => {
      const navItem: NavItem = {
        type: "GROUP",
        pathname: group.group_id,
        title: group.group_name,
      };

      const $navItem = document.createElement("li") as HTMLElement;
      $navItem.className = "nav-item";
      $navItem.id = `nav-${navItem.pathname}`;
      $navItem.innerHTML = `
        <label class="nav-symbol">🗹</label>
        <p>${navItem.title}</p>
      `;
      $navItem.addEventListener("click", () => {
        window.location.search = `?group=${navItem.pathname}`;
      });
      $groupList.appendChild($navItem);
    });
  }

  // update upcoming items
  if (endTimes) {
    const $upcomingList = document.getElementById(
      "upcoming-list"
    ) as HTMLDivElement;
    $upcomingList.style.display = "block";

    endTimes.sort().forEach((endTime) => {
      const navItem: NavItem = {
        type: "TIME",
        title: endTime ? convertTimestampToString(endTime) : `Not Selected`,
        pathname: endTime ? `${endTime}` : `NONE`,
      };

      const $navItem = document.createElement("li") as HTMLElement;
      $navItem.className = "nav-item";
      $navItem.id = `nav-${navItem.pathname}`;
      $navItem.textContent = navItem.title;
      $navItem.addEventListener("click", () => {
        window.location.search = `?time=${navItem.pathname}`;
      });

      $upcomingList.appendChild($navItem);
    });
  }

  // const $navAllTodo = document.createElement(`li`);
  // $navAllTodo.id = `nav-all`;
  // $navAllTodo.textContent = `All Todos`;
  // $navAllTodo.addEventListener(`click`, () => {
  //   navigateTo(HOME_PATH);
  //   window.location.search = ``;
  // });
  // $navList.appendChild($navAllTodo);

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
  navItem.className += ` selected`;
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

  $updateTitle(filter, groups);
  $initialAddTodoForm(filter.groupId);

  $updateTodolist(todoItems, filter);
}

function $initialAddTodoForm(groupId: string | null) {
  const $addingForm = document.getElementById(
    "add-todo-container"
  ) as HTMLElement;
  const $addTodoInput = document.getElementById(
    "add-todo-input"
  ) as HTMLInputElement;
  const $dateSelect = $addingForm.querySelector(
    "#date-select"
  ) as HTMLInputElement;

  $addTodoInput.addEventListener("keypress", handleAddTodoInputKeypress);
  function handleAddTodoInputKeypress(ev: KeyboardEvent) {
    if (ev.key == "Enter") {
      $setAlertMessage("");
      const content = $addTodoInput.value;
      if (!content) {
        $setAlertMessage("Can't create todo with no content");
        return;
      }

      const endTime =
        $dateSelect.value != ""
          ? convertStringToTimestamp($dateSelect.value)
          : null;

      addTodoItem({ content, endTime, parentId: null, groupId }).then(
        (result) => {
          if (result.ok) {
            $addTodoInput.value = "";
            $updateView();
          } else {
            throw result.error_message;
          }
        }
      );
    }
  }
}

const $alertMessage = document.getElementById(
  "alert-message"
) as HTMLParagraphElement;
function $setAlertMessage(message: string) {
  $alertMessage.textContent = message;
}

function $updateTitle(filter: Filter, groups: Group[]) {
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
    <label id="todo-content-container" class="${todo.isComplete ? "done" : ""}">
      <p id="date">
        ${todo.end_time ? convertTimestampToString(todo.end_time) : "-"}
      </p>
      <p id="content">${todo.content}</p>
      <div id="content-edit-container" class="unactive">
        <p class="icon">✎ </p>
        <input id="content-edit" value="${
          todo.content
        }" placeholder="...content here" />
      </div>
    </label>
    <div id="action-buttons" class="${todo.isComplete ? "done" : ""}">
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
  $contentEdit.onblur = unsetContentEditMode;
  $contentEdit.addEventListener("keypress", (ev) => {
    keyInputListener(ev, () => {
      if (todo.content != $contentEdit.value) {
        todo.content = $contentEdit.value;
        editTodo(todo).then($updateView);
      } else {
        unsetContentEditMode();
      }
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
    handleEditButtonClick();
  });

  const $doneButton = $todoItem.querySelector(
    `#done-button`
  ) as HTMLButtonElement;
  $doneButton.addEventListener("click", handleDoneButtonClick);

  function handleDeleteButtonClick(id: string) {
    deleteTodoItem({ id }).then($updateView);
  }

  function handleEditButtonClick() {
    setContentEditMode();
  }

  function setContentEditMode() {
    $contentEditContainer.className = "active";
    $contentEditContainer.style.display = "flex";
    $content.className = "unactive";
    $contentEdit.value = todo.content;
    $contentEdit.focus();
  }

  function unsetContentEditMode() {
    $contentEditContainer.className = "unactive";
    $contentEditContainer.style.display = "none";
    $content.className = "active";
  }

  function handleDoneButtonClick() {
    if (todo.id) {
      completeTodos([todo.id]).then($updateView);
    }
  }
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
