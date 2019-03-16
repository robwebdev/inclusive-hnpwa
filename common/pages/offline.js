import Html from "../components/Html";
import Main from "../components/Main";
import { h } from "preact";
import { render } from "preact-render-to-string";
/** @jsx h */

const Page = () => (
  <Main className="p-m">
    <h1>It looks like you are offline</h1>
    <p>We'll be making the offline experience better soon.</p>
  </Main>
);

export default async function renderPage() {
  return render(
    <Html title="Offline - Hacker News">
      <Page />
    </Html>
  );
}
