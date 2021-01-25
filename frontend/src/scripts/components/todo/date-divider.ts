import { getMonthString } from "../../modules/TimeModules";

export const $DateDivider = (datetime: number | null): HTMLElement => {
  const $divider = document.createElement("div");
  $divider.className = "date-divider";

  if (datetime) {
    const date = new Date(datetime);
    $divider.innerHTML = `
      <div class="container">
      <h3>${date.getDate()}</h3>
      <p>${getMonthString(date.getMonth(), true)}</p>
      </div>
      `;
  }
  return $divider;
};
