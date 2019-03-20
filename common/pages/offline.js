import Html from "../components/Html";
import Main from "../components/Main";
import NewsList from "../components/NewsList";
import NewsListItem from "../components/NewsListItem";
import { getCache } from "../utils";
import { h } from "preact";
import { render } from "../utils";
/** @jsx h */

const Page = ({ news }) => (
  <Main className>
    <div class="p-m">
      <h1>It looks like you are offline.</h1>
      {news.length ? (
        <p>
          We don't have this item saved offline, but here's some news items that
          we have saved.
        </p>
      ) : (
        <p>Sorry, We don't have any news saved for you to read offline yet.</p>
      )}
    </div>

    {!!news.length && (
      <ul class="news-list">
        {news.map(item => (
          <NewsListItem item={item} />
        ))}
      </ul>
    )}
  </Main>
);

const urlBase = "https://api.hackerwebapp.com/item/";

export default async function renderPage() {
  const cache = await getCache();
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
  return render(
    <Html title="Offline - Hacker News" offline={true}>
      <Page news={news} />
    </Html>
  );
}
