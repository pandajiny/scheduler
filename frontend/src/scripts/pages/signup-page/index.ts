import { doSignUp } from "../../modules/auth";
import { $pages, redirect } from "../../router";

const $signupPage = $pages.signup;
export function startSignupPage() {
  $signupPage.classList.add("active");
  const $title = $signupPage.querySelector(".title") as HTMLParagraphElement;

  const $name = $signupPage.querySelector(".input-name") as HTMLInputElement;
  const $email = $signupPage.querySelector(".input-email") as HTMLInputElement;
  const $password = $signupPage.querySelector(
    ".iuput-password"
  ) as HTMLInputElement;
  const $confirm = $signupPage.querySelector(
    ".iuput-password-confirm"
  ) as HTMLInputElement;

  const clearForm = () => {
    $title.textContent = "Please Sign up with email";
    $name.value = "";
    $email.value = "";
    $password.value = "";
    $confirm.value = "";
  };

  const $buttonSubmit = $signupPage.querySelector(
    ".button-submit"
  ) as HTMLButtonElement;

  const $buttonLogin = $signupPage.querySelector(
    ".button-signup"
  ) as HTMLButtonElement;

  clearForm();

  $buttonSubmit.onclick = async () => {
    const name = $name.value;
    const email = $email.value;
    const password = $password.value;
    const confirm = $confirm.value;

    try {
      if (!confirm || confirm != password) {
        throw `Please check password is same`;
      }
      await doSignUp({
        name,
        email,
        password,
      })
        .then(redirect.todos)
        .then(clearForm);
    } catch (err) {
      $title.textContent = err;
    }
  };

  $buttonLogin.onclick = redirect.login;
}
