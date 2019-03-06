const { h } = require("preact");
const NewsList = require("../components/NewsList");
const NewsListItem = require("../components/NewsListItem");
/** @jsx h */

const Page = ({ news, page }) => (
  <NewsList
    news={news}
    page={page}
    heading="Show HN"
    renderItem={item => <NewsListItem item={item} />}
  />
);

Page.fetchData = function(params, { page = 1 }) {
  return fetch(`https://api.hackerwebapp.com/show?page=${page}`);
};

Page.getInitialProps = function(news, params, { page }) {
  const title = "Show";
  return { news, page, title };
};

module.exports = Page;
