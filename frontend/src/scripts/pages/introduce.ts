const $sections: HTMLElement[] = [];
const $navs = document.querySelectorAll<HTMLAnchorElement>(`.nav`);

if (!$navs) {
  throw `cannot get nav items`;
}
$navs.forEach(($nav: HTMLAnchorElement) => {
  const id = $nav.href.slice($nav.href.indexOf(`#`) + 1, $nav.href.length);
  $sections.push(document.getElementById(id) as HTMLAnchorElement);
});

const offsets = $sections.map((e) => e.offsetTop);

window.onscroll = () => {
  const scrollPostion = window.pageYOffset;
  const index = offsets.findIndex((v) => v > scrollPostion);

  document.querySelectorAll(`.nav`).forEach(($nav) => {
    $nav.classList.remove(`active`);
  });
  const $section = $sections[index];
  if ($section) {
    const $nav = document.getElementById(`nav-${$section.id}`) as HTMLElement;
    $nav.classList.add("active");
  }
};
