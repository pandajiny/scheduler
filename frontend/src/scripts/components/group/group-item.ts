import { $template } from "../../modules/document";
import { updatePage } from "../../router";

export class GroupItem extends HTMLElement {
  constructor(group: GroupDTO) {
    super();
    this.append($template("group-item-template"));
    const $count = this.querySelector("p")!;
    $count.textContent = `${group.item_count}개의 할일`;

    const $title = this.querySelector("h3")!;
    $title.textContent = group.group_name;
    $title.onclick = () => updatePage("/todos", { groupId: group.group_id });

    const $editButton = this.querySelector("edit-button") as HTMLButtonElement;
    $editButton.onclick = () => {
      console.log("hi");
    };
  }
}

customElements.define("group-item", GroupItem);
