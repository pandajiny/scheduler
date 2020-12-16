import { isLoginFormFormatted } from ".";
import { serverUrl } from "../../App";

export async function doLoginWithEmailAndPassword(
  request: LoginRequest
): Promise<ActionResult> {
  if (!isLoginFormFormatted(request)) {
    throw "Please fill the blanks";
  }

  const url = `${serverUrl}/auth/login`;
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
    localStorage.setItem("jwtToken", token);
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
