import { doLoginWithEmailAndPassword } from "../../modules/auth";
import { $pages, updatePage } from "../../router";
const $page = $pages.login;

export function startLoginPage() {
  $page.classList.add("active");
  $page.innerHTML = ``;
  const $template = document.getElementById(
    "login-page-template"
  ) as HTMLTemplateElement;
  $page.appendChild($template.content.cloneNode(true));

  const $title = $page.querySelector(".title") as HTMLParagraphElement;
  const $email = $page.querySelector(".input-email") as HTMLInputElement;
  const $password = $page.querySelector(".iuput-password") as HTMLInputElement;

  const clearForm = () => {
    $title.textContent = `Please login with your email`;
    $email.value = ``;
    $password.value = ``;
  };

  const $buttonSubmit = $page.querySelector(
    ".button-submit"
  ) as HTMLButtonElement;

  const $buttonsignup = $page.querySelector(
    ".button-signup"
  ) as HTMLButtonElement;

  clearForm();

  $buttonSubmit.onclick = async () => {
    const email = $email.value;
    const password = $password.value;

    await doLoginWithEmailAndPassword({
      email,
      password,
    })
      .then(() => {
        updatePage("/todos");
      })
      .then(clearForm)
      .catch((err) => {
        $title.textContent = err;
      });
  };

  $buttonsignup.onclick = () => {
    updatePage("/todos");
  };
}
