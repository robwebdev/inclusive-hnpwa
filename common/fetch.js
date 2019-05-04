import { NotFoundError } from "./error";

export const LONG_LIVED_OFFLINE_BACK_CACHE = "offline-backup-cache";

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
    console.info("Cached in offline cache" + requestUrl);
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
