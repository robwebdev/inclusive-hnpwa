import { NotFoundError } from "./error";
import { render as preactRender } from "preact-render-to-string";

export const LONG_LIVED_OFFLINE_BACK_CACHE = "offline-backup-cache";
export const SHORT_LIVED_PREFETCH_CACHE = "prefetch-cache";

export function pluralize(count, word) {
  return `${count} ${word}${count !== 1 ? "s" : ""}`;
}

export function nextPage(page) {
  return parseInt(page, 10) + 1;
}

async function matchInPrefetchCache(requestUrl) {
  if (typeof caches !== "undefined") {
    console.info("looking in short lived prefetch-cache");
    const cache = await caches.open(SHORT_LIVED_PREFETCH_CACHE);
    return cache.match(requestUrl);
  }
}

export async function prefetch(url) {
  if (typeof caches !== "undefined") {
    const response = await fetchAndCacheForOffline(url);
    const cache = await caches.open(SHORT_LIVED_PREFETCH_CACHE);
    console.info("cached in short lived prefetch cache", url);
    return cache.put(url, response.clone());
  }
}

export function getOfflineCache() {
  if (typeof caches !== "undefined") {
    return caches.open(LONG_LIVED_OFFLINE_BACK_CACHE);
  }
}

async function fetchAndCacheForOffline(requestUrl) {
  const response = await fetch(requestUrl, {
    cache: "no-cache"
  });
  const cache = await getOfflineCache();
  if (cache) {
    await cache.put(requestUrl, response.clone());
    console.info("Cached response for " + requestUrl);
  }
  return response;
}

async function matchInOfflineCache(requestUrl) {
  const cache = await getOfflineCache();
  if (cache) {
    console.warn("Failed to fetch, look in cache for " + requestUrl);
    const match = await cache.match(requestUrl);
    if (match) {
      console.info("Found match in cache for " + requestUrl, match);
      return match.clone();
    }
  }
}

export async function apiFetch(requestUrl) {
  let response, data;
  let isOffline = false;
  const prefetchReponse = await matchInPrefetchCache(requestUrl);

  if (prefetchReponse) {
    console.info(
      "Matched response in short lived prefetch-cache",
      prefetchReponse
    );
    response = prefetchReponse;
  } else {
    console.info("No match in short lived prefetch-cache");
    try {
      response = await fetchAndCacheForOffline(requestUrl);
    } catch (e) {
      console.error(e);
      const matchedOfflineResponse = await matchInOfflineCache(requestUrl);
      if (matchedOfflineResponse) {
        isOffline = true;
        response = matchedOfflineResponse;
      } else {
        console.warn("No cache match for " + requestUrl);
        throw new Error("Failed to fetch page");
      }
    }
  }

  if (response.ok) {
    data = await response.json();
  } else {
    switch (response.status) {
      case 404:
        throw new NotFoundError("Page does not exist");
      default:
        throw new Error("Failed to fetch page");
    }
  }

  return { data, isOffline };
}

export function render(component) {
  return "<!doctype html>" + preactRender(component);
}
