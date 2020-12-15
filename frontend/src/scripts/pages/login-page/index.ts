import { doLoginWithEmailAndPassword } from "../../modules/auth/login";
import { $loginPage, updatePage } from "../../navigate-page";

export function initLoginPage() {
  const $email = $loginPage.querySelector("#email-input") as HTMLInputElement;
  const $password = $loginPage.querySelector(
    "#password-input"
  ) as HTMLInputElement;

  const $message = document.getElementById(
    "login-message"
  ) as HTMLParagraphElement;
  const $loginButton = $loginPage.querySelector(
    "#login-button"
  ) as HTMLButtonElement;
  $loginButton.addEventListener("click", doLogin);

  function doLogin() {
    const email = $email.value;
    const password = $password.value;
    doLoginWithEmailAndPassword({
      email,
      password,
    })
      .catch((err) => {
        $message.textContent = err;
        throw err;
      })
      .then(() => {
        updatePage("todos");
      });
  }

  const $signupButton = document.getElementById(
    "signup-button"
  ) as HTMLButtonElement;
  $signupButton.addEventListener("click", () => updatePage("login"));
}
