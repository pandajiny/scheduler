import { setAccountInfoModal } from "../../modals/account/account-info-modal";
import { setAddTodoModal } from "../../modals/todo/add-todo-modal";
import { addTodo } from "../../modules/todo";
import { $todosPage } from "../../router";

export function initNavBar() {
  const $navList = $todosPage.querySelector("#nav-list") as HTMLDivElement;
  const $navTodos = $todosPage.querySelector("#nav-todos") as HTMLDivElement;
  const $navAccount = $todosPage.querySelector(
    "#nav-account"
  ) as HTMLDivElement;
  const $navNew = $todosPage.querySelector("#nav-new") as HTMLDivElement;

  $navList.onclick = () => {
    const $sideBar = $todosPage.querySelector(
      ".side-bar-container"
    ) as HTMLDivElement;
    $sideBar.classList.add("active");
  };

  $navAccount.onclick = () => {
    setAccountInfoModal();
  };

  $navNew.onclick = () => {
    setAddTodoModal({
      handleCancel: async () => {},
      handleSubmit: async (request: AddTodoRequest) => {
        try {
          await addTodo(request);
          //   await $updateView();
        } catch (e) {
          console.error(e);
        }
      },
    });
  };
}
