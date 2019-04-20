import Html from "../components/Html";
import Main from "../components/Main";
import { h } from "preact";
import { render } from "../utils";
/** @jsx h */

const Page = () => (
  <Main className="p-m">
    <h1>Oh dear.</h1>
    <p>Something went wrong with this page. Sorry!</p>
  </Main>
);

export default async function renderPage() {
  const title = "Error - Hacker News";
  return render(
    <Html title={title}>
      <Page />
    </Html>
  );
}
