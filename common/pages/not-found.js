import Html from "../components/Html";
import Main from "../components/Main";
import { h } from "preact";
import { render } from "preact-render-to-string";
/** @jsx h */

const Page = () => (
  <Main className="p-m">
    <h1>Sorry we couldn't find that page.</h1>
    <p>
      Maybe something went wrong our end, or you visited a URL that doesn't
      exists.
    </p>
  </Main>
);

export default async function renderPage() {
  const title = "Not Found - Hacker News";
  return render(
    <Html title={title}>
      <Page />
    </Html>
  );
}
