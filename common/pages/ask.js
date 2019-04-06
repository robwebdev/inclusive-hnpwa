import Html from "../components/Html";
import NewsList from "../components/NewsList";
import { apiFetch } from "../fetch";
import { render } from "../utils";

const Page = ({ news, page }) => (
  <NewsList news={news} page={page} heading="Ask HN" />
);

export default async function renderPage(params, { page = 1 }) {
  const requestUrl = `https://api.hackerwebapp.com/ask?page=${page}`;
  const { data, isOffline } = await apiFetch(requestUrl);

  return render(
    <Html title="Ask" offline={isOffline}>
      <Page news={data} page={page} />
    </Html>
  );
}
