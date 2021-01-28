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

  const clearForm = () => {
    $title.textContent = `Please login with your email`;
    $email.value = ``;
    $password.value = ``;
  };

  const $buttonSubmit = $loginPage.querySelector(
    ".button-submit"
  ) as HTMLButtonElement;

  const $buttonsignup = $loginPage.querySelector(
    ".button-signup"
  ) as HTMLButtonElement;

  clearForm();

  $buttonSubmit.onclick = async () => {
    const email = $email.value;
    const password = $password.value;

    try {
      await doLoginWithEmailAndPassword({
        email,
        password,
      })
        .then(redirect.todos)
        .then(clearForm);
    } catch (err) {
      $title.textContent = err;
    }
  };

  $buttonsignup.onclick = redirect.signup;
}
