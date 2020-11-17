import { LOGIN_PATH, navigateTo } from "../constants/paths";
import { doSignOut } from "./Modules/AuthModules";

export function $renderAccountState(props: {
  $container: HTMLElement;
  user: User | null;
}) {
  const { $container, user } = props;
  if (user) {
    $renderUserState({ $container, user });
  } else {
    $renderLoginRequire({ $container });
  }
}

function $renderUserState(props: { $container: HTMLElement; user: User }) {
  const { user, $container } = props;
  const { email, name } = user;
  $container.innerHTML = `
  <div id="user-information">
    <p id="name">${name}</p>
    <p id="email">${email}</p>
  </div>
  <div id="account-actions">
    <a>Profile</a>
    <a id="signout-button">Sign out</a>
  </div>
`;
  const $signOutButton = document.getElementById(
    "signout-button"
  ) as HTMLButtonElement;

  const handleSignUpButtonClick = () => {
    doSignOut().then((result) => {
      if (result.ok) {
        navigateTo(LOGIN_PATH);
      }
    });
  };

  $signOutButton.addEventListener("click", handleSignUpButtonClick);
}

function $renderLoginRequire(props: { $container: HTMLElement }) {
  const { $container } = props;
  $container.innerHTML = `
    <div id="login-require">
      <button id="login-button">LOG IN</button>
    </div>
`;
  const $loginButton = document.getElementById(
    "login-button"
  ) as HTMLButtonElement;
  const handleLoginButtonClick = () => {
    navigateTo(LOGIN_PATH);
  };
  $loginButton.addEventListener("click", handleLoginButtonClick);
}

export function $createButtonElement(props: {
  id?: string;
  className?: string;
  onClick?: () => void;
  content: string;
}): HTMLButtonElement {
  const { id, className, onClick, content } = props;
  const $button = document.createElement("button");
  if (id) {
    $button.id = id;
  }
  if (className) {
    $button.className = className;
  }
  if (onClick) {
    $button.addEventListener("click", onClick);
  }
  $button.appendChild(document.createTextNode(content));
  return $button;
}

export function $createParagraphElement(props: {
  id?: string;
  className?: string;
  text: string;
  type: string;
}) {
  const { className, text, type } = props;
  const $element = document.createElement(type);
  if (className) {
    $element.className = className;
  }
  $element.appendChild(document.createTextNode(text));
  return $element;
}

export function $createInputElement(props: {
  id?: string;
  className?: string;
  placeholder?: string;
  value?: string;
  onSubmit?: (v: string) => Promise<void>;
}): HTMLInputElement {
  const { id, className, placeholder, value, onSubmit } = props;
  const $input = document.createElement(`input`);
  if (id) {
    $input.id = id;
  }
  if (className) {
    $input.className = className;
  }
  if (placeholder) {
    $input.placeholder = placeholder;
  }
  if (value) {
    $input.value = value;
  }
  if (onSubmit) {
    $input.addEventListener("keypress", (ev: KeyboardEvent) => {
      if (ev.key == "Enter") {
        onSubmit($input.value).then(() => {
          $input.value = ``;
        });
      }
    });
  }

  return $input;
}

export function keyInputListener(ev: KeyboardEvent, onSubmit: () => void) {
  if (ev.key == "Enter") {
    onSubmit();
  }
}

export function $createContainer(props: {
  id?: string;
  className?: string;
  $elements?: HTMLElement[];
}): HTMLElement {
  const { $elements, className, id } = props;
  const $container = document.createElement("div");

  if (id) {
    $container.id = id;
  }

  if (className) {
    $container.className = className;
  }

  if ($elements) {
    $elements.map(($element) => {
      $container.appendChild($element);
    });
  }

  return $container;
}

export let serverUrl = "https://pandajiny.shop/";
export const isDevMode: boolean =
  process.env.NODE_ENV?.includes("DEV") || false;

export const isLocalMode: boolean =
  process.env.NODE_ENV?.toString().includes("LOCAL") || false;

if (isLocalMode) {
  serverUrl = "http://localhost/";
  console.log(`app is local mode server url : ${serverUrl}`);
} else if (isDevMode) {
  // init dev mode
  console.log(`app is dev mode`);
  fetch(serverUrl).then((res) => {
    if (res.ok) {
      console.log(`server activated`);
    } else {
      console.log(`server not responde, using localhost`);
      serverUrl = "http://localhost/";
    }
  });
}
