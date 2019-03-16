import Main from "./Main";
import { h } from "preact";
/** @jsx h */

export default ({ news, page = 1, heading, renderItem }) => (
  <Main>
    {news.length > 0 ? (
      <div>
        <h1 id="main-title">
          {heading} - Items {1 + news.length * (page - 1)} to{" "}
          {news.length * page}
        </h1>
        <ol start={1 + news.length * (page - 1)} class="news-list">
          {news.map(item => renderItem(item))}
        </ol>
        <nav aria-labelledby="pagination-title" tabindex="-1">
          <h2 id="pagination-title" class="visually-hidden">
            Pagination
          </h2>
          <ul class="pagination-list font-sans-serif">
            {page > 1 && (
              <li class="pagination-list__item">
                <a
                  href={`?page=${parseInt(page) - 1}`}
                  rel="prev"
                  class="pagination-list__link"
                >
                  Previous page
                </a>
              </li>
            )}
            <li class="pagination-list__item pagination-list__next">
              <a
                href={`?page=${parseInt(page) + 1}`}
                rel="next"
                class="pagination-list__link"
              >
                Next page
              </a>
            </li>
          </ul>
        </nav>
      </div>
    ) : (
      <div>
        <h1>Uh oh</h1>
        <p>It looks like we've run out of items to show in this section.</p>
      </div>
    )}
  </Main>
);
