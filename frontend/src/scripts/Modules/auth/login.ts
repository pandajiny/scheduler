import { serverUrl } from "../../app";
import { setCookie } from "../DocumnetModules";

export function isLoggedIn(user: User | null): boolean {
  return user ? true : false;
}

export function isLoginFormFormatted(args: LoginRequest): boolean {
  const { email, password } = args;
  return email != "" && password != "";
}

export async function doLoginWithEmailAndPassword(
  request: LoginRequest
): Promise<ActionResult> {
  if (!isLoginFormFormatted(request)) {
    throw "Please fill the blanks";
  }

  const url = `${serverUrl}/auth/login`;
  console.log(url);
  const response = await fetch(url, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });

  const result = (await response.json()) as HttpResponse<LoginResult>;

  const token = result.data?.access_token;
  if (token) {
    setCookie("token", token);
    return {
      ok: true,
      message: `Login Success, Welcome ${request.email}`,
    };
  } else {
    return {
      ok: false,
      error_message: `cannot login`,
    };
  }
}

export async function doSignOut(): Promise<ActionResult> {
  setCookie("token", "");
  return {
    ok: true,
    message: `user sign out`,
  };
}
