import { HOME_PATH, SIGNUP_PATH, navigateTo } from "../../constants/paths";
import { renderNavigator } from "../App";
import { doLoginWithEmailAndPassword } from "../AuthModule";

// renderNavigator([{ title: "go home", pathname: HOME_PATH }]);

const $email = document.getElementById("email-input") as HTMLInputElement;
const $password = document.getElementById("password-input") as HTMLInputElement;
const $loginButton = document.getElementById(
  "login-button"
) as HTMLButtonElement;

$loginButton.addEventListener("click", function () {
  const email = $email.value;
  const password = $password.value;
  // validation
  if (isFormatted(email, password)) {
    doLoginWithEmailAndPassword({
      email,
      password,
    })
      .catch((err) => {
        $message.textContent = err;
        throw err;
      })
      .then(() => {
        console.log(`login passed, will redirect to home`);
        // navigateTo(HOME_PATH);
      });
  } else {
    $message.textContent = "Please fill blanks";
    console.error(`user not filled input`);
  }
});

const $signupButton = document.getElementById(
  "signup-button"
) as HTMLButtonElement;
$signupButton.addEventListener("click", () => navigateTo(SIGNUP_PATH));

const $message = document.getElementById(
  "login-message"
) as HTMLParagraphElement;

function isFormatted(email: string, _password: string): boolean {
  return email != "" && _password != "";
}
