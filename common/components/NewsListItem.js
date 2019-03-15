import ItemMeta from "./ItemMeta";
import { h } from "preact";
import { pluralize } from "../utils";
/** @jsx h */

const getItemTitleHref = item =>
  item.type === "link" ? item.url : `/item/${item.id}`;

export default ({ item }) => (
  <li class="news-list-item">
    <article>
      <h2>
        <a href={getItemTitleHref(item)}>
          {item.title}{" "}
          {item.domain && (
            <span class="url">
              <br />({item.domain})
            </span>
          )}
        </a>
      </h2>
      <ItemMeta item={item} />
      <p>
        <a
          href={`/item/${item.id}`}
          class="font-sans-serif news-list-item__comments"
        >
          {pluralize(item.comments_count, "comment")}
          <span class="visually-hidden"> on {item.title}</span>
        </a>
      </p>
    </article>
  </li>
);
