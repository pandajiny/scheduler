import { isLoginFormFormatted } from ".";
import { serverUrl } from "../../App";
import { doPostRequest } from "../HttpsModles";

export async function doLoginWithEmailAndPassword(
  request: LoginRequest
): Promise<ActionResult> {
  if (!isLoginFormFormatted(request)) {
    throw "Please fill the blanks";
  }

  const url = `${serverUrl}/auth/login`;
  const result = await doPostRequest<LoginResult>({
    url,
    body: request,
  }).catch((e) => {
    throw e;
  });

  localStorage.setItem("jwtToken", result.access_token);
  return {
    ok: true,
    message: `Login Success, Welcome ${request.email}`,
  };
}
