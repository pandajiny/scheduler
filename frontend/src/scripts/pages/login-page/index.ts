import { doLoginWithEmailAndPassword } from "../../modules/auth/login";
import { $pages, redirect } from "../../router";

const $loginPage = $pages.login;

export function startLoginPage() {
  $loginPage.classList.add("active");
  const $title = $loginPage.querySelector(".title") as HTMLParagraphElement;

  const $email = $loginPage.querySelector(".input-email") as HTMLInputElement;
  const $password = $loginPage.querySelector(
    ".iuput-password"
  ) as HTMLInputElement;

  const $buttonSubmit = $loginPage.querySelector(
    ".button-submit"
  ) as HTMLButtonElement;

  const $buttonsignup = $loginPage.querySelector(
    ".button-signup"
  ) as HTMLButtonElement;

  $email.value = "";
  $password.value = "";

  $buttonSubmit.onclick = async () => {
    const email = $email.value;
    const password = $password.value;

    try {
      await doLoginWithEmailAndPassword({
        email,
        password,
      }).then(redirect.todos);
    } catch (err) {
      $title.textContent = err;
    }
  };

  $buttonsignup.onclick = redirect.signup;
}
