export default (html, children, { isOffline } = {}) =>
  html`
    ${isOffline
      ? html`
          <p class="offline-message">Showing offline content</p>
        `
      : ""}
    ${children}
  `;
