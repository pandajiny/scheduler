import { $template } from "../../modules/document";

interface NavItemProps {
  title: string;
  count?: number;
  isActivated: boolean;
  onclick: () => void;
}

export class NavItem extends HTMLElement {
  constructor(props: NavItemProps) {
    super();
    this.append($template("nav-item-template"));
    if (props.isActivated) {
      this.classList.add("active");
    }
    this.onclick = props.onclick;
    this.querySelector(".title")!.textContent = props.title;
    if (props.count) {
      this.querySelector(".count")!.textContent = `${
        props.count > 9 ? "9+" : props.count
      }`;
    }
  }
}

customElements.define("nav-item", NavItem);
