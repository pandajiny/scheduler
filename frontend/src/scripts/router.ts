const $welcomePage = document.getElementById("welcome-page") as HTMLDivElement;
const $todosPage = document.getElementById("todo-page") as HTMLDivElement;
const $loginPage = document.getElementById("login-page") as HTMLDivElement;
const $signupPage = document.getElementById("signup-page") as HTMLDivElement;
const $accountPage = document.getElementById("account-page") as HTMLDivElement;
export type PageNames = "todos" | "welcome" | "login" | "signup" | "account";

type PagePaths = "/" | "/welcome" | "/login" | "/signup" | "/account";

export const $pages: Record<PageNames, HTMLElement> = {
  todos: $todosPage,
  login: $loginPage,
  welcome: $welcomePage,
  signup: $signupPage,
  account: $accountPage,
};

import { getAuth } from "./modules/auth";
import { startLoginPage } from "./pages/login-page";
import { startWelcomePage } from "./pages/welcome-page";
import { startTodoPage } from "./pages/todo-page";
import { startSignupPage } from "./pages/signup-page";
import { startAccountPage } from "./pages/account-page";

const startPage: Record<PagePaths, (user: User | null) => void> = {
  "/": (user) => (user ? startTodoPage(user) : redirect.welcome()),
  "/welcome": (user) => (user ? redirect.todos() : startWelcomePage()),
  "/login": (user) => (user ? redirect.todos() : startLoginPage()),
  "/signup": (user) => (user ? redirect.todos() : startSignupPage()),
  // implement
  "/account": (user) => (user ? startAccountPage(user) : redirect.login()),
};

export async function updatePage(
  newPath?: PagePaths,
  query?: Record<string, string>
) {
  if (newPath) {
    history.pushState({}, "", newPath);
    if (query) {
      const url = new URL(window.location.href);
      Object.entries(query).forEach(([key, value]) => {
        url.searchParams.set(key, value);
      });
      history.pushState({}, "", url.toString());
    }
  }
  clearPages();
  const path = location.pathname as PagePaths;

  getAuth()
    .then((user) => {
      startPage[path](user);
    })
    .catch(() => {
      console.log(`cannot`);
      startPage[path](null);
    });
}

function clearPages() {
  Object.values($pages).forEach(($page) => {
    $page.className = "page";
    $page.innerHTML = ``;
  });
}

export const redirect: Record<PageNames, (props?: any) => void> = {
  todos: () => updatePage("/"),
  welcome: () => updatePage("/welcome"),
  login: () => updatePage("/login"),
  signup: () => updatePage("/signup"),
  account: () => updatePage("/account"),
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
