import { setEnterInputListener } from "../../../modules/DocumnetModules";
import { updateGroup } from "../../../modules/groups";
import { deleteGroup } from "../../../modules/groups/delete-group";
import { $mainPage, updatePage } from "../../../navigate-page";
import { $TodoItem } from "./todo.item";

export async function $updateTodolist(args: {
  todos: Todo[];
  onUpdate: () => void;
}) {
  const { todos } = args;
  const $todolist = $mainPage.querySelector(".todolist") as HTMLDivElement;
  $todolist.innerHTML = "";

  todos.map((todoItem) => {
    $todolist.appendChild($TodoItem(todoItem, args.onUpdate));
  });
}

export function $updateTitle(args: {
  title: string;
  group?: Group;
  onUpdate: () => void;
}) {
  const { title, group } = args;
  const $title = document.getElementById(`todo-container-title`) as HTMLElement;
  const $editTitle = document.getElementById(
    `todo-container-title-edit`
  ) as HTMLInputElement;

  $title.textContent = title;
  $editTitle.value = title;
  $editTitle.onblur = unsetEditTitleMode;
  unsetEditTitleMode();
  $editTitle.onkeypress = (ev) => {
    setEnterInputListener(ev, () => {
      if (group) {
        console.log(`update group`);
        const title = $editTitle.value;
        group.group_name = title;
        updateGroup(group)
          .then(args.onUpdate)
          .catch((e) => {
            console.error(e);
          });
      }
    });
  };

  const $editButton = document.getElementById(
    "title-edit-button"
  ) as HTMLButtonElement;

  $editButton.onclick = setEditTitleMode;
  function setEditTitleMode() {
    if (!group) {
      return;
    }
    $title.style.display = "none";
    $editTitle.style.display = `block`;

    $editTitle.focus();
  }

  function unsetEditTitleMode() {
    $title.style.display = `block`;
    $editTitle.style.display = `none`;
    $editTitle.value = title;
  }

  const $deleteButton = document.getElementById(
    "title-delete-button"
  ) as HTMLButtonElement;
  $deleteButton.onclick = () => {
    console.log(`damn`);
    if (group) {
      console.log(`delete todo`);
      deleteGroup(group.owner_id, group.group_id).then(() => {
        updatePage("todos");
      });
    }
  };
  // $deleteButton.addEventListener("click", , {});
}
