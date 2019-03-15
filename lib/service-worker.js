import routeMatcher from "route-matcher";

export default function({ routes, notFound }, { serviceWorkerVersion }) {
  const routesWithMatcher = routes.map(route => ({
    ...route,
    matcher: routeMatcher.routeMatcher(route.path)
  }));

  function matchRoute(url) {
    const match = routesWithMatcher.find(({ matcher }) =>
      matcher.parse(url.pathname)
    );
    return match || notFound;
  }

  return function(event, cb) {
    if (event.request.mode === "navigate") {
      event.respondWith(handleNavigateRequest(event, matchRoute));
    } else {
      return cb(event);
    }
  };
}

async function handleNavigateRequest(event, matchRoute) {
  try {
    return await matchRouteAndRenderResponse(event, matchRoute);
  } catch (e) {
    console.error(e);
    console.warn("Failed to render on the service worker");
    return await respondFromCacheOrOffline(event);
  }
}

async function matchRouteAndRenderResponse(event, matchRoute) {
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
  return response;
}

function getQueryFromUrl(url) {
  const query = {};
  for (const entry of url.searchParams.entries()) {
    query[entry[0]] = entry[1];
  }
  return query;
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