export const LONG_LIVED_OFFLINE_BACK_CACHE = "offline-backup-cache";
export const SHORT_LIVED_PREFETCH_CACHE = "prefetch-cache";

export function pluralize(count, word) {
  return `${count} ${word}${count !== 1 ? "s" : ""}`;
}

export function nextPage(page) {
  return parseInt(page, 10) + 1;
}
