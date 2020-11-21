export function convertTimestampToString(timestamp: number): string {
  const date = new Date(timestamp);
  return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
}

export function convertStringToTimestamp(dateString: string): number {
  const dateArgs = dateString
    .split("/")
    .join("")
    .split(".")
    .join("")
    .split("-")
    .map((t) => parseInt(t));
  return new Date(dateArgs[0], dateArgs[1] - 1, dateArgs[2]).getTime();
}
