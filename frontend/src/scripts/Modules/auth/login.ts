import axios from "axios";
import { serverUrl } from "../../App";
import { setCookie } from "../document";

export function isLoggedIn(user: User | null): boolean {
  return user ? true : false;
}

const validateForm = (request: LoginRequest) => {
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

export async function doLoginWithEmailAndPassword(
  request: LoginRequest
): Promise<void> {
  validateForm(request);
  console.log(`login`);
  const token = await axios
    .post<LoginResult>(`${serverUrl}/auth/login`, request)
    .then((res) => res.data)
    .then((data) => data.access_token)
    .catch((err: HttpError) => {
      throw err.response.data.message;
    });

  if (token) {
    setCookie("token", token);
    axios.defaults.headers.common[`Authorization`] = `Bearer ${token}`;
  } else {
    throw `Can't login`;
  }
}
