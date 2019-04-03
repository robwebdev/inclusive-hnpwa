import { apiFetch, prefetch } from "../fetch";
import { nextPage, render } from "../utils";

import Html from "../components/Html";
import NewsList from "../components/NewsList";
import { h } from "preact";

/** @jsx h */

const Page = ({ news, page }) => (
  <NewsList news={news} page={page} heading="Top" />
);

export default async function renderPage(params, { page = "1" }) {
  const requestUrl = `https://api.hackerwebapp.com/news?page=${page}`;
  const { data, isOffline } = await apiFetch(requestUrl);
  const prefetchUrls = [
    `https://api.hackerwebapp.com/news?page=${nextPage(page)}`,
    `https://api.hackerwebapp.com/newest?page=1`,
    `https://api.hackerwebapp.com/show?page=1`,
    `https://api.hackerwebapp.com/ask?page=1`
  ];

  prefetchUrls.map(url => prefetch(url));

  return render(
    <Html offline={isOffline}>
      <Page news={data} page={page} />
    </Html>
  );
}
