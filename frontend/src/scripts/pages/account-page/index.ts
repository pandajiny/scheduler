import { $renderTemplate } from "../../modules/document";
import { $pages } from "../../router";

const $page = $pages.account;
export function startAccountPage(user: User) {
  $page.classList.add("active");
  $renderTemplate($page, `account-page-template`);
}
