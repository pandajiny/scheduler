import { group } from "console";
import { GroupItem } from "./group-item";

export class GroupList extends HTMLElement {
  constructor(groups: GroupDTO[]) {
    super();
    this.append(...groups.map((group) => new GroupItem(group)));
  }
}

customElements.define("group-list", GroupList);
