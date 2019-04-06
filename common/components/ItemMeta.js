import { h } from "preact";
import { pluralize } from "../utils";
/** @jsx h */

export default ({ item }) => (
  <span class="item-meta font-sans-serif">
    {pluralize(item.points, "point")} by {item.user} {item.time_ago}
  </span>
);
