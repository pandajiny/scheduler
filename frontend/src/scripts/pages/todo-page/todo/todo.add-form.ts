import { $setAlertMessage, getUserIdFromUrl, getGroupIdFromUrl } from "..";
import { setEnterInputListener } from "../../../modules/DocumnetModules";
import { convertStringToTimestamp } from "../../../modules/TimeModules";
import { addTodo } from "../../../modules/todo";

export function $initialAddTodoForm(args: { onUpdate: () => void }) {
  const $addingForm = document.getElementById(
    "add-todo-container"
  ) as HTMLElement;
  const $addTodoInput = document.getElementById(
    "add-todo-input"
  ) as HTMLInputElement;
  const $dateSelect = $addingForm.querySelector(
    "#date-select"
  ) as HTMLInputElement;

  $addTodoInput.addEventListener("keypress", (ev) =>
    setEnterInputListener(ev, submitTodo)
  );

  function submitTodo() {
    $setAlertMessage("");

    const userId = getUserIdFromUrl();
    if (!userId) {
      throw `cannot parse user id`;
    }

    const groupId = getGroupIdFromUrl();

    const content = $addTodoInput.value;
    $addTodoInput.value = "";
    if (!content) {
      $setAlertMessage("Can't create todo with no content");
      return;
    }

    const limitDatetime =
      $dateSelect.value != ""
        ? convertStringToTimestamp($dateSelect.value)
        : null;

    addTodo({
      content,
      limitDatetime,
      groupId,
      ownerId: userId,
      parentTodoId: null,
    }).then((result) => {
      if (result.ok) {
        args.onUpdate();
      } else {
        throw result.error_message;
      }
    });
  }
}
