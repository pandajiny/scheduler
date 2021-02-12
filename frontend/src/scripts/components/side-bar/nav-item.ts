import { $template } from "../../modules/document";

interface NavItemProps {
  title: string;
  isActivated: boolean;
  onclick: () => void;
}

export class NavItemElement extends HTMLElement {
  constructor(props: NavItemProps) {
    super();
    this.append($template("nav-item-template"));
    if (props.isActivated) {
      this.classList.add("active");
    }
    this.onclick = props.onclick;
    this.querySelector(".title")!.textContent = props.title;
  }
}

customElements.define("nav-item", NavItemElement);
