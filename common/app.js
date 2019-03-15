import AskPage from "./pages/ask";
import ErrorPage from "./pages/error";
import IndexPage from "./pages/index";
import ItemPage from "./pages/item";
import NewestPage from "./pages/new";
import NotFoundPage from "./pages/not-found";
import OfflinePage from "./pages/offline";
import ShowPage from "./pages/show";

export default {
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
