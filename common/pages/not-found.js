import Html from "../components/Html";
import Main from "../components/Main";
import { h } from "preact";
import { render } from "preact-render-to-string";
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

export default {
  async render() {
    const { title, ...props } = getInitialProps();
    return render(
      <Html title={title}>
        <Page {...props} />
      </Html>
    );
  }
};
