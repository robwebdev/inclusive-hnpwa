import { h } from "preact";
import { pluralize } from "../utils";
/** @jsx h */

export default ({ item }) => (
  <span class="item-meta font-sans-serif">
    {item.points !== null && pluralize(item.points, "point")}{" "}
    {item.user && `by ${item.user}`} {item.time_ago}
  </span>
);
