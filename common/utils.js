import { render as preactRender } from "preact-render-to-string";

export function pluralize(count, word) {
  return `${count} ${word}${count !== 1 ? "s" : ""}`;
}

export function nextPage(page) {
  return parseInt(page, 10) + 1;
}

export function render(component) {
  return "<!doctype html>" + preactRender(component);
}
