import { SideBarElement as SideBar } from "../../components/side-bar";
import { $template } from "../../modules/document";
import { getGroupsFromUid } from "../../modules/groups";
import { addTodo, getTodos } from "../../modules/todo";
import { $pages, updatePage } from "../../router";
import { TodoList } from "../../components/todo/todo-list";
import { TopBar } from "../../components/top-bar";
import { setAddTodoModal } from "../../modals/todo/add-todo-modal";

let user: User;
let todosFilter: TodosFilter;
let groups: GroupDTO[];
let todos: Todo[];
const $page = $pages.todos;
export async function startTodoPage(u: User) {
  user = u;

  if (!user) {
    updatePage("/welcome");
    return;
  }

  $page.classList.add("active");
  $page.innerHTML = "";
  $page.append($template("todo-page-template"));
  // $updateView();

  const groupId = new URLSearchParams(location.search).get("groupId");
  todosFilter = {
    userId: user.uid,
    groupId: groupId || undefined,
  };

  // init page
  updateTopBar();
  updateSideBar([]);
  updateNavBar(user);
  updateTodolist([]);

  getGroupsFromUid(user.uid).then((result) => {
    groups = result;
    const title = getTitle(groupId, groups);
    updateTopBar(title);
    updateSideBar(groups);
  });

  getTodos(todosFilter).then((result) => {
    todos = result;
    updateTodolist(todos);
  });
}

async function updateTopBar(title?: string) {
  if (title) {
    const $container = $page.querySelector(".top-bar-container");
    $container!.innerHTML = ``;
    const $topbar = new TopBar({
      title,
      handleBack: () => {
        updatePage("/todos");
      },
      handleSetting: () => {
        updatePage("/groups");
      },
    });
    $container!.append($topbar);
  }
}

async function updateSideBar(groups: GroupDTO[]) {
  const $container = $page.querySelector(
    ".side-bar-container"
  ) as HTMLDivElement;
  $container.onclick = (ev) => {
    ev.stopPropagation();
  };
  $container.innerHTML = ``;
  $container.append(
    new SideBar({
      user: user,
      groups,
      onUpdate: (groupId) => {
        if (groupId) {
          updatePage("/todos", { groupId });
        } else {
          updatePage("/todos");
        }
      },
    })
  );
}

export function updateNavBar(user: User) {
  const $navList = $page.querySelector("#nav-list") as HTMLDivElement;
  const $navTodos = $page.querySelector("#nav-todos") as HTMLDivElement;
  const $navAccount = $page.querySelector("#nav-account") as HTMLDivElement;
  const $navNew = $page.querySelector("#nav-new") as HTMLDivElement;

  $navList.onclick = () => {
    const $sideBar = $page.querySelector("side-bar") as HTMLDivElement;
    $sideBar.classList.add("active");
  };

  $navAccount.onclick = () => {
    updatePage("/account");
  };

  $navNew.onclick = () => {
    setAddTodoModal({
      user,
      handleCancel: async () => {},
      handleSubmit: async (request: AddTodoRequest) => {
        await addTodo(request);
        await getTodos(todosFilter).then(updateTodolist);
      },
    });
  };
}

let scrollTop = 0;
function updateTodolist(todos: Todo[]) {
  const $container = $page.querySelector(".todolist-container") as HTMLElement;
  const $todolist = new TodoList(todos, () => {
    getTodos(todosFilter).then((todos) => {
      updateTodolist(todos);
    });
  });
  $todolist.onscroll = () => {
    scrollTop = $todolist.scrollTop;
  };
  $todolist.scrollTop = scrollTop;
  $container.innerHTML = ``;
  $container.append($todolist);
}

function getTitle(groupId: string | null, groups: Group[]): string | undefined {
  return (
    (groupId &&
      groups.find((group) => group.group_id == groupId)!.group_name) ||
    undefined
  );
}
