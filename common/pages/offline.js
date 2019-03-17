import Html from "../components/Html";
import Main from "../components/Main";
import NewsList from "../components/NewsList";
import { getCache } from "../utils";
import { h } from "preact";
import { render } from "../utils";
/** @jsx h */

const Page = ({ news }) =>
  news.length ? (
    <NewsList news={news} heading="Offline news" page={1} />
  ) : (
    <Main className="p-m">
      <h1>It looks like you are offline.</h1>
      <p>We don't have any news stored offline for you to read yet.</p>
    </Main>
  );

const urlBase = "https://api.hackerwebapp.com/item/";

export default async function renderPage() {
  const cache = await getCache();
  const keys = await cache.keys();
  const selectedResponses = await Promise.all(
    keys
      .filter(request => request.url.startsWith(urlBase))
      .map(request => cache.match(request))
  );

  const news = await Promise.all(
    selectedResponses.map(response => response.json())
  );
  console.log(news);
  return render(
    <Html title="Offline - Hacker News" offline={true}>
      <Page news={news} />
    </Html>
  );
}
