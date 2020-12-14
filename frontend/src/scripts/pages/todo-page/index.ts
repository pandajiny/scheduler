import { $renderAccountState } from "../../App";
import { getUser } from "../../modules/AuthModules";
import { setEnterInputListener } from "../../modules/DocumnetModules";
import {
  convertTimestampToString,
  convertStringToTimestamp,
} from "../../modules/TimeModules";
import {
  getTodos,
  getGroupsFromUser as getGroups,
  getEndTimeListFromTodos,
  addGroup,
  addTodoItem,
  getFilter,
} from "../../modules/TodoModules";
import { $mainPage, updatePage as navPage } from "../../navigate-page";
import { $TodoItem } from "./$Todo";

let user: User | null;

export async function initTodoPage() {
  user = await getUser();

  if (user) {
    history.pushState({}, "", `/todos?user_id=${user.uid}`);
    $initialPage();
  } else {
    navPage("/login-require");
  }
}

async function $initialPage() {
  const user = await getUser();

  if (user) {
    $initialAccountState(user);
    $initialNavContainer();

    $updateView();
  } else {
    navPage("/login-require");
  }
}

async function $updateView() {
  if (!user) {
    navPage("/login-require");
    return;
  }

  const filter = getFilter(window.location.search);
  const todos = await getTodos(filter);
  const groups = await getGroups(user.uid);

  $updateNavItems({
    groups,
  });

  $updateTodolist(todos);
}

function $initialAccountState(user: User) {
  (document.getElementById("main-page") as HTMLElement).style.display = "flex";
  const $accountContainer = document.getElementById(
    "account-container"
  ) as HTMLElement;
  $renderAccountState({ $container: $accountContainer, user });
}

function $initialNavContainer() {
  const $createGroupButton = document.getElementById(
    "create-group-button"
  ) as HTMLButtonElement;

  $createGroupButton.addEventListener("click", () => {
    const groupName = prompt(`new group name`, `GROUP NAME`);
    if (groupName) {
      addGroup({ groupName }).then($updateView);
    }
  });
}

function $updateNavItems(props: { groups: Group[] }) {
  const navItems: NavItem[] = [];
  const { groups } = props;

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
        if (user) {
          history.pushState(
            {},
            "",
            `/todos?user_id=${user.uid}&group_id=${group.group_id}`
          );
          $updateView();
        }
      });
      $groupList.appendChild($navItem);
    });
  }

  // $highlightNavItemFromUrl();
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
  const $editTitle = document.getElementById(
    `todo-container-title-edit`
  ) as HTMLInputElement;

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
  $editTitle.value = title;
  $editTitle.onblur = unsetEditTitleMode;
  $editTitle.addEventListener("keypress", (ev) => {
    setEnterInputListener(ev, $updateGroupTitle);
  });

  function $updateGroupTitle() {
    const title = $editTitle.value;
    if (title != "") {
    }
  }

  const $editButton = document.getElementById(
    "title-edit-button"
  ) as HTMLButtonElement;
  const $deleteButton = document.getElementById(
    "title-delete-button"
  ) as HTMLButtonElement;

  $editButton.addEventListener("click", setEditTitleMode);

  function setEditTitleMode() {
    $title.style.display = "none";
    $editTitle.style.display = `block`;

    $editTitle.focus();
  }

  function unsetEditTitleMode() {
    $title.style.display = `block`;
    $editTitle.style.display = `none`;
  }
}

async function $updateTodolist(todos: TodoItem[]) {
  const $todolist = $mainPage.querySelector(".todolist") as HTMLDivElement;
  console.log($todolist);
  $todolist.innerHTML = "";
  console.log(todos);

  todos.map((todoItem) => {
    $todolist.appendChild($TodoItem(todoItem, $updateView));
  });
}
