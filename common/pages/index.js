import Html from "../components/Html";
import NewsList from "../components/NewsList";
import NewsListItem from "../components/NewsListItem";
import { NotFoundError } from "../../lib/error";
import { h } from "preact";
import { render } from "preact-render-to-string";
/** @jsx h */

const Page = ({ news, page }) => (
  <NewsList
    news={news}
    page={page}
    heading="Top"
    renderItem={item => <NewsListItem item={item} />}
  />
);

function fetchData(params, { page = 1 }) {
  return fetch(`https://api.hackerwebapp.com/news?page=${page}`);
}

function getInitialProps(news, params, { page }) {
  return { news, page };
}

export default {
  async render(params, { page = 1 }) {
    let data;
    const response = await fetchData(params, { page });
    if (response.ok) {
      data = await response.json();
    } else {
      switch (response.status) {
        case 404:
          throw new NotFoundError("Page does not exist");
        default:
          throw new Error("Failed to fetch page");
      }
    }
    const { title, ...props } = getInitialProps(data, params, { page });
    return render(
      <Html title={title}>
        <Page {...props} />
      </Html>
    );
  }
};
