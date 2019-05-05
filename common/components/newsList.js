import main from "./main";
import newsListItem from "./newsListItem";

export default (html, { news, page = 1, heading, isOffline }) =>
  main(
    html,
    news.length > 0
      ? html`
          <h1 class="text-smaller">
            ${heading} - Items ${1 + news.length * (page - 1)} to
            ${news.length * page}
          </h1>
          <ol start="${1 + news.length * (page - 1)}" class="news-list">
            ${news.map(item => newsListItem(html, { item }))}
          </ol>
          <nav
            aria-labelledby="pagination-title"
            tabindex="-1"
            class="pagination"
          >
            <h2 id="pagination-title" class="visually-hidden">
              Pagination
            </h2>
            <ul class="pagination-list">
              ${page > 1
                ? html`
                    <li class="pagination-list__item">
                      <a
                        href="?page=${parseInt(page) - 1}"
                        rel="prev"
                        class="pagination-list__link"
                      >
                        Previous page
                      </a>
                    </li>
                  `
                : ""}
              <li class="pagination-list__item pagination-list__next">
                <a
                  href="?page=${parseInt(page) + 1}"
                  rel="next"
                  class="pagination-list__link"
                >
                  Next page
                </a>
              </li>
            </ul>
          </nav>
        `
      : html`
          <h1>Uh oh</h1>
          <p>
            It looks like we've run out of items to show in this section.
          </p>
        `,
    { isOffline }
  );
