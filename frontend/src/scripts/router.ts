import { getUser } from "./modules/auth";
import { initLoginPage } from "./pages/login-page";
import { initLoginRequirePage as initWelcomePage } from "./pages/login-require-page";
import { initTodoPage } from "./pages/todo-page";

type PagePath = "todos" | "login" | "welcome";

export function getPagePath(search: string): PagePath {
  return new URLSearchParams(search).get("page") as PagePath;
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

function navigate(page: PagePath) {
  history.pushState({}, "", `?page=${page}`);
  updatePage();
}

export const navigateTo: Record<PagePath, Function> = {
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

const $pages: Record<PagePath, HTMLElement> = {
  welcome: $welcomePage,
  login: $loginPage,
  todos: $todosPage,
};

const initPages: Record<PagePath, Function> = {
  welcome: initWelcomePage,
  login: initLoginPage,
  todos: initTodoPage,
};
