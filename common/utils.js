const NotFoundPage = require("./pages/not-found");
/** @jsx h */

function pluralize(count, word) {
  return `${count} ${word}${count !== 1 ? "s" : ""}`;
}

function mapRoutes(routes) {
  return routes.map(({ path, ...route }) => ({
    render: wrapRenderPage(route),
    path
  }));
}

function wrapRenderPage({ renderPage, getInitialProps, fetchData }) {
  return async function(params, query) {
    let data;

    if (fetchData) {
      const response = await fetchData(params, query);
      if (response.ok) {
        data = await response.json();
      } else {
        const props = NotFoundPage.getInitialProps(data, params, query);
        return NotFoundPage.renderPage(props);
      }
    }

    const props = getInitialProps(data, params, query);
    return renderPage(props);
  };
}

module.exports = { pluralize, mapRoutes };
