export default (html, children, { isOffline } = {}) =>
  html`
    <main id="main" tabindex="-1" class="p-m">
      ${isOffline
        ? html`
            <p class="offline-message">Showing offline content</p>
          `
        : ""}
      ${children}
    </main>
  `;
