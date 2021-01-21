import { setEnterInputListener } from "../../../modules/DocumnetModules";
import { updateGroup } from "../../../modules/groups";
import {
  convertTimestampToString,
  getMonthString,
} from "../../../modules/TimeModules";
import { $todosPage } from "../../../router";
import { $TodoItem } from "./todo-item";

export async function $updateTodolist(args: {
  todos: Todo[];
  onUpdate: () => void;
}) {
  const { todos } = args;
  const $todolist = $todosPage.querySelector(".todolist") as HTMLDivElement;
  $todolist.innerHTML = "";

  console.log(todos);
  todos.map((todo, index) => {
    const isDateChanged = (
      prev: number | null,
      now: number | null
    ): boolean => {
      if (prev == now) {
        return false;
      } else if (!prev) {
        return true;
      } else if (!now) {
        return true;
      }

      return new Date(prev).toDateString() != new Date(now).toDateString();
    };

    if (index == 0) {
      // $todolist.append($dateDivider(todo.limit_datetime));
    } else if (
      isDateChanged(todo.limit_datetime, todos[index - 1].limit_datetime)
    ) {
      $todolist.appendChild($dateDivider(todo.limit_datetime));
    }
    $todolist.appendChild($TodoItem(todo, args.onUpdate));
  });
}

const $dateDivider = (datetime: number | null): HTMLElement => {
  const $divider = document.createElement("div");
  $divider.className = "date-divider";

  if (datetime) {
    const date = new Date(datetime);
    $divider.innerHTML = `
    <div class="container">
    <h3>${date.getDate()}</h3>
    <p>${getMonthString(date.getMonth(), true)}</p>
    </div>
    `;
  }
  return $divider;
};

export function $updateTitle(args: {
  title: string;
  group?: Group;
  onUpdate: () => void;
}) {
  const { title, group } = args;
  const $title = document.getElementById(`todo-page-title`) as HTMLElement;
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

  // const $deleteButton = document.getElementById(
  //   "title-delete-button"
  // ) as HTMLButtonElement;
  // $deleteButton.onclick = () => {
  //   console.log(`damn`);
  //   if (group) {
  //     console.log(`delete todo`);
  //     deleteGroup(group.owner_id, group.group_id).then(() => {
  //       navigateTo.todos();
  //     });
  //   }
  // };
}
