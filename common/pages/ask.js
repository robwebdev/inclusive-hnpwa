const { h } = require("preact");
const NewsList = require("../components/NewsList");
const NewsListItem = require("../components/NewsListItem");
const renderShell = require("../shell");
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
  fetchData,
  getInitialProps,
  renderPage({ title, ...props }) {
    return renderShell(title, <Page {...props} />);
  }
};
