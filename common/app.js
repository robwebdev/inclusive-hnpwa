import AskPage from "./pages/ask";
import ErrorPage from "./pages/error";
import IndexPage from "./pages/index";
import ItemPage from "./pages/item";
import JobsPage from "./pages/jobs";
import NewestPage from "./pages/new";
import NotFoundPage from "./pages/not-found";
import OfflinePage from "./pages/offline";
import ShowPage from "./pages/show";

export default {
  routes: [
    {
      path: "/",
      render: IndexPage
    },
    {
      path: "/new",
      render: NewestPage
    },
    {
      path: "/ask",
      render: AskPage
    },
    {
      path: "/show",
      render: ShowPage
    },
    {
      path: "/jobs",
      render: JobsPage
    },
    {
      path: "/item/:id",
      render: ItemPage
    }
  ],
  notFound: NotFoundPage,
  error: ErrorPage,
  offline: OfflinePage
};
