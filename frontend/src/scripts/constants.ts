import { config } from "dotenv";
config();
export const AUTH_SERVICE_URL = !process.env.NODE_ENV?.includes("dev")
  ? (process.env["AUTH_SERVICE_URL"] as string)
  : (process.env["AUTH_SERVICE_URL_LOCAL"] as string);
export const SCHEDULER_SERVICE_URL = !process.env.NODE_ENV?.includes("dev")
  ? (process.env["SCHEDULER_SERVICE_URL"] as string)
  : (process.env["SCHEDULER_SERVICE_URL_LOCAL"] as string);
validatieConstants();

function validatieConstants() {
  if (!AUTH_SERVICE_URL) {
    throw `Cannot parse auth service url`;
  }
  if (!SCHEDULER_SERVICE_URL) {
    throw `Cannot parse scheduler service url`;
  }
}
