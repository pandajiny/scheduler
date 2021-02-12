import { $template } from "./modules/document";

class BackButton extends HTMLElement {
  constructor() {
    super();
    this.append($template("back-button-template"));
  }
}

customElements.define("back-button", BackButton);

class SettingButton extends HTMLElement {
  constructor() {
    super();
    this.append($template("setting-button-template"));
  }
}

customElements.define("setting-button", SettingButton);
