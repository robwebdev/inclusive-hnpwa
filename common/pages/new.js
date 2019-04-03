import Html from "../components/Html";
import NewsList from "../components/NewsList";
import { apiFetch } from "../fetch";
import { h } from "preact";
import { render } from "../utils";
/** @jsx h */

const Page = ({ news, page }) => (
  <NewsList news={news} page={page} heading="Newest" />
);

export default async function renderPage(params, { page = 1 }) {
  const requestUrl = `https://api.hackerwebapp.com/newest?page=${page}`;
  const { data, isOffline } = await apiFetch(requestUrl);
  return render(
    <Html title="Newest" offline={isOffline}>
      <Page news={data} page={page} />
    </Html>
  );
}
