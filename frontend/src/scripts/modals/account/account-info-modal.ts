import { $AccountState } from "../../components/account/account-state";
import { doSignout } from "../../modules/auth";
import { updatePage } from "../../router";

const $modal = document.getElementById("account-info-modal") as HTMLElement;

export const setAccountInfoModal = function (user: User | null) {
  $modal.classList.add("active");
  $modal.innerHTML = ``;
  const $template = document.getElementById(
    "account-info-modal-template"
  ) as HTMLTemplateElement;
  $modal.appendChild($template.content.cloneNode(true));

  initModal(user);
};

const closeModal = () => {
  $modal.classList.remove("active");
};

async function initModal(user: User | null) {
  const $account = $modal.querySelector(".account-state") as HTMLElement;
  $account.innerHTML = $AccountState(user).innerHTML;

  const $buttonCancel = $modal.querySelector(
    ".button-cancel"
  ) as HTMLButtonElement;

  const $buttonSignout = $modal.querySelector(
    ".button-signout"
  ) as HTMLButtonElement;

  $buttonCancel.onclick = () => {
    closeModal();
  };

  $buttonSignout.onclick = () => {
    doSignout().then(() => {
      updatePage("/login");
    });
    closeModal();
  };
}
