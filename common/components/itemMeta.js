import { pluralize } from "../utils";

export default (html, { item }) =>
  html`
    <span class="item-meta">
      ${item.user
        ? html`
            <b>${item.user}</b> ·
          `
        : ""}${item.time_ago}
    </span>
  `;
