import { NotFoundError } from "../lib/error";

export function pluralize(count, word) {
  return `${count} ${word}${count !== 1 ? "s" : ""}`;
}

function getCache() {
  if (typeof caches !== "undefined") {
    return caches.open("api-data");
  }
}

export async function networkFirstFetch(requestUrl) {
  let response, data;
  let cache = await getCache();
  let isOffline = false;

  try {
    response = await fetch(requestUrl, { cache: "no-cache" });
    if (cache) {
      await cache.put(requestUrl, response.clone());
      console.info("Cached response for " + requestUrl);
    }
  } catch (e) {
    console.error(e);
    if (cache) {
      console.warn("Failed to fetch, look in cache for " + requestUrl);
      const match = await cache.match(requestUrl);
      if (match) {
        console.info("Found match in cache for " + requestUrl, match);
        response = match.clone();
        isOffline = true;
      }
    } else {
      console.warn("No cache match for " + requestUrl);
      throw new Error("Failed to fetch page");
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
