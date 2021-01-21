import { $welcomePage, navigateTo } from "../../router";

export function initLoginRequirePage() {
  $welcomePage.classList.add("active");

  const $loginButton = $welcomePage.querySelector(
    "#login-button"
  ) as HTMLButtonElement;

  $loginButton.addEventListener("click", handleLoginButtonClick);

  function handleLoginButtonClick() {
    navigateTo.login();
  }
}
