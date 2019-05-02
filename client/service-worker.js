import { html, renderToStream } from "@popeindustries/lit-html-server/browser";

import { LONG_LIVED_OFFLINE_BACK_CACHE } from "../common/utils";
import app from "../common/app";
import routeMatcher from "route-matcher";

const SWVERSION = "v0.2.7";
const navigationHandler = handleNavigationRequest(app, {
  serviceWorkerVersion: SWVERSION
});

const appShellURLs = ["/index.css", "/manifest.json", "/client.js"];
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
    return fetch(event.request.url);
  }
}

function clearCaches(event) {
  return event.waitUntil(
    caches.keys().then(cacheKeys => {
      const oldKeys = cacheKeys.filter(
        key =>
          key.indexOf(`${SWVERSION}-`) !== 0 &&
          key !== LONG_LIVED_OFFLINE_BACK_CACHE
      );
      console.info("cleared cache keys:", oldKeys);
      const deletePromises = oldKeys.map(oldKey => caches.delete(oldKey));
      return Promise.all(deletePromises);
    })
  );
}

async function cacheShellAssets() {
  const cache = await caches.open(SHELL_CACHE);
  return cache.addAll(appShellURLs);
}

function handleNavigationRequest({ routes, notFound, offline }) {
  const routesWithMatcher = routes.map(route => ({
    ...route,
    matcher: routeMatcher.routeMatcher(route.path)
  }));

  function matchRoute(url) {
    const match = routesWithMatcher.find(({ matcher }) =>
      matcher.parse(url.pathname)
    );
    return match;
  }

  return function(event, cb) {
    if (event.request.mode === "navigate") {
      event.respondWith(
        handleNavigateRequest(event, matchRoute, notFound, offline)
      );
    } else {
      return cb(event);
    }
  };
}

async function handleNavigateRequest(event, matchRoute, notFound, offline) {
  try {
    return await matchRouteAndRenderResponse(event, matchRoute, notFound);
  } catch (e) {
    console.error(e);
    console.warn("Failed to render on the service worker");
    return await respondFromCacheOrOffline(event, offline);
  }
}

async function matchRouteAndRenderResponse(event, matchRoute, notFound) {
  const url = new URL(event.request.url);
  const query = getQueryFromUrl(url);
  const match = matchRoute(url);
  if (match) {
    const rendered = await match.render(
      { html },
      match.matcher.parse(url.pathname),
      query
    );
    const body = renderToStream(rendered);
    console.info("Response rendered on service worker");
    const response = new Response(body, {
      headers: { "Content-Type": "text/html" }
    });
    return response;
  } else {
    const body = await renderToStream(notFound({ html }));
    const response = new Response(body, {
      status: 404,
      headers: { "Content-Type": "text/html" }
    });
    return response;
  }
}

function getQueryFromUrl(url) {
  const query = {};
  for (const entry of url.searchParams.entries()) {
    query[entry[0]] = entry[1];
  }
  return query;
}

function respondFromCacheOrOffline(event, offline) {
  console.log(event, offline);
  return caches.match(event.request).then(async response => {
    if (!response) {
      console.info("Not found in cache, returning offline response");
      const body = renderToStream(offline({ html }));
      return new Response(body, {
        headers: { "Content-Type": "text/html" }
      });
    }
    console.info("Response found in cache");
    return response;
  });
}
