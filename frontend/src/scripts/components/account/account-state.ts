export function $AccountState(user: User | null): HTMLElement {
  const $accountState = document.createElement("div");
  $accountState.className = "account-state";

  const $template = document.getElementById(
    "account-state-template"
  ) as HTMLTemplateElement;

  $accountState.appendChild($template.content.cloneNode(true));

  const $name = $accountState.querySelector(".name") as HTMLParagraphElement;
  const $email = $accountState.querySelector(".email") as HTMLParagraphElement;

  if (user) {
    const $account = $accountState.querySelector(
      ".account-container"
    ) as HTMLElement;
    $account.classList.add("active");
    $name.textContent = user.name;
    $email.textContent = user.email;
  } else {
    const $login = $accountState.querySelector(
      ".login-container"
    ) as HTMLElement;
    $login.classList.add("active");
  }

  return $accountState;
}
