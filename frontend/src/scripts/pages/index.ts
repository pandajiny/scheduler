import {
  $createContainer,
  $createButtonElement,
  $createParagraphElement,
  renderUserState,
  $createInputElement,
} from "../App";
import {
  addTodoItem,
  completeTodos,
  deleteTodoItem,
  editTodo,
  getTodoItems,
  uncompleteTodos,
} from "../Modules/TodoModules";

initializeApp();

function initializeApp() {
  renderUserState().then((user) => {
    console.log(`login user : ${user?.email}`);
    if (user) {
      (document.getElementById("main") as HTMLElement).style.display = "block";
      updateTodolist();
    }
  });
}

let todoItems: TodoItem[] = [];

const $addTodoInput = document.getElementById(
  "add-todo-input"
) as HTMLInputElement;

$addTodoInput.addEventListener("keyup", (ev: KeyboardEvent) => {
  if (ev.key == "Enter") {
    addTodoItem($addTodoInput.value).then(() => {
      $addTodoInput.value = "";
      updateTodolist();
    });
  }
});

const $submit = document.getElementById("submit") as HTMLButtonElement;
$submit.addEventListener("click", () => {
  addTodoItem($addTodoInput.value).then(() => {
    $addTodoInput.value = "";
    updateTodolist();
  });
});

const $todolist = document.getElementById("todolist") as HTMLDivElement;

async function updateTodolist() {
  todoItems = await getTodoItems().catch((err) => {
    console.error(`errorrr`);
    throw err.message;
  });
  $todolist.innerHTML = "";
  todoItems
    .filter((todoItem) => todoItem.parentId == null)
    .map((todoItem) => {
      const $todo = $createTodoItem(todoItem);
      $todolist.appendChild($todo);
    });
}

function $createTodoItem(todo: TodoItem) {
  // const $todo = document.createElement("div");
  // $todo.id = `todo-${todo.id}`;
  // $todo.className = "todo";

  const $todo = $createContainer({
    id: `todo-${todo.id}`,
    className: `todo`,
  });

  const $label = document.createElement(`label`);
  $label.style.display = "none";

  // $content container : date + content
  const $mainContainer = $createContainer({ className: `main-container` });

  const $contentContainer = $createContainer({
    className: `content-container`,
  });
  const $content = $createParagraphElement({
    className: `content`,
    text: todo.content,
    type: "h3",
  });
  if (todo.isComplete) {
    $content.className += ` done`;
  }
  const $contentEdit = $createInputElement({
    id: `content-edit-${todo.id}`,
    className: `unactive`,
    value: todo.content,
    onSubmit: async (content: string) => {
      todo.content = content;
      await editTodo(todo).then(() => {
        updateTodolist();
      });
      console.log(`todo-${todo.id} has changed!`, content);
      $contentEdit.className = `unactive`;
      $content.className = `content`;
    },
  });
  $contentContainer.appendChild($content);
  $contentContainer.appendChild($contentEdit);

  // delete, edit, done button
  const $actionButtons = $createContainer({ className: `action-buttons` });
  const $deleteButton = $createButtonElement({
    className: `text-button`,
    content: `✖	`,
    onClick: () => {
      deleteTodoItem({ id: todo.id! }).then(() => {
        updateTodolist();
      });
    },
  });
  const $editButton = $createButtonElement({
    className: `text-button`,
    content: `✎`,
    onClick: () => {
      $contentEdit.className = "active";
      $content.className = `content unactive`;
    },
  });
  const $doneButton = $createButtonElement({
    className: `text-button`,
    content: `✓`,
    onClick: () => {
      if (!todo.isComplete) {
        completeTodos([todo.id!, ...childList.map((t) => t.id!)]).then(() =>
          updateTodolist()
        );
      } else {
        uncompleteTodos([todo.id!, ...childList.map((t) => t.id!)]).then(() =>
          updateTodolist()
        );
      }
    },
  });
  $actionButtons.appendChild($deleteButton);
  $actionButtons.appendChild($editButton);
  $actionButtons.appendChild($doneButton);

  $mainContainer.appendChild($contentContainer);
  $mainContainer.appendChild($actionButtons);

  const $childContainer = $createContainer({
    className: `child-container unactive`,
  });

  const $childInputContainer = $createContainer({
    className: `child-input-container`,
  });
  const $iconLabel = document.createElement("label");
  $iconLabel.innerHTML = "➕";
  $iconLabel.className = "icon";
  const $childInput = $createInputElement({
    className: "child-input",
    placeholder: "add aditional things...",
    onSubmit: async (v: string) => {
      addTodoItem(v, todo.id).then(() => updateTodolist());
    },
  });
  const $cancelButton = $createButtonElement({
    className: `cancel-button text-button`,
    content: `cancel`,
    onClick: () => {
      $childContainer.className = `child-container unactive`;
      $childInput.value = ``;
    },
  });
  $childInputContainer.appendChild($iconLabel);
  $childInputContainer.appendChild($childInput);
  $childInputContainer.appendChild($cancelButton);

  const $childList = $createContainer({ className: `child-todo-list` });
  const childList = todoItems.filter((t) => t.parentId == todo.id);
  childList.map((childTodo) => {
    $childList.appendChild($createTodoItem(childTodo));
  });
  if (childList.length > 0) {
    $label.innerText = `${childList.length}more things`;
    $label.style.display = "block";
  }

  $childContainer.appendChild($childInputContainer);
  $childContainer.appendChild($childList);

  const $divider = document.createElement("div");
  $divider.className = "divider";

  $todo.appendChild($label);
  $todo.appendChild($mainContainer);
  $todo.appendChild($childContainer);
  $todo.appendChild($divider);

  $contentContainer.addEventListener("click", () => {
    if ($childContainer.className.includes("unactive")) {
      $childContainer.className = `child-container active`;
    } else {
      $childContainer.className = `child-container unactive`;
    }
  });
  return $todo;
}
