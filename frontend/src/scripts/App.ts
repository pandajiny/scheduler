import { LOGIN_PATH, navigateTo } from "../constants/paths";
import { doSignOut, getUser } from "./Modules/AuthModules";

export const renderNavigator = (navItems: NavItem[]) => {
  const $navigator = document.getElementById("navigator") as HTMLDivElement;
  $navigator.innerHTML = "";
  navItems.map((navItem) => {
    const $navItem = document.createElement("a");
    $navItem.id = "nav-item";
    $navItem.appendChild(document.createTextNode(navItem.title));
    $navItem.addEventListener("click", () => navigateTo(navItem.pathname));
    $navigator.appendChild($navItem);
  });
};

export async function renderUserState(): Promise<User | null> {
  const $userState = document.getElementById("user-state") as HTMLDivElement;
  $userState.innerHTML = "";

  const user = await getUser().catch((err) => {
    throw err;
  });
  console.log(`got user state`, user);
  if (!user) {
    const $loginRequire = document.createElement("div");
    $loginRequire.appendChild(document.createTextNode("please login first"));
    $userState.appendChild($loginRequire);

    const $loginButton = document.createElement("button");
    $loginButton.appendChild(document.createTextNode("LOGIN"));
    $loginButton.addEventListener("click", () => {
      navigateTo(LOGIN_PATH);
    });
    $userState.appendChild($loginButton);
    return null;
  } else {
    const $user = document.createElement("p");
    $user.appendChild(document.createTextNode(`Welcome ` + user.email));
    $userState.appendChild($user);

    const $signoutButton = document.createElement("button");
    $signoutButton.className = "text-button";
    $signoutButton.appendChild(document.createTextNode("SIGNOUT?"));
    $signoutButton.addEventListener("click", () => {
      doSignOut().then(() => {
        window.location.reload();
      });
    });
    $userState.appendChild($signoutButton);
    return user;
  }
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

let url = "https://pandajiny.shop/";

export const isDevMode: boolean =
  process.env.NODE_ENV?.includes("DEV") || false;

export const isLocalMode: boolean =
  process.env.NODE_ENV?.includes("LOCAL") || false;

if (isLocalMode) {
  console.log(`app is local mode`);
  url = "http://localhost/";
}

if (isDevMode) {
  // init dev mode
  console.log(`app is dev mode`);
  fetch(url).then((res) => {
    if (res.ok) {
      console.log(`server activated`);
    } else {
      console.log(`server not responde, using localhost`);
      url = "http://localhost/";
    }
  });
}

export const serverUrl = url;
