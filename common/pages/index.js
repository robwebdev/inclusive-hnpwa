const { h } = require("preact");
const NewsList = require("../components/NewsList");
const NewsListItem = require("../components/NewsListItem");
/** @jsx h */

const Page = ({ news, page }) => (
  <NewsList
    news={news}
    page={page}
    heading="Top"
    renderItem={item => <NewsListItem item={item} />}
  />
);

Page.fetchData = function(params, { page = 1 }) {
  return fetch(`https://api.hackerwebapp.com/news?page=${page}`);
};

Page.getInitialProps = function(news, params, { page }) {
  return { news, page };
};

module.exports = Page;
