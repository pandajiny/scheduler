import { $template } from "./modules/document";

export class BackButton extends HTMLElement {
  constructor() {
    super();
    this.append($template("back-button-template"));
  }
}

customElements.define("back-button", BackButton);

export class SettingButton extends HTMLElement {
  constructor() {
    super();
    this.append($template("setting-button-template"));
  }
}

customElements.define("setting-button", SettingButton);

export class EditButton extends HTMLElement {
  constructor() {
    super();
    this.append($template("edit-button-template"));
  }
}

customElements.define("edit-button", EditButton);
