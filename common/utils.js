const { h } = require("preact");
const { render } = require("preact-render-to-string");
const renderShell = require("./shell");
const NotFoundPage = require("./pages/not-found");
const OfflinePage = require("./pages/offline");
/** @jsx h */

function pluralize(count, word) {
  return `${count} ${word}${count !== 1 ? "s" : ""}`;
}

function mapRoutes(routes) {
  return routes.map(({ component, ...rest }) => ({
    render: renderPage(component),
    ...rest
  }));
}

function renderPage(Page) {
  return async function(params, query) {
    if (Page.fetchData) {
      const response = await Page.fetchData(params, query);
      if (response.ok) {
        const data = await response.json();
        const { title, ...props } = Page.getInitialProps(data, params, query);
        const rendered = renderShell(title, render(<Page {...props} />));
        return rendered;
      } else {
        const { title } = await NotFoundPage.getInitialProps(fetch);
        const rendered = renderShell(title, render(<NotFoundPage />));
        return rendered;
      }
    } else {
      const { title, ...props } = Page.getInitialProps({}, params, query);
      const rendered = renderShell(title, render(<Page {...props} />));
      return rendered;
    }
  };
}

module.exports = { pluralize, mapRoutes };
