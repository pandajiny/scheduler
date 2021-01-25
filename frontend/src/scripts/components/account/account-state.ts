export function $AccountState(user: User | null): HTMLElement {
  const $accountState = document.createElement("div");
  $accountState.className = "account-state";

  const $template = document.getElementById(
    "account-state-template"
  ) as HTMLTemplateElement;

  const $name = $template.content.querySelector(
    ".name"
  ) as HTMLParagraphElement;
  const $email = $template.content.querySelector(
    ".email"
  ) as HTMLParagraphElement;

  if (user) {
    const $account = $template.content.querySelector(
      ".account-container"
    ) as HTMLElement;
    $account.classList.add("active");
    $name.textContent = user.name;
    $email.textContent = user.email;
  } else {
    const $login = $template.content.querySelector(
      ".login-container"
    ) as HTMLElement;
    $login.classList.add("active");
  }

  $accountState.appendChild($template.content.cloneNode(true));

  return $accountState;
}
