import Html from "../components/Html";
import NewsList from "../components/NewsList";
import { apiFetch } from "../fetch";
import { h } from "preact";
import { render } from "../utils";

/** @jsx h */

const Page = ({ news, page }) => (
  <NewsList news={news} page={page} heading="Jobs" />
);

export default async function renderPage(params, { page = 1 }) {
  const requestUrl = `https://api.hackerwebapp.com/jobs?page=${page}`;
  const { data, isOffline } = await apiFetch(requestUrl);

  return render(
    <Html title="Jobs" offline={isOffline}>
      <Page news={data} page={page} />
    </Html>
  );
}
