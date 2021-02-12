import { $template } from "../../modules/document";

export class TopBar extends HTMLElement {
  constructor(title: string) {
    super();
    this.append($template("top-bar-template"));
    this.querySelector(".title")!.textContent = title;
  }
}

customElements.define("top-bar", TopBar);
