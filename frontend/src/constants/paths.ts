export const navigateTo = (pathname: string) => {
  if (location.hostname == "localhost") {
    window.location.pathname = pathname;
  } else {
    window.location.pathname = `scheduler/` + pathname;
  }
};

export const HOME_PATH = "index.html";

export const LOGIN_PATH = "login.html";
export const SIGNUP_PATH = "signup.html";
