const { h } = require("preact");
const Main = require("../components/Main");
/** @jsx h */

const Page = ({ news, page }) => (
  <Main>
    <h1>Sorry we couldn't find that page.</h1>
    <p>
      Maybe something went wrong our end, or you visited a URL that doesn't
      exists.
    </p>
  </Main>
);

Page.getInitialProps = function() {
  const title = "Not Found - Hacker News";
  return { title };
};

module.exports = Page;
