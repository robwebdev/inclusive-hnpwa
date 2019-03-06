const { h } = require("preact");
const NewsList = require("../components/NewsList");
const NewsListItem = require("../components/NewsListItem");
/** @jsx h */

const Page = ({ news, page }) => (
  <NewsList
    news={news}
    page={page}
    heading="Ask HN"
    renderItem={item => <NewsListItem item={item} />}
  />
);

Page.fetchData = function(params, { page = 1 }) {
  return fetch(`https://api.hackerwebapp.com/ask?page=${page}`);
};

Page.getInitialProps = function(news, params, { page }) {
  const title = "Ask";
  return { news, page, title };
};

module.exports = Page;
