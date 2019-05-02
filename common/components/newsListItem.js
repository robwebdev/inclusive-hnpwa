import itemMeta from "./itemMeta";
import { pluralize } from "../utils";

const getItemTitleHref = item =>
  item.type === "link" ? item.url : `/item/${item.id}`;

export default (html, { item }) =>
  html`
    <li class="news-list-item">
      <h2 class="news-list-item__title">
        <a href="${getItemTitleHref(item)}">
          ${item.title}
          ${item.domain &&
            html`
              <span class="url">(${item.domain})</span>
            `}
        </a>
      </h2>
      <p>${itemMeta(html, { item })}</p>
      <p>
        <a
          href="/item/${item.id}"
          class="font-sans-serif news-list-item__comments"
        >
          ${pluralize(item.comments_count, "comment")}
          <span class="visually-hidden"> on {item.title}</span>
        </a>
      </p>
      <p class="news-list-item__meta"></p>
    </li>
  `;
