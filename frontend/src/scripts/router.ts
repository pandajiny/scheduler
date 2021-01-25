const $welcomePage = document.getElementById("welcome-page") as HTMLDivElement;

const $todosPage = document.getElementById("todo-page") as HTMLDivElement;

const $loginPage = document.getElementById("login-page") as HTMLDivElement;

export const $pages: Record<PageNames, HTMLElement> = {
  todos: $todosPage,
  login: $loginPage,
  welcome: $welcomePage,
};

import { getUser } from "./modules/auth";
import { startLoginPage } from "./pages/login-page";
import { initLoginRequirePage as startWelcomePage } from "./pages/login-require-page";
import { startTodoPage } from "./pages/todo-page";

export type PageNames = "todos" | "login" | "welcome";
type PagePaths = "/" | "/login" | "/welcome";

const startPages: Record<PagePaths, (user: User | null) => void> = {
  "/": function (user) {
    if (user) {
      startTodoPage(user);
    } else {
      redirect.login();
    }
  },
  "/login": function (user) {
    if (!user) {
      startLoginPage();
    } else {
      redirect.todos();
    }
  },
  "/welcome": function (user) {
    if (!user) {
      startWelcomePage();
    } else {
      redirect.todos();
    }
  },
};

function clearPages() {
  Object.values($pages).forEach(($page) => {
    $page.className = "page";
  });
}

export async function updatePage() {
  clearPages();
  const path = location.pathname as PagePaths;
  const user = await getUser();
  startPages[path](user);
}

function updatePath(path: PagePaths) {
  history.pushState({}, "", path);
  updatePage();
}

export const redirect: Record<PageNames, () => void> = {
  login: () => updatePath("/login"),
  todos: () => updatePath("/"),
  welcome: () => updatePath("/welcome"),
};
