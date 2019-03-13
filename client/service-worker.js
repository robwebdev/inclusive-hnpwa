import routeMatcher from "route-matcher";
import routes from "../common/app";

const SWVERSION = "v0.1.51";

const routesWithMatcher = routes.map(route => ({
  ...route,
  matcher: routeMatcher.routeMatcher(route.path)
}));

const appShellURLs = ["/index.css", "/offline", "/manifest.json"];
const SHELL_CACHE = `shell-${SWVERSION}`;
const PAGES_CACHE = `pages-${SWVERSION}`;

self.addEventListener("install", event => {
  event.waitUntil(
    clearCaches()
      .then(() => cacheShellAssets())
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("fetch", event => {
  if (event.request.mode === "navigate") {
    event.respondWith(handleNavigateRequest(event));
  } else {
    event.respondWith(handleNonNavigationRequest(event));
  }
});

async function handleNavigateRequest(event) {
  try {
    return await matchRouteAndRenderResponse(event);
  } catch (e) {
    console.warn("Failed to render on the service worker");
    return await respondFromCacheOrOffline(event);
  }
}

async function handleNonNavigationRequest(event) {
  const url = new URL(event.request.url);
  if (appShellURLs.indexOf(url.pathname) !== -1) {
    try {
      return caches.match(event.request);
    } catch (e) {
      return fetch(event.request);
    }
  } else {
    return fetch(event.request);
  }
}

function getQueryFromUrl(url) {
  const query = {};
  for (const entry of url.searchParams.entries()) {
    query[entry[0]] = entry[1];
  }
  return query;
}

function matchRoute(url) {
  return routesWithMatcher.find(({ matcher }) => matcher.parse(url.pathname));
}

function clearCaches() {
  return caches.keys().then(function(cacheNames) {
    return Promise.all(
      cacheNames.map(function(cacheName) {
        return caches.delete(cacheName);
      })
    );
  });
}

async function cacheShellAssets() {
  const cache = await caches.open(SHELL_CACHE);
  cache.addAll(appShellURLs);
}

async function matchRouteAndRenderResponse(event) {
  const url = new URL(event.request.url);
  const query = getQueryFromUrl(url);
  const match = matchRoute(url);
  const promise = match.render(match.matcher.parse(url.pathname), query);
  event.waitUntil(promise);
  let body = await promise;
  console.info("Response rendered on service worker");
  const response = new Response(body, {
    headers: { "Content-Type": "text/html" }
  });
  await caches
    .open(PAGES_CACHE)
    .then(cache => cache.put(url, response.clone()));
  return response;
}

function respondFromCacheOrOffline(event) {
  return caches.match(event.request).then(response => {
    if (!response) {
      console.info("Not found in cache, returning offline response");
      return caches.match("offline");
    }
    console.info("Response found in cache");
    return response;
  });
}
