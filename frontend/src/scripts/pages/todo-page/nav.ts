import { getGroupIdFromUrl } from ".";
import { addGroup } from "../../modules/TodoModules";

export function $initialNavContainer(args: {
  userId: string;
  onUpdate: () => void;
}) {
  const { userId } = args;
  const $createGroupButton = document.getElementById(
    "create-group-button"
  ) as HTMLButtonElement;

  $createGroupButton.addEventListener("click", () => {
    const groupName = prompt(`new group name`, `GROUP NAME`);
    if (groupName) {
      addGroup({ groupName, userId }).then(args.onUpdate);
    }
  });
}

export function $updateNavItems(props: {
  userId: string;
  groups: Group[];
  onUpdate: () => void;
}) {
  const { groups, userId } = props;

  const $groups = document.getElementById("group-list") as HTMLElement;
  $groups.innerHTML = ``;
  $groups.style.display = `block`;

  const $groupNavMessage = document.querySelector(
    "#nav-group-container > .nav-message"
  ) as HTMLParagraphElement;
  $groupNavMessage.textContent = "";
  $groupNavMessage.style.display = `none`;

  groups.forEach((group) => {
    const $navItem = document.createElement("li") as HTMLElement;
    const path = getGroupIdFromUrl();
    $navItem.className = `nav-item ${path == group.group_id && `selected`}`;
    $navItem.id = `nav-${group.group_id}`;
    $navItem.innerHTML = `
          <label class="nav-symbol">🗹</label>
          <p>${group.group_name}</p>
        `;
    $navItem.addEventListener("click", () => {
      history.pushState(
        {},
        "",
        `?page=todos&user_id=${userId}&group_id=${group.group_id}`
      );
      props.onUpdate();
    });
    $groups.appendChild($navItem);
  });
}
