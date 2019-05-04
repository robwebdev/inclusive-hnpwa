import { apiFetch } from "../fetch";
import comments from "../components/comments";
import itemDomain from "../components/itemDomain";
import itemMeta from "../components/itemMeta";
import layout from "../components/layout";
import main from "../components/main";
import { offlineBody } from "./offline";
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
      ${itemDomain({ html }, { item })}
      <h1>
        ${item.type === "ask"
          ? item.title
          : html`
              <a href="${item.url}" aria-describedby="item-domain-${item.id}">
                ${item.title}${" "}
              </a>
            `}
      </h1>
      <p>${itemMeta(html, { item })}</p>
      <div class="item-content">
        ${item.content && unsafeHTML(item.content)}
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
