import { BackButton } from "../../custom-elements";
import { $template } from "../../modules/document";

export class TopBar extends HTMLElement {
  constructor(props: {
    title: string;
    handleBack?: () => void;
    handleSetting?: () => void;
  }) {
    super();
    const { title, handleBack, handleSetting } = props;
    this.append($template("top-bar-template"));
    this.querySelector(".title")!.textContent = title;
    if (handleBack) {
      const $backButton = this.querySelector("back-button") as BackButton;
      $backButton.classList.add("active");
      $backButton.onclick = handleBack;
    }

    if (handleSetting) {
      const $settingButton = this.querySelector(
        "setting-button"
      ) as HTMLElement;
      $settingButton.classList.add("active");
      $settingButton.onclick = handleSetting;
    }
  }
}

customElements.define("top-bar", TopBar);
