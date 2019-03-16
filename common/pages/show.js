import Html from "../components/Html";
import NewsList from "../components/NewsList";
import { h } from "preact";
import { networkFirstFetch } from "../utils";
import { render } from "preact-render-to-string";

/** @jsx h */

const Page = ({ news, page }) => (
  <NewsList news={news} page={page} heading="Show HN" />
);

export default async function renderPage(params, { page = 1 }) {
  const requestUrl = `https://api.hackerwebapp.com/show?page=${page}`;
  const { data, isOffline } = await networkFirstFetch(requestUrl);

  return render(
    <Html title="Show" offline={isOffline}>
      <Page news={data} page={page} />
    </Html>
  );
}
