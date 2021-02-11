import { BackButtonElement } from "../../custom-elements";
import { doSignout } from "../../modules/auth";
import { $template } from "../../modules/document";
import { $pages, updatePage } from "../../router";

const $page = $pages.account;
export function startAccountPage(user: User) {
  $page.classList.add("active");
  $page.innerHTML = ``;
  $page.append($template("account-page-template"));

  const $buttonBack = $page.querySelector("back-button") as BackButtonElement;
  const $name = $page.querySelector(".name") as HTMLParagraphElement;
  const $email = $page.querySelector(".email") as HTMLParagraphElement;
  const $buttonSignout = $page.querySelector(
    ".button-signout"
  ) as HTMLButtonElement;

  $buttonBack.onclick = () => {
    updatePage("/todos");
  };
  $name.textContent = user.name;
  $email.textContent = user.email;
  $buttonSignout.onclick = () => {
    doSignout().then(() => {
      updatePage("/login");
    });
  };
}
