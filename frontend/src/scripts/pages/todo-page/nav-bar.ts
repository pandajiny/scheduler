import axios from "axios";
import { $updateView } from ".";
import { setAccountInfoModal } from "../../modals/account/account-info-modal";
import { setAddTodoModal } from "../../modals/todo/add-todo-modal";
import { addTodo } from "../../modules/todo";
import { $pages } from "../../router";

const $todosPage = $pages.todos;
export function initNavBar(user: User) {
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
    setAccountInfoModal(user);
  };

  $navNew.onclick = () => {
    setAddTodoModal({
      user,
      handleCancel: async () => {},
      handleSubmit: async (request: AddTodoRequest) => {
        await addTodo(request).then($updateView);
      },
    });
  };
}
