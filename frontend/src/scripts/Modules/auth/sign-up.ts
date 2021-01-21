import { serverUrl } from "../../app";
import { doPostRequest } from "..//http";

export const doSignUp = async (
  request: SignUpRequest
): Promise<ActionResult> => {
  const url = `${serverUrl}/auth/signup`;
  const result = await doPostRequest<LoginResult>({
    url,
    body: request,
  });

  localStorage.setItem("jwtToken", result.access_token);
  return {
    ok: true,
    message: `signup done ${request.email}`,
  };
};
