import { initLoginPage } from "./pages/login-page";
import { initLoginRequirePage } from "./pages/login-require-page";
import { initTodoPage } from "./pages/todo-page";

type PagePath = "todos" | "login" | "login-require";

export const $mainPage = document.getElementById("main-page") as HTMLDivElement;

export const $loginPage = document.getElementById(
  "login-page"
) as HTMLDivElement;

export const $loginRequirePage = document.getElementById(
  "login-require-page"
) as HTMLDivElement;

const $pages = [$mainPage, $loginPage, $loginRequirePage];

// initial script
updatePage("todos");

export function getPagePath(search: string): PagePath {
  return new URLSearchParams(search).get("page") as PagePath;
}

export function updatePage(page: PagePath) {
  console.log(`ver 1.111`);
  const isLocal = location.hostname == "localhost";
  console.log(`isLocal : ${isLocal}`);

  history.pushState({ hello: "world" }, "hello", `?page=${page}`);

  $pages.forEach(($page) => {
    $page.className = "page";
  });

  const path = getPagePath(location.search);
  console.log(path);

  switch (path) {
    case "todos":
      $mainPage.classList.add("active");
      initTodoPage();
      break;

    case "login":
      $loginPage.classList.add("active");
      initLoginPage();
      break;

    case "login-require":
      $loginRequirePage.classList.add("active");
      initLoginRequirePage();
      break;

    // default:
    //   console.log("404");
    //   updatePage("todos");
  }
}
