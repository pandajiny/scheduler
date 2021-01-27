import { $pages, redirect } from "../../router";

const $page = $pages.welcome;

export function initLoginRequirePage() {
  $page.classList.add("active");

  const $buttonLogin = $page.querySelector(
    ".button-login"
  ) as HTMLButtonElement;

  const $buttonSignup = $page.querySelector(
    ".button-signup"
  ) as HTMLButtonElement;

  $buttonLogin.onclick = redirect.login;
  $buttonSignup.onclick = redirect.signup;
}
