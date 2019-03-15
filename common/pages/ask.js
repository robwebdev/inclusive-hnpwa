const { h } = require("preact");
const NewsList = require("../components/NewsList");
const NewsListItem = require("../components/NewsListItem");
const renderShell = require("../shell");
const { NotFoundError } = require("../../lib/error");
/** @jsx h */

const Page = ({ news, page }) => (
  <NewsList
    news={news}
    page={page}
    heading="Ask HN"
    renderItem={item => <NewsListItem item={item} />}
  />
);

function fetchData(params, { page = 1 }) {
  return fetch(`https://api.hackerwebapp.com/ask?page=${page}`);
}

function getInitialProps(news, params, { page }) {
  const title = "Ask";
  return { news, page, title };
}

module.exports = {
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
    return renderShell(title, <Page {...props} />);
  }
};
