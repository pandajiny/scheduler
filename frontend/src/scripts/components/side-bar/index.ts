import { $AccountState } from "../../components/account/account-state";
import { $template } from "../../modules/document";
import { updatePage } from "../../router";
import { NavItemElement } from "./nav-item";

export interface SideBarProps {
  user: User | null;
  groups: Group[];
}

export class SideBarElement extends HTMLElement {
  constructor(props: SideBarProps) {
    super();
    this.append($template("side-bar-template"));

    const { user, groups } = props;
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
      new NavItemElement({
        title: "All todos",
        isActivated: isActivated(null),
        onclick: () => {
          updatePage("/todos");
        },
      }),
      ...groups.map(
        (group) =>
          new NavItemElement({
            title: group.group_name,
            isActivated: isActivated(group.group_id),
            onclick: () => {
              const groupId = group.group_id;
              updatePage("/todos", { groupId });
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
