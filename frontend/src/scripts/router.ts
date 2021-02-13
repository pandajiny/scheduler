const $welcomePage = document.getElementById("welcome-page") as HTMLDivElement;
const $todosPage = document.getElementById("todo-page") as HTMLDivElement;
const $groupsPage = document.getElementById("group-page") as HTMLDivElement;
const $loginPage = document.getElementById("login-page") as HTMLDivElement;
const $signupPage = document.getElementById("signup-page") as HTMLDivElement;
const $accountPage = document.getElementById("account-page") as HTMLDivElement;
export const $pages = {
  todos: $todosPage,
  groups: $groupsPage,
  login: $loginPage,
  welcome: $welcomePage,
  signup: $signupPage,
  account: $accountPage,
};

import { startLoginPage } from "./pages/login-page";
import { startTodoPage } from "./pages/todos";
import { startSignupPage } from "./pages/signup-page";
import { startAccountPage } from "./pages/account";
import { getAuth } from "./modules/auth";
import { startWelcomePage } from "./pages/welcome-page";
import { startGroupsPage } from "./pages/groups";

function clearPages() {
  Object.values($pages).forEach(($page) => {
    $page.className = "page";
    $page.innerHTML = ``;
  });
}
type AuthRoute = "/todos" | "/groups" | "/account";
type PublicRoute = "/welcome" | "/login" | "/signup";
type Route = AuthRoute | PublicRoute;

const startAuthPage: Record<AuthRoute, (user: User) => void> = {
  "/todos": (user: User) => startTodoPage(user),
  "/groups": (user: User) => startGroupsPage(user),
  "/account": (user: User) => startAccountPage(user),
};

const startPublicPage: Record<PublicRoute, () => void> = {
  "/login": startLoginPage,
  "/signup": startSignupPage,
  "/welcome": startWelcomePage,
};

function updateRoute(props: {
  route?: AuthRoute | PublicRoute;
  query?: Record<string, string>;
}) {
  const { query, route } = props;
  if (route) {
    history.pushState({}, "", route);
    if (query) {
      updateQuery(query);
    }
  }
}

function updateQuery(query: Record<string, string>) {
  const url = new URL(window.location.href);
  Object.entries(query).forEach(([key, value]) => {
    url.searchParams.set(key, value);
  });
  history.pushState({}, "", url.toString());
}

export async function updatePage(
  route?: AuthRoute | PublicRoute,
  query?: Record<string, string>
) {
  clearPages();
  updateRoute({
    query,
    route,
  });

  const path = location.pathname as Route;
  getAuth()
    .then((user) => {
      if (startAuthPage[path as AuthRoute] != undefined) {
        startAuthPage[path as AuthRoute](user);
      } else {
        updatePage("/todos");
      }
    })
    .catch(() => {
      if (startPublicPage[path as PublicRoute] != undefined) {
        startPublicPage[path as PublicRoute]();
      } else {
        updatePage("/welcome");
      }
    });
}

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
