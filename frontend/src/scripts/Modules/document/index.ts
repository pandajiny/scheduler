export function $renderTemplate($target: HTMLElement, templateId: string) {
  $target.innerHTML = ``;
  const $template = document.getElementById(templateId) as HTMLTemplateElement;
  if (!$template) {
    throw `Cannot get template`;
  }
  $target.appendChild($template.content.cloneNode(true));
}
