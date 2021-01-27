import { $AccountState } from "../../components/account/account-state";
import { $pages } from "../../router";

interface ListProps {
  title?: string;
  items: NavItem[];
}

interface NavItem {
  title: string;
}

interface SideBarProps {
  user: User | null;
  groups: Group[];
}

const $todosPage = $pages.todos;
export async function updateSideBar(props: SideBarProps) {
  const { user, groups } = props;
  const $container = $todosPage.querySelector(
    ".side-bar-container"
  ) as HTMLDivElement;

  $container.innerHTML = ``;

  const $sidebar = document.createElement("div");
  $sidebar.className = "side-bar";

  const $template = document.getElementById(
    "side-bar-template"
  ) as HTMLTemplateElement;

  const $account = $template.content.querySelector(
    ".account-state-container"
  ) as HTMLElement;

  const $menu = $template.content.querySelector(
    ".menu-container"
  ) as HTMLDivElement;

  $account.appendChild($AccountState(user));

  $menu.appendChild(
    $List({
      title: "Todos",
      items: groups.map((group) => {
        return {
          title: group.group_name,
        };
      }),
    })
  );

  $sidebar.appendChild($template.content.cloneNode(true));
  const $empty = $sidebar.querySelector(".empty-space") as HTMLElement;

  $empty.onclick = () => {
    $container.classList.remove("active");
  };

  $container.appendChild($sidebar);
}

function $List(props: ListProps): HTMLUListElement {
  const { items, title } = props;
  const $list = document.createElement("ul");

  if (title) {
    const $title = document.createElement("h3");
    $title.textContent = title;
    $list.appendChild($title);
  }

  $list.append(
    ...items.map((item) => {
      const $item = document.createElement("li");

      $item.textContent = item.title;
      $item.onclick = () => {};

      return $item;
    })
  );

  return $list;
}
