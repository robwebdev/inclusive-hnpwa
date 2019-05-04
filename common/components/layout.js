import { until } from "@popeindustries/lit-html-server/directives/until.js";

function isCurrentPage(title = "", current = "") {
  return title === current ? "page" : false;
}

export default (html, { title, body }) =>
  html`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>${title ? title + " - " : ""}Hacker News</title>
        <meta
          name="Description"
          content="An inclusive Hacker News PWA implementation."
        />
        <meta name="theme-color" content="#000000" />
        <script>
          navigator.serviceWorker.register("/service-worker.js");
        </script>
        <link rel="stylesheet" href="/index.css" />
        <link rel="icon" href="/images/icons/favicon.ico" type="image/x-icon" />
        <link rel="manifest" href="/manifest.json" />
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
        <header id="main-header" class="main-header">
          <a href="#main" class="skip-link">
            Skip to main content
          </a>
          <p class="logo font-bold font-sans-serif ph-m pt-m pb-s">
            Hacker News
          </p>
          <nav class="main-nav font-sans-serif ph-s">
            <ul class="main-nav__list horizontal">
              <li class="main-nav__list-item">
                <a
                  href="/"
                  class="pv-s ph-s block main-nav__link"
                  aria-current=${isCurrentPage(title, "")}
                >
                  Top
                </a>
              </li>
              <li class="main-nav__list-item">
                <a
                  href="/new"
                  class="pv-s ph-s block main-nav__link"
                  aria-current=${isCurrentPage(title, "Newest")}
                >
                  Newest
                </a>
              </li>
              <li class="main-nav__list-item">
                <a
                  href="/show"
                  class="pv-s ph-s block main-nav__link"
                  aria-current=${isCurrentPage(title, "Show")}
                >
                  Show
                </a>
              </li>
              <li class="main-nav__list-item">
                <a
                  href="/ask"
                  class="pv-s ph-s block main-nav__link"
                  aria-current=${isCurrentPage(title, "Ask")}
                >
                  Ask
                </a>
              </li>
              <li class="main-nav__list-item">
                <a
                  href="/jobs"
                  class="pv-s ph-s block main-nav__link"
                  aria-current=${isCurrentPage(title, "Jobs")}
                >
                  Jobs
                </a>
              </li>
            </ul>
          </nav>
        </header>
        <main id="main" tabindex="-1" class="p-m">
          ${until(body)}
        </main>
        <footer class="p-m main-footer">
          Made by <a href="https://twitter.com/RobWebDev">@robwebdev</a>.
          <a href="https://github.com/robwebdev/inclusive-hnpwa">
            Code available on github</a
          >
          .
        </footer>
      </body>
    </html>
  `;