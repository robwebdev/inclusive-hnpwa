import { pluralize } from "../utils";

export default (html, { item }) =>
  html`
    <span class="item-meta font-sans-serif">
      ${item.user ? `${item.user} · ` : ""}${item.time_ago}
    </span>
  `;
