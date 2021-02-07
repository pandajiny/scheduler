import axios from "axios";
import { SERVER_URL } from "./constants";
import { handleGithubPages, updatePage } from "./router";

function bootstrap() {
  handleGithubPages(window.location);
  axios.defaults.baseURL = SERVER_URL;
  axios.defaults.withCredentials = true;
  updatePage();
  window.onpopstate = () => {
    updatePage();
  };
}

bootstrap();
