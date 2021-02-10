import "regenerator-runtime/runtime";
import "./custom-elements";

import axios from "axios";
import { AUTH_SERVICE_URL, SCHEDULER_SERVICE_URL } from "./constants";
import { handleGithubPages, updatePage } from "./router";

export const AuthService = axios.create({
  baseURL: AUTH_SERVICE_URL,
  withCredentials: true,
});

export const SchedulerService = axios.create({
  baseURL: SCHEDULER_SERVICE_URL,
  withCredentials: true,
});

function bootstrap() {
  handleGithubPages(window.location);
  updatePage();
  window.onpopstate = () => {
    updatePage();
  };
}

bootstrap();
