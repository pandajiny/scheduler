export function getMonthString(monthIndex: number, isShort?: boolean) {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  if (isShort) {
    return monthNames[monthIndex].slice(0, 3);
  }
  return monthNames[monthIndex];
}

export function convertTimestampToString(
  timestamp: number | null,
  displayYear = false
): string {
  if (!timestamp) {
    return "";
  }
  const date = new Date(timestamp);
  if (displayYear) {
    return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
  } else {
    return `${date.getMonth() + 1}/${date.getDate()}`;
  }
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
