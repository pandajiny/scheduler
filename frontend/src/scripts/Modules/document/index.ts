export function $template(templateId: string): Node {
  const $template = document.getElementById(templateId) as HTMLTemplateElement;
  if (!$template) {
    throw `Cannot get template`;
  }
  return $template.content.cloneNode(true);
}
