import axios from "axios";
import { getCookie } from "./modules/DocumnetModules";
import { updatePage } from "./router";

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
  const token = getCookie("token");
  axios.defaults.baseURL = serverUrl;
  axios.defaults.headers.common[`Authorization`] = `Bearer ${token}`;
  updatePage();
}

export function keyInputListener(ev: KeyboardEvent, onSubmit: () => void) {
  if (ev.key == "Enter") {
    onSubmit();
  }
}
