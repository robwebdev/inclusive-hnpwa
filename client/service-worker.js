import { API_DATA_CACHE_KEY } from "../common/utils";
import app from "../common/app";
import handleNavigationRequest from "../lib/service-worker";

const SWVERSION = "v0.1.106";
const navigationHandler = handleNavigationRequest(app, {
  serviceWorkerVersion: SWVERSION
});

const appShellURLs = ["/index.css", "/manifest.json"];
const SHELL_CACHE = `${SWVERSION}-shell`;

self.addEventListener("install", event => {
  event.waitUntil(cacheShellAssets());
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  clearCaches(event);
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

function clearCaches(event) {
  return event.waitUntil(
    caches.keys().then(cacheKeys => {
      const oldKeys = cacheKeys.filter(
        key => key.indexOf(`${SWVERSION}-`) !== 0 && key !== API_DATA_CACHE_KEY
      );
      console.log(oldKeys);
      const deletePromises = oldKeys.map(oldKey => caches.delete(oldKey));
      return Promise.all(deletePromises);
    })
  );
}

async function cacheShellAssets() {
  const cache = await caches.open(SHELL_CACHE);
  return cache.addAll(appShellURLs);
}
