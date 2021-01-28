const $modal = document.getElementById("add-todo-modal") as HTMLElement;

export const setAddTodoModal = function (
  props: ActionModalProps<AddTodoRequest>
) {
  $modal.classList.add("active");
  initModal(props);
};

async function initModal(props: ActionModalProps<AddTodoRequest>) {
  const { user } = props;

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

    $inputContent.value = "";
    $inputDate.value = "";
  };

  $btnAdd.onclick = () => {
    const request: AddTodoRequest = {
      content: $inputContent.value,
      groupId: null,
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
