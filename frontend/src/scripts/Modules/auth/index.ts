import { serverUrl } from "../../app";
import { doGetRequest } from "../http";

export * from "./login";
export * from "./sign-up";

export const getUser = async (): Promise<User | null> => {
  const url = `${serverUrl}/auth/user`;
  const result = await doGetRequest<User>(url).catch((err_message) => {
    console.error(err_message);
    return null;
  });

  return result;
};
