import Main from "../components/Main";
import { h } from "preact";
import renderShell from "../shell";
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

export default {
  async render() {
    const { title, ...props } = getInitialProps();
    return renderShell(title, <Page {...props} />);
  }
};
