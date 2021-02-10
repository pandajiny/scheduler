import { group } from "console";
import { $renderTemplate, $template } from "../../modules/document";
import { getGroupsFromUid } from "../../modules/groups";

const $modal = document.getElementById("add-todo-modal") as HTMLElement;

export const setAddTodoModal = function (
  props: ActionModalProps<AddTodoRequest>
) {
  $modal.classList.add("active");
  $modal.innerHTML = ``;
  $modal.append($template("add-todo-modal-template"));
  initModal(props);
};

async function initModal(props: ActionModalProps<AddTodoRequest>) {
  const { user } = props;

  const $btnCancel = $modal.querySelector(
    ".button-cancel"
  ) as HTMLButtonElement;
  const $btnAdd = $modal.querySelector(".button-submit") as HTMLButtonElement;
  const $inputContent = $modal.querySelector(
    ".input-content"
  ) as HTMLInputElement;
  const $inputDate = $modal.querySelector(".input-date") as HTMLInputElement;
  const $selectGroup = $modal.querySelector(
    ".select-group"
  ) as HTMLSelectElement;

  const groups = await getGroupsFromUid().catch(() => []);
  $selectGroup.append(...$groupOptions(groups));

  const closeModal = () => {
    $modal.classList.remove("active");

    $inputContent.value = "";
    $inputDate.value = "";
  };

  $btnAdd.onclick = () => {
    const request: AddTodoRequest = {
      content: $inputContent.value,
      groupId:
        $selectGroup.selectedIndex != 0
          ? groups[$selectGroup.selectedIndex].group_id
          : null,
      limitDatetime: new Date($inputDate.value).getTime(),
      ownerId: user.uid,
      parentTodoId: null,
    };
    props.handleSubmit(request).then(closeModal);
  };

  $btnCancel.onclick = () => {
    props.handleCancel().then(() => {
      closeModal();
    });
  };
}

const $groupOptions = (groups: Group[]): HTMLOptionElement[] => {
  const $notselect = document.createElement("option");
  $notselect.textContent = `Not select`;
  return [
    $notselect,
    ...groups.map((group) => {
      const $option = document.createElement("option");
      $option.textContent = group.group_name;
      return $option;
    }),
  ];
};
