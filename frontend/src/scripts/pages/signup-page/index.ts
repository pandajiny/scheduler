import { doSignUp } from "../../modules/auth";
import { $pages, redirect } from "../../router";

const $page = $pages.signup;
export function startSignupPage() {
  $page.classList.add("active");
  $page.innerHTML = ``;
  const $template = document.getElementById(
    "signup-page-template"
  ) as HTMLTemplateElement;

  $page.appendChild($template.content.cloneNode(true));

  const $title = $page.querySelector(".title") as HTMLParagraphElement;

  const $name = $page.querySelector(".input-name") as HTMLInputElement;
  const $email = $page.querySelector(".input-email") as HTMLInputElement;
  const $password = $page.querySelector(".iuput-password") as HTMLInputElement;
  const $confirm = $page.querySelector(
    ".iuput-password-confirm"
  ) as HTMLInputElement;

  const clearForm = () => {
    $title.textContent = "Please Sign up with email";
    $name.value = "";
    $email.value = "";
    $password.value = "";
    $confirm.value = "";
  };

  const $buttonSubmit = $page.querySelector(
    ".button-submit"
  ) as HTMLButtonElement;

  const $buttonLogin = $page.querySelector(
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
