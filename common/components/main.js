import { zap } from "../icons";
export default (html, children, { isOffline } = {}) =>
  html`
    ${isOffline
      ? html`
          <p class="offline-message">
            ${zap({ html })} Showing offline content
          </p>
        `
      : ""}
    ${children}
  `;
