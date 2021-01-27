import axios from "axios";
import { redirect } from "../../router";
import { getCookie, setCookie } from "../DocumnetModules";

export function doSignout() {
  const token = getCookie("token");
  if (!token) {
    throw `user already signed out`;
  }

  setCookie("token", "");
  axios.defaults.headers.common[`Authorization`] = ``;
  redirect.welcome();
}
