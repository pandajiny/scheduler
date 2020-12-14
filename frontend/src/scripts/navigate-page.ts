import { initLoginPage } from "./pages/login-page";
import { initLoginRequirePage } from "./pages/login-require-page";
import { initTodoPage } from "./pages/todo-page";

type Path = "/todos" | "/login" | "/login-require";

export const $mainPage = document.getElementById("main-page") as HTMLDivElement;

export const $loginPage = document.getElementById(
  "login-page"
) as HTMLDivElement;

export const $loginRequirePage = document.getElementById(
  "login-require-page"
) as HTMLDivElement;

const $pages = [$mainPage, $loginPage, $loginRequirePage];

// initial script
updatePage(location.pathname as Path);

export function updatePage(path: Path) {
  history.pushState({ hello: "world" }, "hello", path);

  $pages.forEach(($page) => {
    $page.className = "page";
  });

  switch (path) {
    case "/todos":
      $mainPage.classList.add("active");
      initTodoPage();
      break;

    case "/login":
      $loginPage.classList.add("active");
      initLoginPage();
      break;

    case "/login-require":
      $loginRequirePage.classList.add("active");
      initLoginRequirePage();
      break;

    default:
      console.log("404");
  }
}
