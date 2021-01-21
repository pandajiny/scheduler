export function setEnterInputListener(ev: KeyboardEvent, callback: () => void) {
  if (ev.key == "Enter") {
    callback();
  }
}
export function getUserIdFromUrl(): string | null {
  return new URL(location.href).searchParams.get("user_id");
}

export function getGroupIdFromUrl(): string | null {
  return new URL(location.href).searchParams.get("group_id");
}

export function setCookie(key: string, value: string) {
  document.cookie = `${key}=${value};path=/`;
}

export function getCookie(key: string): string | undefined {
  const cookies = document.cookie.split(";");
  return cookies
    .find((value) => value.includes(key))
    ?.split(`${key}=`)
    .join("");
}
