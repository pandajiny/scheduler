import { $pages, redirect } from "../../router";

const $page = $pages.welcome;

export function initLoginRequirePage() {
  $page.classList.add("active");

  const $loginButton = $page.querySelector(
    "#login-button"
  ) as HTMLButtonElement;

  $loginButton.onclick = redirect.login;
}
