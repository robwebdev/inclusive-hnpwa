import layout from "../components/layout";
import main from "../components/main";

export default function renderPage({ html }) {
  const title = "Error - Hacker News";
  const body = main(
    html,
    html`
      <h1>Oh dear.</h1>
      <p>Something went wrong with this page. Sorry!</p>
    `,
    { className: "p-m" }
  );
  return layout(html, { body, title });
}
