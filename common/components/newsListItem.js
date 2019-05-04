import itemDomain from "./itemDomain";
import itemMeta from "./itemMeta";
import { pluralize } from "../utils";

const getItemTitleHref = item =>
  item.type === "link" ? item.url : `/item/${item.id}`;

export default (html, { item }) =>
  html`
    <li class="news-list-item">
      ${itemDomain({ html }, { item })}
      <h2 class="news-list-item__title">
        <a
          href="${getItemTitleHref(item)}"
          aria-describedby="item-domain-${item.id}"
        >
          ${item.title}
        </a>
      </h2>
      <p>${itemMeta(html, { item })}</p>
      <p class="item-meta">
        <a href="/item/${item.id}">
          ${pluralize(item.comments_count, "comment")}
          <span class="visually-hidden"> on ${item.title}</span></a
        >${item.points !== null ? " · " + pluralize(item.points, "point") : ""}
      </p>
    </li>
  `;
