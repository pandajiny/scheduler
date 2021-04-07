import { $template } from "../../modules/document";
import { $pages, updatePage } from "../../router";

const $page = $pages.welcome;

export function startWelcomePage() {
  $page.classList.add("active");
  $page.innerHTML = ``;
  $page.append($template("welcome-page-template"));

  const $buttonLogin = $page.querySelector(
    ".button-login"
  ) as HTMLButtonElement;
  $buttonLogin.onclick = () => {
    updatePage("/login");
  };

  const $buttonSignup = $page.querySelector(
    ".button-signup"
  ) as HTMLButtonElement;
  $buttonSignup.onclick = () => {
    updatePage("/signup");
  };
}
