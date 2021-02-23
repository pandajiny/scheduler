import { GroupList } from "../../components/group/group-list";
import { TopBar } from "../../components/top-bar";
import { dbService } from "../../modules/db";
import { $template } from "../../modules/document";
import { getGroupsFromUid } from "../../modules/groups";
import { $pages, updatePage } from "../../router";

const $page = $pages.groups;
let user: User | null;
export async function startGroupsPage(u: User) {
  user = u;

  $page.classList.add("active");
  $page.innerHTML = ``;
  $page.append($template("group-page-template"));

  const topbarContainer = $page.querySelector(
    ".top-bar-container"
  ) as HTMLDivElement;
  topbarContainer.append(
    new TopBar({
      title: "Groups",
      handleBack: () => {
        updatePage("/todos");
      },
    })
  );

  const groups = await getGroupsFromUid(user.uid);
  dbService.updateGroups(groups);

  const $groupsContainer = $page.querySelector(
    ".group-list-container"
  ) as HTMLDivElement;
  $groupsContainer.append(new GroupList(groups));
}
