export default (html, children, { className, isOffline } = {}) =>
  html`
    <main id="main" tabindex="-1" class=${className}>
      ${isOffline
        ? html`
            <p class="offline-message">It looks like you are offline.</p>
          `
        : ""}
      ${children}
    </main>
  `;
