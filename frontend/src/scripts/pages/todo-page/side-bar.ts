import { $AccountState } from "../../components/account/account-state";
import { $pages } from "../../router";

// interface ListProps {
//   title?: string;
//   items: NavItem[];
// }

interface NavItem {
  title: string;
}

interface SideBarProps {
  user: User | null;
  groups: Group[];
}

const $page = $pages.todos;
export async function updateSideBar(props: SideBarProps) {
  const { user, groups } = props;
  const $container = $page.querySelector(
    ".side-bar-container"
  ) as HTMLDivElement;
  function closeSidebar() {
    $container.classList.remove("active");
  }

  $container.innerHTML = ``;

  const $sidebar = document.createElement("div");
  $sidebar.className = "side-bar";

  const $template = document.getElementById(
    "side-bar-template"
  ) as HTMLTemplateElement;
  $sidebar.appendChild($template.content.cloneNode(true));

  const $buttonCancel = $sidebar.querySelector(
    ".cancel-button-container"
  ) as HTMLElement;
  $buttonCancel.onclick = closeSidebar;

  const $account = $sidebar.querySelector(
    ".account-state-container"
  ) as HTMLElement;

  const $navs = $sidebar.querySelector(".nav-list") as HTMLDivElement;

  $account.appendChild($AccountState(user));

  $navs.append(...groups.map((group) => $NavItem({ title: group.group_name })));

  const $empty = $sidebar.querySelector(".empty-space") as HTMLElement;

  $empty.onclick = closeSidebar;

  $container.appendChild($sidebar);
}

const $NavItem = (item: NavItem): HTMLLIElement => {
  const $item = document.createElement("li");
  $item.className = "nav-item";
  const $template = document.getElementById(
    "nav-item-template"
  ) as HTMLTemplateElement;
  $item.appendChild($template.content.cloneNode(true));
  const $title = $item.querySelector(".title") as HTMLParagraphElement;
  $title.textContent = item.title;
  return $item;
};

// function $List(props: ListProps): HTMLUListElement {
//   const { items, title } = props;
//   const $list = document.createElement("ul");

//   if (title) {
//     const $title = document.createElement("h3");
//     $title.textContent = title;
//     $list.appendChild($title);
//   }

//   $list.append(
//     ...items.map((item) => {
//       const $item = document.createElement("li");

//       $item.textContent = item.title;
//       $item.onclick = () => {};

//       return $item;
//     })
//   );

//   return $list;
// }
