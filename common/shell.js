module.exports = function renderShell(title, body) {
  return `<!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <title>${
              title ? title + " - " : ""
            }Hacker News PWA - Inclusive Edition</title>
            <meta name="Description" content="An inclusive Hacker News PWA implementation.">
            <meta name="theme-color" content="#000000"/>
            <script>
            navigator.serviceWorker.register('/service-worker.js');
            </script>
            <link rel="stylesheet" href="/index.css" />
            <link rel="manifest" href="/manifest.json">
        </head>
        <body>
            <nav class="main-nav font-sans-serif ph-s pt-s">
                <a href="#main" class="skip-link">Skip to main content</a>
                <p class="logo font-bold ph-s pt-s">Hacker News PWA<span class="text-subtle"> - Inclusive Edition</span></p>
                <ul class="main-nav__list horizontal">
                    <li class="main-nav__list-item">
                        <a href="/" class="pv-s ph-s block main-nav__link" ${isCurrentPage(
                          title,
                          ""
                        )}>Top</a>
                    </li>
                    <li class="main-nav__list-item">
                        <a href="/new" class="pv-s ph-s block main-nav__link" ${isCurrentPage(
                          title,
                          "Newest"
                        )}>Newest</a>
                    </li>
                    <li class="main-nav__list-item">
                        <a href="/show" class="pv-s ph-s block main-nav__link" ${isCurrentPage(
                          title,
                          "Show"
                        )}>Show</a>
                    </li>
                    <li class="main-nav__list-item">
                        <a href="/ask" class="pv-s ph-s block main-nav__link" ${isCurrentPage(
                          title,
                          "Ask"
                        )}>Ask</a>
                    </li>
                </ul>
            </nav>
            ${body}
            <footer class="p-m main-footer">
              Made by <a href="https://twitter.com/RobWebDev">@robwebdev</a>. <a href="https://github.com/robwebdev/inclusive-hnpwa">Code available on github</a>.
            </footer>
        </body>
    </html>`;
};

function isCurrentPage(title = "", current = "") {
  return title === current ? 'aria-current="page"' : "";
}
