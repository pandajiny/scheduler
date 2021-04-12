import { SideBarElement as SideBar } from "../../components/side-bar";
import { $template } from "../../modules/document";
import { getGroupsFromUid } from "../../modules/groups";
import { addTodo, getTodos } from "../../modules/todo";
import { $pages, updatePage, updateQuery } from "../../router";
import { TodoList } from "../../components/todo/todo-list";
import { TopBar } from "../../components/top-bar";
import { setAddTodoModal } from "../../modals/todo/add-todo-modal";
import { dbService } from "../../modules/store";

let user: User;
const $page = $pages.todos;

export const todosFilter = async (): Promise<TodosFilter> => {
  const groupId = new URLSearchParams(location.search).get("groupId");
  return { userId: user.uid, groupId: groupId || undefined };
};
export async function startTodoPage(u: User) {
  user = u;

  if (!user) {
    updatePage("/welcome");
    return;
  }

  $page.classList.add("active");
  $page.innerHTML = "";
  $page.append($template("todo-page-template"));

  // init page
  updateTopBar();
  updateSideBar([]);
  updateNavBar(user);
  updateTodolist([]);

  getTodos(await todosFilter()).then((todos) => {
    dbService.addTodoChangeListener(async (todos) => {
      const groups = await dbService.getGroups();
      const groupId = new URLSearchParams(location.search).get("groupId");
      const title = getTitle(groupId, groups);
      updateTopBar(title);
      updateTodolist(todos);
    });
    dbService.updateTodos(todos);
  });

  getGroupsFromUid(user.uid).then((groups) => {
    dbService.addGroupChangeListener((groups) => {
      const groupId = new URLSearchParams(location.search).get("groupId");
      const title = getTitle(groupId, groups);
      updateTopBar(title);
      updateSideBar(groups);
    });
    dbService.updateGroups(groups);
  });
}

async function updateTopBar(title?: string) {
  const $container = $page.querySelector(".top-bar-container");

  if (title) {
    $container!.innerHTML = ``;
    const $topbar = new TopBar({
      title: title || "All todos",
      handleBack: async () => {
        updateQuery({ groupId: undefined });
        getTodos(await todosFilter()).then(dbService.updateTodos);
      },
      handleSetting: () => {
        updatePage("/groups");
      },
    });
    $container!.append($topbar);
    $container!.classList.add("active");
  } else {
    $container!.classList.remove("active");
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
    })
  );
}

export function updateNavBar(user: User) {
  const $navList = $page.querySelector("#nav-list") as HTMLDivElement;
  const $navAccount = $page.querySelector("#nav-account") as HTMLDivElement;
  const $navNew = $page.querySelector("#nav-new") as HTMLDivElement;

  $navList.onclick = async () => {
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
        await getTodos(await todosFilter()).then(dbService.updateTodos);
      },
    });
  };
}

let scrollTop = 0;
function updateTodolist(todos: Todo[]) {
  const $container = $page.querySelector(".todolist-container") as HTMLElement;
  const $todolist = new TodoList(todos);
  $todolist.onscroll = () => {
    scrollTop = $todolist.scrollTop;
  };
  $todolist.scrollTop = scrollTop;
  $container.innerHTML = ``;
  $container.append($todolist);
}

function getTitle(
  groupId: string | null,
  groups: GroupDTO[]
): string | undefined {
  return (
    (groupId &&
      groups.find((group) => group.group_id == groupId)!.group_name) ||
    undefined
  );
}
