import { setEnterInputListener } from "../../../modules/DocumnetModules";
import { $mainPage } from "../../../navigate-page";
import { $TodoItem } from "./todo.item";

export async function $updateTodolist(args: {
  todos: Todo[];
  onUpdate: () => void;
}) {
  const { todos } = args;
  const $todolist = $mainPage.querySelector(".todolist") as HTMLDivElement;
  console.log($todolist);
  $todolist.innerHTML = "";
  console.log(todos);

  todos.map((todoItem) => {
    $todolist.appendChild($TodoItem(todoItem, args.onUpdate));
  });
}

export function $updateTitle(args: { title: string; groupId?: string }) {
  const { title } = args;
  const $title = document.getElementById(`todo-container-title`) as HTMLElement;
  const $editTitle = document.getElementById(
    `todo-container-title-edit`
  ) as HTMLInputElement;

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
