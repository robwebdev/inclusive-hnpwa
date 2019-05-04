import layout from "../components/layout";
import main from "../components/main";

export default function renderPage({ html }) {
  const title = "Not Found - Hacker News";
  const body = main(
    html,
    html`
      <h1>Sorry we couldn't find that page.</h1>
      <p>
        Maybe something went wrong our end, or you visited a URL that doesn't
        exists.
      </p>
    `
  );
  return layout(html, { body, title });
}
