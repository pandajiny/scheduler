import axios from "axios";
import { serverUrl } from "../../App";
import { setCookie } from "../document";

const validateForm = (request: SignUpRequest) => {
  const { email, name, password } = request;
  if (!email) {
    throw `Please fill email form`;
  }
  if (!name) {
    throw `Please fill name form`;
  }
  if (!password) {
    throw `Please fill password form`;
  }

  // Todo : Add validate email

  // Todo : Add validate password from rule
};

export const doSignUp = async (request: SignUpRequest): Promise<void> => {
  validateForm(request);

  const token = await axios
    .post<LoginResult>(`${serverUrl}/auth/signup`, request)
    .then((resp) => resp.data)
    .then((data) => data.access_token)
    .catch((err: HttpError) => {
      throw err.response.data.message;
    });

  if (token) {
    setCookie("token", token);
  } else {
    throw `Can't signup`;
  }
};
