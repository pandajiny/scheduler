import { $renderTemplate, $template } from "./modules/document";

export class BackButtonElement extends HTMLElement {
  constructor() {
    super();
    this.append($template("back-button-template"));
  }
}

customElements.define("back-button", BackButtonElement);

export class TestElement extends HTMLElement {
  constructor(content: string) {
    super();
    this.innerHTML = `TEST ELEMENT ${content}`;
  }
}

customElements.define("test-element", TestElement);
