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
        </a>
      </h2>
      ${item.domain
        ? html`
            <p class="news-list-item__site-url font-sans-serif">
              <img
                src="${`https://api.faviconkit.com/${item.domain}/16`}"
                alt=""
                class="news-list-item__favicon"
              />
              ${item.domain}
            </p>
          `
        : ""}
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
