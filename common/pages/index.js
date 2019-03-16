import Html from "../components/Html";
import NewsList from "../components/NewsList";
import NewsListItem from "../components/NewsListItem";
import { NotFoundError } from "../../lib/error";
import { h } from "preact";
import { networkFirstFetch } from "../utils";
import { render } from "preact-render-to-string";
/** @jsx h */

const Page = ({ news, page }) => (
  <NewsList news={news} page={page} heading="Top" />
);

export default {
  async render(params, { page = 1 }) {
    let data;
    const requestUrl = `https://api.hackerwebapp.com/news?page=${page}`;
    const { response, isOffline } = await networkFirstFetch(requestUrl);

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

    return render(
      <Html offline={isOffline}>
        <Page news={data} page={page} />
      </Html>
    );
  }
};
