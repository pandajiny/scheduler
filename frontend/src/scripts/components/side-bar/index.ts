import { $AccountState } from "../../components/account/account-state";
import { $template } from "../../modules/document";
import { NavItem } from "./nav-item";

export interface SideBarProps {
  user: User | null;
  groups: GroupDTO[];
  onUpdate: (groupId: string | null) => void;
}

export class SideBarElement extends HTMLElement {
  constructor(props: SideBarProps) {
    super();
    this.append($template("side-bar-template"));

    const { user, groups, onUpdate } = props;
    const closeSideBar = () => {
      this.classList.remove("active");
    };
    const queryParams = new URLSearchParams(location.search);

    const buttonBack = this.querySelector("back-button") as HTMLElement;
    buttonBack.onclick = closeSideBar;

    const $account = this.querySelector(
      ".account-state-container"
    ) as HTMLElement;
    $account.appendChild($AccountState(user));

    const isActivated = (groupId: string | null): boolean => {
      return queryParams.get("groupId") == groupId;
    };

    const $items: HTMLElement[] = [
      new NavItem({
        title: "All todos",
        isActivated: isActivated(null),
        onclick: () => {
          onUpdate(null);
        },
      }),
      ...groups.map(
        (group) =>
          new NavItem({
            title: group.group_name,
            count: group.item_count,
            isActivated: isActivated(group.group_id),
            onclick: () => {
              onUpdate(group.group_id);
            },
          })
      ),
    ];
    this.querySelector(".nav-list")!.append(...$items);
    const $empty = this.querySelector(".empty-space") as HTMLElement;
    $empty.onclick = closeSideBar;
  }
}
customElements.define("side-bar", SideBarElement);
