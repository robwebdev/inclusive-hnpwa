import ItemMeta from "./ItemMeta";
import { h } from "preact";
import { pluralize } from "../utils";
/** @jsx h */

const getItemTitleHref = item =>
  item.type === "link" ? item.url : `/item/${item.id}`;

export default ({ item }) => (
  <li class="news-list-item">
    <h2 class="news-list-item__title">
      <a href={getItemTitleHref(item)}>
        {item.title} {item.domain && <span class="url">({item.domain})</span>}
      </a>
    </h2>
    <p>
      <a
        href={`/item/${item.id}`}
        class="font-sans-serif news-list-item__comments"
      >
        {pluralize(item.comments_count, "comment")}
        <span class="visually-hidden"> on {item.title}</span>
      </a>{" "}
    </p>
    <p class="news-list-item__meta">
      <ItemMeta item={item} />
    </p>
  </li>
);
