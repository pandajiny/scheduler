import { updatePage, navigateTo } from "./router";

type RunningMode = "DEV" | "LOCAL" | "PRODUCTION";
export let RUNNING_MODE: RunningMode = "PRODUCTION";
if (process.env.NODE_ENV?.includes("DEV") || false) {
  RUNNING_MODE = "DEV";
} else if (process.env.NODE_ENV?.toString().includes("LOCAL") || false) {
  RUNNING_MODE = "LOCAL";
}
if (RUNNING_MODE != "PRODUCTION") {
  console.log(`server is running as ${RUNNING_MODE}`);
}

if (!process.env.SERVER_URL) {
  throw "cannot parse serverUrl";
}

const SERVER_URLS: Record<RunningMode, string> = {
  DEV: `http://${location.hostname}`,
  LOCAL: `http://${location.hostname}`,
  PRODUCTION: process.env.SERVER_URL,
};

export const serverUrl = SERVER_URLS[RUNNING_MODE];

initialApp();

function initialApp() {
  updatePage();

  const $modalContainer = document.querySelector(
    ".modal-container"
  ) as HTMLElement;
  $modalContainer.onclick = (ev) => {
    console.log(`hi`);
    ev.cancelBubble = false;
  };
}

// ----------- need to move document modules
import { doSignOut } from "./modules/auth";

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
        navigateTo.login();
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
    navigateTo.login();
  };
  $loginButton.addEventListener("click", handleLoginButtonClick);
}

export function keyInputListener(ev: KeyboardEvent, onSubmit: () => void) {
  if (ev.key == "Enter") {
    onSubmit();
  }
}

// if (RUNNING_MODE == ) {
//   serverUrl = "http://localhost";
//   console.log(`app is local mode server url : ${serverUrl}`);
// } else if (isDevMode) {
//   // init dev mode
//   console.log(`app is dev mode`);
//   fetch(serverUrl).then((res) => {
//     if (res.ok) {
//       console.log(`server activated`);
//     } else {
//       console.log(`server not responde, using localhost`);
//       serverUrl = "http://localhost";
//     }
//   });
// }
