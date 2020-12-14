import { getAuthHeader } from "./AuthModules";

export async function doGetRequest<T>(url: string): Promise<T> {
  // set headers
  const headers = getAuthHeader();
  if (!headers) {
    throw `Please login first`;
  }

  console.log(`get request to ${url}`);
  const response = await fetch(url, { headers });

  if (!response.ok) {
    throw new Error(await response.json());
  }

  const result = (await response.json()) as HttpResponse<T>;

  if (!result.ok || !result.data) {
    throw result.error_message;
  }

  return result.data;
}

export async function doPostRequest<T>() {}
