import axios from "axios";
import { redirect } from "../../router";
import { parseErrorResponse } from "../http";

export const getAuth = async (): Promise<User> => {
  return await axios.get<User>(`/auth`).then((resp) => resp.data);
};

const validateLoginForm = (request: LoginRequest) => {
  const { email, password } = request;
  if (!email) {
    throw `Please fill email form`;
  }

  if (!password) {
    throw `Please fill password form`;
  }

  // Todo : add email validation

  // Todo : add password rule validation
};

export async function doLoginWithEmailAndPassword(request: LoginRequest) {
  validateLoginForm(request);
  await axios.post(`/auth`, request).catch((err: HttpError) => {
    throw parseErrorResponse(err).message;
  });
}

export async function doSignout() {
  await axios
    .delete("/auth")
    .then(redirect.welcome)
    .catch((err) => {
      throw parseErrorResponse(err).message;
    });
}

const validateSignUpForm = (request: SignUpRequest) => {
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
  validateSignUpForm(request);

  await axios.post<LoginResult>(`/auth/signup`, request).catch((err) => {
    throw parseErrorResponse(err).message;
  });
};
