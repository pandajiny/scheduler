import { $AccountState } from "../../components/account/account-state";
import { doSignOut, getUser } from "../../modules/auth";
import { navigateTo, updatePage } from "../../router";

const $modal = document.getElementById("account-info-modal") as HTMLElement;

export const setAccountInfoModal = function () {
  $modal.classList.add("active");
  initModal();
};

const closeModal = () => {
  $modal.classList.remove("active");
};

async function initModal() {
  const $account = $modal.querySelector(".account-state") as HTMLElement;
  const user = await getUser();
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
    doSignOut().then(closeModal).then(navigateTo.login);
  };
}
