import Html from "../components/Html";
import Main from "../components/Main";
import { h } from "preact";
import { render } from "preact-render-to-string";
/** @jsx h */

const Page = ({ news, page }) => (
  <Main>
    <h1>Oh dear.</h1>
    <p>Something went wrong with this page. Sorry!</p>
  </Main>
);

function getInitialProps() {
  const title = "Error - Hacker News";
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
