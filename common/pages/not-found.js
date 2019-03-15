const { h } = require("preact");
const Main = require("../components/Main");
const renderShell = require("../shell");
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

function getInitialProps() {
  const title = "Not Found - Hacker News";
  return { title };
}

module.exports = {
  async render() {
    const { title, ...props } = getInitialProps();
    return renderShell(title, <Page {...props} />);
  }
};
