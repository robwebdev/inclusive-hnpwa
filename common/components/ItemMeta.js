const { h } = require("preact");
const { pluralize } = require("../utils");
/** @jsx h */

module.exports = ({ item }) => (
  <div>
    <p class="item-meta font-sans-serif">
      {pluralize(item.points, "point")} by {item.user} {item.time_ago}
    </p>
  </div>
);
