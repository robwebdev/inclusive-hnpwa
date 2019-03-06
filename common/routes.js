const IndexPage = require("./pages/index");
const NewestPage = require("./pages/new");
const ItemPage = require("./pages/item");
const ShowPage = require("./pages/show");
const AskPage = require("./pages/ask");
const OfflinePage = require("./pages/offline");
const { mapRoutes } = require("./utils");

module.exports = mapRoutes([
  {
    path: "/offline",
    component: OfflinePage
  },
  {
    path: "/",
    component: IndexPage
  },
  {
    path: "/new",
    component: NewestPage
  },
  {
    path: "/ask",
    component: AskPage
  },
  {
    path: "/show",
    component: ShowPage
  },
  {
    path: "/item/:id",
    component: ItemPage
  }
]);
