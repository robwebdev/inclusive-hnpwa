export function pluralize(count, word) {
  return `${count} ${word}${count !== 1 ? "s" : ""}`;
}

export function getCaches() {
  if (typeof caches !== "undefined") {
    return caches;
  }
}

export async function networkFirstFetch(requestUrl) {
  let response;
  let caches = getCaches();
  let cache;
  let isOffline = false;
  if (caches) {
    cache = await caches.open("api-data");
  }

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
      throw new Error("Failed to fetch page");
    }
  }

  return { response, isOffline };
}
