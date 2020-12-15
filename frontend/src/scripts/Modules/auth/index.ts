import { serverUrl } from "../../App";
import { doGetRequest } from "../HttpsModles";

export async function doSignOut(): Promise<ActionResult> {
  localStorage.removeItem("jwtToken");
  return {
    ok: true,
    message: `user sign out`,
  };
}

export function isLoggedIn(user: User | null): boolean {
  return user ? true : false;
}

export const getUser = async (): Promise<User | null> => {
  const url = `${serverUrl}/auth/user`;
  const result = await doGetRequest<User>(url).catch((err_message) => {
    console.error(err_message);
    return null;
  });

  return result;
};

export function isLoginFormFormatted(args: LoginRequest): boolean {
  const { email, password } = args;
  return email != "" && password != "";
}
