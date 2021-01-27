import { $AccountState } from "../../components/account/account-state";
import { doSignout } from "../../modules/auth/signout";

const $modal = document.getElementById("account-info-modal") as HTMLElement;

export const setAccountInfoModal = function (user: User | null = null) {
  $modal.classList.add("active");
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
    doSignout();
    closeModal();
  };
}
