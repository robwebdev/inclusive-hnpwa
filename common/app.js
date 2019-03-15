const IndexPage = require("./pages/index");
const NewestPage = require("./pages/new");
const ItemPage = require("./pages/item");
const ShowPage = require("./pages/show");
const AskPage = require("./pages/ask");
const OfflinePage = require("./pages/offline");
const NotFoundPage = require("./pages/not-found");
const ErrorPage = require("./pages/error");

module.exports = {
  routes: [
    {
      path: "/offline",
      ...OfflinePage
    },
    {
      path: "/",
      ...IndexPage
    },
    {
      path: "/new",
      ...NewestPage
    },
    {
      path: "/ask",
      ...AskPage
    },
    {
      path: "/show",
      ...ShowPage
    },
    {
      path: "/item/:id",
      ...ItemPage
    }
  ],
  notFound: NotFoundPage,
  error: ErrorPage
};
