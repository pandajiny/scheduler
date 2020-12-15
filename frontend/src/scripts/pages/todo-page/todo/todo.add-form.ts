import { $setAlertMessage, getUserIdFromUrl, getGroupIdFromUrl } from "..";
import { convertStringToTimestamp } from "../../../modules/TimeModules";
import { addTodo } from "../../../modules/TodoModules";

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

  $addTodoInput.addEventListener("keypress", handleAddTodoInputKeypress);
  function handleAddTodoInputKeypress(ev: KeyboardEvent) {
    if (ev.key == "Enter") {
      $setAlertMessage("");

      const userId = getUserIdFromUrl();
      if (!userId) {
        throw `cannot parse user id`;
      }

      const groupId = getGroupIdFromUrl();

      const content = $addTodoInput.value;
      if (!content) {
        $setAlertMessage("Can't create todo with no content");
        return;
      }

      const endTime =
        $dateSelect.value != ""
          ? convertStringToTimestamp($dateSelect.value)
          : null;

      addTodo({
        content,
        endTime,
        groupId,
        isComplete: false,
        owner: userId,
        parentId: null,
      }).then((result) => {
        if (result.ok) {
          $addTodoInput.value = "";
          args.onUpdate();
        } else {
          throw result.error_message;
        }
      });
    }
  }
}
