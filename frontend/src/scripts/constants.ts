import { config } from "dotenv";
config();
export const SERVER_URL = (() => {
  let value;
  if (!process.env.NODE_ENV?.includes("dev")) {
    value = process.env["SERVER_URL"];
  } else {
    value = process.env["SERVER_URL_LOCAL"];
  }
  if (!value) {
    throw `Cannot parse SERVER_URL`;
  }
  return value;
})();
