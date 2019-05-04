export function pluralize(count, word) {
  return `${count} ${word}${count !== 1 ? "s" : ""}`;
}

export function nextPage(page) {
  return parseInt(page, 10) + 1;
}
