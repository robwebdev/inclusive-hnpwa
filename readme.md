# Hacker News PWA - Inclusive Edition

https://hackernews.robweb.dev/

Work in progress! :construction:

Hacker News PWA - Inclusive Edition is a Hacker News PWA implementation built with inclusivity and accessibility in mind. At the moment it is a usable experiment.

## Overview and introduction to Service Worker Rendering

In this application, client side routing and rendering are avoided in favour of full page reloads that are progressively enhanced by a service worker. A fetch event handler intercepts navigation requests and renders the response in the service worker. **Service Worker Rendering**, if you will.

A high level view of the Service Worker Rendering (SWR):

1. A user visits the application for the first time. Their request hits the server where there is a JavaScript application running in Node.js. The request is handled, the required data is fetched from a third party API and the complete page is rendered as the response body.

2. The response is received and the page is loaded in the browser. A service worker is then requested and begins it's lifecycle in the background.

3. If an internal link is clicked before the service worker has activated then the request will be handled by the server as in step 1. The service worker script contains another instance of the application that, once booted, will intercept any fetch events that have a mode of `navigate`.

4. If an internal link is clicked after the service worker has initialised and a request is intercepted, the same process happens in the service worker as it did on the server. The required data is fetched from the third party API, direct from service worker this time and the complete page is rendered as the response body.

### Comparison with client side routing and rendering

Once the service worker is activated, only the data required is requested on subsequent page loads. This (theoretically) makes subsequent page loads faster, which is one of the arguments _for_ client side routing and rendering. This all happens under the hood in the service worker though, so the browser behaves the same whether the request hits the server or is handled in the service worker. This has accessibility benefits because the default browser behaviour (focus management, loading states etc) does not have to be reimplemeneted in client side JavaScript. Having to remimplement default browser behaviour is an argument _against_ client side routing.

SWR aligns with progressive enhancement. If services workers aren't supported by the browser, or the service worker fails for some reason the server still acts as a fully functional application.

SWR also unlocks other potential benefits that I plan to explore in the application. For example, when the user has scrolled through _n_% of the first page of news there is a fair chance that they will decide to navigate to the second page. At this point the application could prefetch the data required for that second page, render the page and place it in cache. Then if the user does decide to navigate to the second page it will load instantly. This is of course possible even without SWR, but it becomes more viable because

- Only the the data is fetched for the optimisticly rendered page, meaning less data is sent over the wire in comparison with server side rendering.
- The page is rendered in the server worker and off of the main thread, meaning shouldn't impact performance of the main document.
