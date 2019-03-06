const { h } = require("preact");
const Comments = require("../components/Comments");
const ItemMeta = require("../components/ItemMeta");
const Main = require("../components/Main");
const { pluralize } = require("../utils");
/** @jsx h */

const Page = ({ item }) => (
  <Main>
    <h1 id="main-title">
      {item.type === "ask" ? (
        item.title
      ) : (
        <a href={item.url}>
          {item.title}{" "}
          {item.domain && (
            <span>
              <br />({item.domain})
            </span>
          )}
        </a>
      )}
    </h1>
    <ItemMeta item={item} />
    {item.content && <div dangerouslySetInnerHTML={{ __html: item.content }} />}
    <Comments comments={item.comments} comments_count={item.comments_count} />
  </Main>
);

Page.fetchData = function(params) {
  return fetch(`https://api.hackerwebapp.com/item/${params.id}`);
};

Page.getInitialProps = function(item) {
  const title = `${item.title}`;
  return { item, title };
};

module.exports = Page;