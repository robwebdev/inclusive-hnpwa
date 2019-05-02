import { getOfflineCache } from "../fetch";
import layout from "../components/layout";
import main from "../components/main";
import newsListItem from "../components/newsListItem";

export const offlineBody = async html => {
  const cache = await getOfflineCache();
  const keys = await cache.keys();
  const selectedResponses = await Promise.all(
    keys
      .filter(request => request.url.startsWith(urlBase))
      .reverse()
      .slice(0, 10)
      .map(request => cache.match(request))
  );

  const news = await Promise.all(
    selectedResponses.map(response => response.json())
  );

  return main(
    html,
    html`
      <div class="p-m">
        <h1>It looks like you are offline.</h1>
        ${news.length
          ? html`
              <p>
                We don't have this item saved offline, but here's some news
                items that we have saved.
              </p>
            `
          : html`
              <p>
                Sorry, We don't have any news saved for you to read offline yet.
              </p>
            `}
      </div>

      ${!!news.length &&
        html`
          <ul class="news-list">
            ${news.map(item => newsListItem(html, { item }))}
          </ul>
        `}
    `
  );
};

const urlBase = "https://api.hackerwebapp.com/item/";

export default async function renderPage({ html }) {
  const body = offlineBody(html);
  return layout(html, { body, title: "Offline - Hacker News" });
}
