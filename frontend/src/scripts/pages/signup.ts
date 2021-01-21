// import { doSignUp } from "../modules/Auth../";

// const $message = document.getElementById(
//   "signup-message"
// ) as HTMLParagraphElement;
// const $name = document.getElementById("name-input") as HTMLInputElement;
// const $email = document.getElementById("email-input") as HTMLInputElement;
// const $password = document.getElementById("password-input") as HTMLInputElement;
// const $passwordConfirm = document.getElementById(
//   "password-confirm"
// ) as HTMLInputElement;

// const $signupButton = document.getElementById(
//   "signup-button"
// ) as HTMLButtonElement;

// const validate = (props: {
//   email: string;
//   password: string;
//   passwordConfirm: string;
// }): Boolean => {
//   const { email, password, passwordConfirm } = props;
//   //   todo : need to add email validator
//   if (!email) {
//     return false;
//   }
//   if (!password) {
//     return false;
//   }
//   if (!passwordConfirm || password != passwordConfirm) {
//     return false;
//   }
//   return true;
// };

// $signupButton.addEventListener("click", () => {
//   const name = $name.value;
//   const email = $email.value;
//   const password = $password.value;
//   const passwordConfirm = $passwordConfirm.value;
//   if (validate({ email, password, passwordConfirm })) {
//     doSignUp({ name, email, password })
//       .then(() => {
//         navigateTo(HOME_PATH);
//       })
//       .catch((err) => {
//         $message.textContent = `${err.message}`;
//         $password.value = ``;
//         $passwordConfirm.value = ``;
//       });
//   }
// });

// const $loginButton = document.getElementById(
//   "login-button"
// ) as HTMLButtonElement;
// $loginButton.addEventListener("click", () => {
//   navigateTo(LOGIN_PATH);
// });
