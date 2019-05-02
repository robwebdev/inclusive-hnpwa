import { pluralize } from "../utils";

export default (html, { item }) =>
  html`
    <span class="item-meta font-sans-serif">
      ${item.points !== null ? pluralize(item.points, "point") : ""}${" "}
      ${item.user ? `by ${item.user}` : ""} ${item.time_ago}
    </span>
  `;
