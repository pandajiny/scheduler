import { serverUrl } from "../App";

export function getAuthHeader(): AuthHeader | null {
  const token = localStorage.getItem("jwtToken") || null;
  if (!token) {
    return null;
  }

  return {
    Authorization: `Bearer ${token}`,
  };
}

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
};

export const getUser = async (): Promise<User | null> => {
  const url = serverUrl + "auth/user";
  const headers = getAuthHeader();
  if (!headers) {
    return null;
  }

  const response = await fetch(url, {
    headers,
  });

  const result = (await response.json()) as User;
  console.log(result);
  return result.email && result.uid ? result : null;
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
