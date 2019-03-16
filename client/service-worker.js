import app from "../common/app";
import handleNavigationRequest from "../lib/service-worker";

const SWVERSION = "v0.1.58";
const navigationHandler = handleNavigationRequest(app, {
  serviceWorkerVersion: SWVERSION
});

const appShellURLs = ["/index.css", "/offline", "/manifest.json"];
const SHELL_CACHE = `shell-${SWVERSION}`;

self.addEventListener("install", event => {
  event.waitUntil(
    clearCaches()
      .then(() => cacheShellAssets())
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("fetch", event => {
  return navigationHandler(event, unhandledEvent => {
    return event.respondWith(handleNonNavigationRequest(unhandledEvent));
  });
});

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
