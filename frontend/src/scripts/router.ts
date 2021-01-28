const $welcomePage = document.getElementById("welcome-page") as HTMLDivElement;

const $todosPage = document.getElementById("todo-page") as HTMLDivElement;

const $loginPage = document.getElementById("login-page") as HTMLDivElement;

const $signupPage = document.getElementById("signup-page") as HTMLDivElement;

export type PageNames = "todos" | "welcome" | "login" | "signup";
type PagePaths = "/" | "/welcome" | "/login" | "/signup";

export const $pages: Record<PageNames, HTMLElement> = {
  todos: $todosPage,
  login: $loginPage,
  welcome: $welcomePage,
  signup: $signupPage,
};

import { getUser } from "./modules/auth";
import { startLoginPage } from "./pages/login-page";
import { startWelcomePage } from "./pages/welcome-page";
import { startTodoPage } from "./pages/todo-page";
import { startSignupPage } from "./pages/signup-page";

const startPages: Record<PagePaths, (user: User | null) => void> = {
  "/": (user) => (user ? startTodoPage(user) : redirect.welcome()),
  "/welcome": (user) => (user ? redirect.todos() : startWelcomePage()),
  "/login": (user) => (user ? redirect.todos() : startLoginPage()),
  "/signup": (user) => (user ? redirect.todos() : startSignupPage()),
};

export async function updatePage() {
  try {
    clearPages();
    const path = location.pathname as PagePaths;
    const user = await getUser();
    startPages[path](user);
  } catch (err) {
    console.error(err);
  }
}

function updatePath(path: PagePaths) {
  history.pushState({}, "", path);
  updatePage();
}

function clearPages() {
  Object.values($pages).forEach(($page) => {
    $page.className = "page";
    $page.innerHTML = ``;
  });
}

export const redirect: Record<PageNames, () => void> = {
  todos: () => updatePath("/"),
  welcome: () => updatePath("/welcome"),
  login: () => updatePath("/login"),
  signup: () => updatePath("/signup"),
};

export function handleGithubPages(location: Location) {
  // function for github pages
  // gh pages doesn't support history router
  if (location.search[1] === "/") {
    // redirect from 404.html
    // path contain ? and started with ?/
    const decoded = location.search
      .slice(1)
      .split("&")
      .map(function (s) {
        return s.replace(/~and~/g, "&");
      })
      .join("?");

    // redirect to origin path
    window.history.replaceState(
      null,
      "",
      location.pathname.slice(0, -1) + decoded + location.hash
    );
  }
}
