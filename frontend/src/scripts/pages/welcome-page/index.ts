import { $pages, redirect } from "../../router";

const $page = $pages.welcome;

export function startWelcomePage() {
  $page.classList.add("active");
  $page.innerHTML = ``;

  const $template = document.getElementById(
    "welcome-page-template"
  ) as HTMLTemplateElement;

  $page.appendChild($template.content.cloneNode(true));
  const $buttonLogin = $page.querySelector(
    ".button-login"
  ) as HTMLButtonElement;

  const $buttonSignup = $page.querySelector(
    ".button-signup"
  ) as HTMLButtonElement;

  $buttonLogin.onclick = redirect.login;
  $buttonSignup.onclick = redirect.signup;
}
