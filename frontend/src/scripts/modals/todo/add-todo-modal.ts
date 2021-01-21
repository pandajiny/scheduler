import { getUser } from "../../modules/auth";

const $modal = document.getElementById("add-todo-modal") as HTMLElement;

export const setAddTodoModal = function (props: ModalProps<AddTodoRequest>) {
  $modal.classList.add("active");
  initModal(props);
};

async function initModal(props: ModalProps<AddTodoRequest>) {
  const $btnCancel = $modal.querySelector(
    ".button-cancel"
  ) as HTMLButtonElement;
  const $btnAdd = $modal.querySelector(".button-submit") as HTMLButtonElement;
  const $inputContent = $modal.querySelector(
    "#input-content"
  ) as HTMLInputElement;
  const $inputDate = $modal.querySelector("#input-date") as HTMLInputElement;

  const closeModal = () => {
    $modal.classList.remove("active");
  };

  $btnAdd.onclick = () => {
    getUser().then((user) => {
      if (!user) {
        throw `cannot get user information`;
      }

      const request: AddTodoRequest = {
        content: $inputContent.value,
        groupId: null,
        limitDatetime: new Date($inputDate.value).getTime(),
        ownerId: user.uid,
        parentTodoId: null,
      };

      props.handleSubmit(request).then(closeModal);
    });
  };

  $btnCancel.onclick = () => {
    props.handleCancel().then(() => {
      closeModal();
    });
  };

  $inputContent.value = "";
  $inputDate.value = "";
}