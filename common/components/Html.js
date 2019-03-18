import { h } from "preact";
/** @jsx h */

function isCurrentPage(title = "", current = "") {
  return title === current ? "page" : false;
}

export default ({ children, title, offline }) => (
  <html lang="en">
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>
        {title ? title + " - " : ""}Hacker News PWA - Inclusive Edition
      </title>
      <meta
        name="Description"
        content="An inclusive Hacker News PWA implementation."
      />
      <meta name="theme-color" content="#000000" />
      <script>navigator.serviceWorker.register('/service-worker.js');</script>
      <link rel="stylesheet" href="/index.css" />
      <link rel="manifest" href="/manifest.json" />
      <link rel="icon" href="/images/icons/favicon.ico" type="image/x-icon" />
      <link
        rel="apple-touch-icon"
        sizes="57x57"
        href="/images/icons/apple-icon-57x57.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="60x60"
        href="/images/icons/apple-icon-60x60.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="72x72"
        href="/images/icons/apple-icon-72x72.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="76x76"
        href="/images/icons/apple-icon-76x76.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="114x114"
        href="/images/icons/apple-icon-114x114.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="120x120"
        href="/images/icons/apple-icon-120x120.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="144x144"
        href="/images/icons/apple-icon-144x144.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="152x152"
        href="/images/icons/apple-icon-152x152.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/images/icons/apple-icon-180x180.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="192x192"
        href="/images/icons/android-icon-192x192.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/images/icons/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="96x96"
        href="/images/icons/favicon-96x96.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/images/icons/favicon-16x16.png"
      />
      <meta
        name="msapplication-TileImage"
        content="/images/icons/ms-icon-144x144.png"
      />
    </head>
    <body>
      <header>
        {offline && (
          <p class="offline-message" role="alert">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="16"
              viewBox="0 0 14 16"
              class="icon"
              role="presentation"
            >
              <path
                fill-rule="evenodd"
                d="M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"
              />
            </svg>
            You're in offline mode
          </p>
        )}
        <nav class="main-nav font-sans-serif ph-s pt-s">
          <a href="#main" class="skip-link">
            Skip to main content
          </a>
          <p class="logo font-bold ph-s pt-s">
            Hacker News PWA<span class="text-subtle"> - Inclusive Edition</span>
          </p>
          <ul class="main-nav__list horizontal">
            <li class="main-nav__list-item">
              <a
                href="/"
                class="pv-s ph-s block main-nav__link"
                aria-current={isCurrentPage(title, "")}
              >
                Top
              </a>
            </li>
            <li class="main-nav__list-item">
              <a
                href="/new"
                class="pv-s ph-s block main-nav__link"
                aria-current={isCurrentPage(title, "Newest")}
              >
                Newest
              </a>
            </li>
            <li class="main-nav__list-item">
              <a
                href="/show"
                class="pv-s ph-s block main-nav__link"
                aria-current={isCurrentPage(title, "Show")}
              >
                Show
              </a>
            </li>
            <li class="main-nav__list-item">
              <a
                href="/ask"
                class="pv-s ph-s block main-nav__link"
                aria-current={isCurrentPage(title, "Ask")}
              >
                Ask
              </a>
            </li>
          </ul>
        </nav>
      </header>
      {children}
      <footer class="p-m main-footer">
        Made by <a href="https://twitter.com/RobWebDev">@robwebdev</a>.{" "}
        <a href="https://github.com/robwebdev/inclusive-hnpwa">
          Code available on github
        </a>
        .
      </footer>
    </body>
  </html>
);
