import { serverUrl } from "../App";

export async function doLoginWithEmailAndPassword(request: LoginRequest) {
  const url = serverUrl + "auth/login";
  const response = await fetch(url, createPostOption(request));

  if (response.ok) {
    const result = ((await response.json()) as unknown) as LoginResult;
    localStorage.setItem("jwtToken", result.access_token);
  } else {
    const result = await response.json();
    throw result.message;
  }
}

export async function doSignOut(): Promise<ActionResult> {
  localStorage.removeItem("jwtToken");
  return {
    ok: true,
    message: `user sign out`,
  };
}

export const doSignUp = async (
  request: SignUpRequest
): Promise<ActionResult> => {
  const url = serverUrl + "auth/signup";
  const response = await fetch(url, createPostOption(request));
  if (!response.ok) {
    throw new Error("signup-failed");
  }
  const result = ((await response.json()) as unknown) as LoginResult;

  localStorage.setItem("jwtToken", result.access_token);
  console.log(`signup done`);
  return {
    ok: true,
    message: `signup ok`,
  };
  // const result = await response.json() as unknown as SignupResu
};

export const getUser = async (): Promise<User | null> => {
  const url = serverUrl + "auth/user";
  const response = await fetch(url, { headers: getAuthHeader() });
  const result = (await response.json()) as User;
  console.log(result);
  return result.email && result.uid ? result : null;
};

export const getProfile = async () => {
  const url = serverUrl + "profile";

  fetch(url, {
    headers: getAuthHeader(),
  }).then((resp) => {
    resp.json().then((data) => {
      console.log(data);
    });
  });
};

export const getAuthHeader = () => {
  const token = localStorage.getItem("jwtToken");
  return {
    Authorization: `Bearer ${token}`,
  };
};

export const createPostOption = (body: Object): RequestInit => {
  return {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  };
};

export const createAuthPostOption = (body: Object): RequestInit => {
  const token = localStorage.getItem("jwtToken");
  return {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  };
};
