import { config } from "dotenv";
config();
export const AUTH_SERVICE_URL = process.env["AUTH_SERVICE_URL"] as string;
export const SCHEDULER_SERVICE_URL = process.env[
  "SCHEDULER_SERVICE_URL"
] as string;

validatieConstants();

function validatieConstants() {
  if (!AUTH_SERVICE_URL) {
    throw `Cannot parse Auth service url`;
  }
  if (!SCHEDULER_SERVICE_URL) {
    throw `Cannot parse Scheduler service url`;
  }
}

// export const SERVER_URL = (() => {
//   let value;
//   if (!process.env.NODE_ENV?.includes("dev")) {
//     value = process.env["SERVER_URL"];
//   } else {
//     value = process.env["SERVER_URL_LOCAL"];
//   }
//   if (!value) {
//     throw `Cannot parse SERVER_URL`;
//   }
//   return value;
// })();
