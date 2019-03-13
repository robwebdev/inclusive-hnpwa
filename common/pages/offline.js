const { h } = require("preact");
const Main = require("../components/Main");
const renderShell = require("../shell");
/** @jsx h */

const Page = ({ news, page }) => (
  <Main>
    <h1>It looks like you are offline</h1>
    <p>We'll be making the offline experience better soon.</p>
  </Main>
);

function getInitialProps() {
  const title = "Offline - Hacker News";
  return { title };
}

module.exports = {
  getInitialProps,
  renderPage({ title, ...props }) {
    return renderShell(title, <Page {...props} />);
  }
};
