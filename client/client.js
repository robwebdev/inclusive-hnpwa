import { h, render } from "preact";

import ConnectionStatus from "../common/components/ConnectionStatus";

/** @jsx h */
render(
  <ConnectionStatus isOffline={!navigator.onLine} />,
  document.getElementById("main-header"),
  document.getElementById("status")
);
