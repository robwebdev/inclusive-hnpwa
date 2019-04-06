import { apiFetch, prefetch } from "../fetch";
import { nextPage, render } from "../utils";

import Html from "../components/Html";
import NewsList from "../components/NewsList";

const Page = ({ news, page }) => (
  <NewsList news={news} page={page} heading="Newest" />
);

export default async function renderPage(params, { page = 1 }) {
  const requestUrl = `https://api.hackerwebapp.com/newest?page=${page}`;
  const { data, isOffline } = await apiFetch(requestUrl);

  const prefetchUrls = [
    `https://api.hackerwebapp.com/newest?page=${nextPage(page)}`,
    `https://api.hackerwebapp.com/news?page=1`,
    `https://api.hackerwebapp.com/show?page=1`,
    `https://api.hackerwebapp.com/ask?page=1`
  ];

  prefetchUrls.map(url => prefetch(url));
  return render(
    <Html title="Newest" offline={isOffline}>
      <Page news={data} page={page} />
    </Html>
  );
}
