import { doLoginWithEmailAndPassword } from "../../modules/auth/login";
import { $loginPage, navigateTo } from "../../router";

export function initLoginPage() {
  $loginPage.classList.add("active");

  const $email = $loginPage.querySelector("#email-input") as HTMLInputElement;
  const $password = $loginPage.querySelector(
    "#password-input"
  ) as HTMLInputElement;

  const $message = document.getElementById(
    "login-title"
  ) as HTMLParagraphElement;
  const $loginButton = $loginPage.querySelector(
    "#login-button"
  ) as HTMLButtonElement;
  $loginButton.onclick = doLogin;

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
        navigateTo.todos();
      });
  }

  const $signupButton = document.getElementById(
    "signup-button"
  ) as HTMLButtonElement;
}
