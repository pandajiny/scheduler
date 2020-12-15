import { $loginRequirePage, updatePage } from "../../navigate-page";

export function initLoginRequirePage() {
  const $loginButton = $loginRequirePage.querySelector(
    "#login-button"
  ) as HTMLButtonElement;

  $loginButton.addEventListener("click", handleLoginButtonClick);

  function handleLoginButtonClick() {
    updatePage("login");
  }
}
