import { getUser } from "./modules/auth";
import { initLoginPage } from "./pages/login-page";
import { initLoginRequirePage as initWelcomePage } from "./pages/login-require-page";
import { initTodoPage } from "./pages/todo-page";

export type RouterPath = "todos" | "login" | "welcome";

export function getPagePath(search: string): RouterPath {
  return new URLSearchParams(search).get("page") as RouterPath;
}

export function updatePage() {
  const path = getPagePath(location.search);

  if (path) {
    $disablePages();
    initPages[path]();
  } else {
    getUser().then((user) => {
      console.log(`user is`);
      console.log(user);
      if (user) {
        navigateTo.todos();
      } else {
        navigateTo.welcome();
      }
    });
  }
}

type RouteOptions = Record<string, string>;
function navigate(page: RouterPath) {
  history.pushState({}, "", `?page=${page}`);
  updatePage();
}

export const navigateTo: Record<RouterPath, () => void> = {
  login: () => navigate("login"),
  todos: () => navigate("todos"),
  welcome: () => navigate("welcome"),
};

function $disablePages() {
  Object.values($pages).forEach(($page) => {
    $page.className = "page";
  });
}

export const $welcomePage = document.getElementById(
  "welcome-page"
) as HTMLDivElement;

export const $todosPage = document.getElementById(
  "todo-page"
) as HTMLDivElement;

export const $loginPage = document.getElementById(
  "login-page"
) as HTMLDivElement;

const $pages: Record<RouterPath, HTMLElement> = {
  welcome: $welcomePage,
  login: $loginPage,
  todos: $todosPage,
};

const initPages: Record<RouterPath, Function> = {
  welcome: initWelcomePage,
  login: initLoginPage,
  todos: initTodoPage,
};
