import { $AccountState } from "../../components/account/account-state";
import { dbService } from "../../modules/db";
import { $template } from "../../modules/document";
import { getTodos } from "../../modules/todo";
import { todosFilter } from "../../pages/todos";
import { queryChangeEvents, updateQuery } from "../../router";
import { NavItem } from "./nav-item";

export interface SideBarProps {
  user: User | null;
  groups: GroupDTO[];
}

export class SideBarElement extends HTMLElement {
  async handleUpdate(groupId?: string) {
    if (groupId) {
      updateQuery({ groupId });
    } else {
      updateQuery({ groupId });
    }
    getTodos(await todosFilter()).then(dbService.updateTodos);
  }

  close() {}

  constructor(props: SideBarProps) {
    super();
    this.append($template("side-bar-template"));
    this.close = () => {
      this.classList.remove("active");
    };

    const { user, groups } = props;

    const buttonBack = this.querySelector("back-button") as HTMLElement;
    buttonBack.onclick = this.close;

    const $account = this.querySelector(
      ".account-state-container"
    ) as HTMLElement;
    $account.appendChild($AccountState(user));

    const isActivated = (groupId: string | null): boolean => {
      const queryParams = new URLSearchParams(location.search);
      return queryParams.get("groupId") == groupId;
    };

    const updateItems = () => {
      const $items: HTMLElement[] = [
        new NavItem({
          title: "All todos",
          isActivated: isActivated(null),
          onclick: () => this.handleUpdate(),
        }),
        ...groups.map(
          (group) =>
            new NavItem({
              title: group.group_name,
              count: group.item_count,
              isActivated: isActivated(group.group_id),
              onclick: () => {
                this.handleUpdate(group.group_id);
              },
            })
        ),
      ];

      this.querySelector(".nav-list")!.innerHTML = "";
      this.querySelector(".nav-list")!.append(...$items);
    };

    queryChangeEvents.push(updateItems);
    updateItems();

    const $empty = this.querySelector(".empty-space") as HTMLElement;
    $empty.onclick = this.close;
  }
}
customElements.define("side-bar", SideBarElement);
