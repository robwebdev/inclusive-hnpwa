import Html from "../components/Html";
import NewsList from "../components/NewsList";
import { h } from "preact";
import { networkFirstFetch } from "../utils";
import { render } from "../utils";
/** @jsx h */

const Page = ({ news, page }) => (
  <NewsList news={news} page={page} heading="Top" />
);

export default async function renderPage(params, { page = "1" }) {
  const requestUrl = `https://api.hackerwebapp.com/news?page=${page}`;
  const { data, isOffline } = await networkFirstFetch(requestUrl);
  const prefetchUrl = `https://api.hackerwebapp.com/news?page=${parseInt(
    page,
    10
  ) + 1}`;

  return render(
    <Html offline={isOffline} prefetch={prefetchUrl}>
      <Page news={data} page={page} />
    </Html>
  );
}
