export function setEnterInputListener(ev: KeyboardEvent, callback: () => void) {
  if (ev.key == "Enter") {
    callback();
  }
}
