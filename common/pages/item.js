import { apiFetch } from "../fetch";
import comments from "../components/comments";
import itemDomain from "../components/itemDomain";
import itemMeta from "../components/itemMeta";
import layout from "../components/layout";
import main from "../components/main";
import { offlineBody } from "./offline";
import { pluralize } from "../utils";
import { unsafeHTML } from "@popeindustries/lit-html-server/directives/unsafe-html";

async function renderBody(html, id) {
  const requestUrl = `https://api.hackerwebapp.com/item/${id}`;
  let item;
  let isOffline;
  try {
    let result = await apiFetch(requestUrl);
    item = result.data;
    isOffline = result.isOffline;
  } catch (e) {
    return offlineBody(html);
  }

  return main(
    html,
    html`
      <div class="item__upper">
        ${itemDomain({ html }, { item })}
        <h1 class="item__title">
          ${item.type === "ask"
            ? item.title
            : html`
                <a
                  href="${item.url}"
                  ?aria-describedby="${item.domain && `item-domain-${item.id}`}"
                >
                  ${item.title}${" "}
                </a>
              `}
        </h1>
        <p>${itemMeta(html, { item })}</p>
        <p class="item-meta">
          <b>${pluralize(item.comments_count, "comment")}</b>${item.points !==
          null
            ? " · " + pluralize(item.points, "point")
            : ""}
        </p>
        ${item.content
          ? html`
              <div class="item-content">${unsafeHTML(item.content)}</div>
            `
          : ""}
      </div>
      ${comments(html, item)}
    `,
    { isOffline }
  );
}

export default async function renderPage({ html }, params) {
  const body = renderBody(html, params.id);
  return layout(html, { body, title: "Item" });
}
